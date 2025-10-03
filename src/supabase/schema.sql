# Supabase SQL Schema for Portfolio Website

-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create portfolios table
CREATE TABLE portfolios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    location VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    resume_url TEXT,
    is_public BOOLEAN DEFAULT true
);

-- Create projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    image_url TEXT,
    gallery_urls TEXT[],
    technologies TEXT[] NOT NULL DEFAULT '{}',
    live_url TEXT,
    source_url TEXT,
    featured BOOLEAN DEFAULT false,
    category VARCHAR(100) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('completed', 'in-progress', 'planned')) DEFAULT 'completed',
    start_date DATE NOT NULL,
    end_date DATE,
    sort_order INTEGER DEFAULT 0
);

-- Create skills table
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    level INTEGER CHECK (level >= 0 AND level <= 100) NOT NULL,
    category VARCHAR(50) CHECK (category IN ('frontend', 'backend', 'database', 'tools', 'other')) NOT NULL,
    icon VARCHAR(10),
    sort_order INTEGER DEFAULT 0
);

-- Create experiences table
CREATE TABLE experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
    company VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    location VARCHAR(255) NOT NULL,
    current BOOLEAN DEFAULT false,
    technologies TEXT[],
    sort_order INTEGER DEFAULT 0
);

-- Create education table
CREATE TABLE education (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
    institution VARCHAR(255) NOT NULL,
    degree VARCHAR(255) NOT NULL,
    field VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    current BOOLEAN DEFAULT false,
    description TEXT,
    gpa VARCHAR(10),
    sort_order INTEGER DEFAULT 0
);

-- Create social_links table
CREATE TABLE social_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    url TEXT NOT NULL,
    icon VARCHAR(10) NOT NULL,
    sort_order INTEGER DEFAULT 0
);

-- Create contact_messages table
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    replied BOOLEAN DEFAULT false
);

-- Create indexes for better performance
CREATE INDEX idx_portfolios_user_id ON portfolios(user_id);
CREATE INDEX idx_projects_portfolio_id ON projects(portfolio_id);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_skills_portfolio_id ON skills(portfolio_id);
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_experiences_portfolio_id ON experiences(portfolio_id);
CREATE INDEX idx_education_portfolio_id ON education(portfolio_id);
CREATE INDEX idx_social_links_portfolio_id ON social_links(portfolio_id);
CREATE INDEX idx_contact_messages_portfolio_id ON contact_messages(portfolio_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_portfolios_updated_at BEFORE UPDATE ON portfolios FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_experiences_updated_at BEFORE UPDATE ON experiences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_education_updated_at BEFORE UPDATE ON education FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_social_links_updated_at BEFORE UPDATE ON social_links FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security Policies

-- Portfolios: Users can only access their own portfolio
CREATE POLICY "Users can view their own portfolio" ON portfolios FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own portfolio" ON portfolios FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own portfolio" ON portfolios FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own portfolio" ON portfolios FOR DELETE USING (auth.uid() = user_id);

-- Public portfolios can be viewed by anyone
CREATE POLICY "Public portfolios are viewable by anyone" ON portfolios FOR SELECT USING (is_public = true);

-- Projects: Users can manage projects in their portfolio
CREATE POLICY "Users can manage their portfolio projects" ON projects FOR ALL USING (
    portfolio_id IN (SELECT id FROM portfolios WHERE user_id = auth.uid())
);

-- Public portfolio projects can be viewed by anyone
CREATE POLICY "Public portfolio projects are viewable by anyone" ON projects FOR SELECT USING (
    portfolio_id IN (SELECT id FROM portfolios WHERE is_public = true)
);

-- Skills: Users can manage skills in their portfolio
CREATE POLICY "Users can manage their portfolio skills" ON skills FOR ALL USING (
    portfolio_id IN (SELECT id FROM portfolios WHERE user_id = auth.uid())
);

-- Public portfolio skills can be viewed by anyone
CREATE POLICY "Public portfolio skills are viewable by anyone" ON skills FOR SELECT USING (
    portfolio_id IN (SELECT id FROM portfolios WHERE is_public = true)
);

-- Experiences: Users can manage experiences in their portfolio
CREATE POLICY "Users can manage their portfolio experiences" ON experiences FOR ALL USING (
    portfolio_id IN (SELECT id FROM portfolios WHERE user_id = auth.uid())
);

-- Public portfolio experiences can be viewed by anyone
CREATE POLICY "Public portfolio experiences are viewable by anyone" ON experiences FOR SELECT USING (
    portfolio_id IN (SELECT id FROM portfolios WHERE is_public = true)
);

-- Education: Users can manage education in their portfolio
CREATE POLICY "Users can manage their portfolio education" ON education FOR ALL USING (
    portfolio_id IN (SELECT id FROM portfolios WHERE user_id = auth.uid())
);

-- Public portfolio education can be viewed by anyone
CREATE POLICY "Public portfolio education are viewable by anyone" ON education FOR SELECT USING (
    portfolio_id IN (SELECT id FROM portfolios WHERE is_public = true)
);

-- Social Links: Users can manage social links in their portfolio
CREATE POLICY "Users can manage their portfolio social links" ON social_links FOR ALL USING (
    portfolio_id IN (SELECT id FROM portfolios WHERE user_id = auth.uid())
);

-- Public portfolio social links can be viewed by anyone
CREATE POLICY "Public portfolio social links are viewable by anyone" ON social_links FOR SELECT USING (
    portfolio_id IN (SELECT id FROM portfolios WHERE is_public = true)
);

-- Contact Messages: Users can view messages for their portfolio, anyone can insert
CREATE POLICY "Users can view their portfolio messages" ON contact_messages FOR SELECT USING (
    portfolio_id IN (SELECT id FROM portfolios WHERE user_id = auth.uid())
);

CREATE POLICY "Anyone can send contact messages" ON contact_messages FOR INSERT WITH CHECK (true);

-- Enable RLS on all tables
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;