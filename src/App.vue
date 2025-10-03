<template>
  <div id="app">
    <!-- Header -->
    <AppHeader />

    <!-- Main Content -->
    <main class="main-content">
      <!-- Hero Section -->
      <HeroSection />

      <!-- About Section -->
      <section id="about" class="content-section">
        <div class="section-container">
          <div class="section-header animate-fade-in-up">
            <h2 class="section-title gradient-text">About Me</h2>
            <p class="section-description">
              Get to know more about my background, skills, and what drives my passion for development.
            </p>
          </div>
          
          <div class="about-content glass-card animate-fade-in-up">
            <div class="about-text">
              <p>{{ personalInfo.description }}</p>
              <p>
                I'm passionate about creating exceptional digital experiences using modern technologies
                like Vue 3, TypeScript, and innovative design patterns like glassmorphism.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Skills Section -->
      <section id="skills" class="content-section skills-section">
        <div class="section-container">
          <div class="section-header animate-fade-in-up">
            <h2 class="section-title gradient-text">Skills & Technologies</h2>
            <p class="section-description">
              The technology stack and tools I use to create amazing digital experiences.
            </p>
          </div>
          
          <div class="skills-container">
            <div
              v-for="(categorySkills, category, index) in skillsByCategory"
              :key="category"
              class="skills-category glass-card animate-fade-in-up"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <div class="category-header">
                <div class="category-icon">
                  {{ getCategoryIcon(category) }}
                </div>
                <h3 class="category-title">{{ category }}</h3>
                <div class="category-count">{{ categorySkills.length }}</div>
              </div>
              
              <div class="skills-grid">
                <div
                  v-for="(skill, skillIndex) in categorySkills"
                  :key="skill.id"
                  class="skill-card"
                  :style="{ animationDelay: `${(index * 0.1) + (skillIndex * 0.05)}s` }"
                  :title="`${skill.name} - Click to learn more`"
                  @click="handleSkillClick(skill)"
                >
                  <div class="skill-content">
                    <div class="skill-icon">{{ skill.icon }}</div>
                    <div class="skill-name">{{ skill.name }}</div>
                    <div class="skill-glow"></div>
                    <div class="skill-hover-text">Learn more</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Projects Section -->
      <ProjectsSection />

      <!-- Experience Section -->
      <section id="experience" class="content-section">
        <div class="section-container">
          <div class="section-header animate-fade-in-up">
            <h2 class="section-title gradient-text">Experience</h2>
            <p class="section-description">
              My professional journey and key experiences in development.
            </p>
          </div>
          
          <div class="experience-timeline">
            <div
              v-for="exp in experience"
              :key="exp.id"
              class="timeline-item glass-card animate-fade-in-up"
            >
              <div class="timeline-content">
                <div class="timeline-header">
                  <h3 class="position">{{ exp.position }}</h3>
                  <span class="company">{{ exp.company }}</span>
                  <span class="period">
                    {{ exp.startDate }} - {{ exp.current ? 'Present' : exp.endDate }}
                  </span>
                </div>
                <p class="description">{{ exp.description }}</p>
                <div v-if="exp.technologies" class="technologies">
                  <span
                    v-for="tech in exp.technologies"
                    :key="tech"
                    class="tech-tag"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section id="contact" class="content-section">
        <div class="section-container">
          <div class="section-header animate-fade-in-up">
            <h2 class="section-title gradient-text">Get In Touch</h2>
            <p class="section-description">
              Let's discuss your next project or collaboration opportunity.
            </p>
          </div>
          
          <div class="contact-content">
            <div class="contact-info glass-card animate-fade-in-left">
              <h3 class="contact-title">Contact Information</h3>
              <div class="contact-items">
                <div class="contact-item">
                  <span class="contact-icon">📧</span>
                  <a :href="`mailto:${personalInfo.email}`" class="contact-link">
                    {{ personalInfo.email }}
                  </a>
                </div>
                <div v-if="personalInfo.phone" class="contact-item">
                  <span class="contact-icon">📱</span>
                  <a :href="`tel:${personalInfo.phone}`" class="contact-link">
                    {{ personalInfo.phone }}
                  </a>
                </div>
                <div class="contact-item">
                  <span class="contact-icon">📍</span>
                  <span>{{ personalInfo.location }}</span>
                </div>
              </div>
            </div>

            <div class="contact-form-container glass-card animate-fade-in-right">
              <h3 class="form-title">Send a Message</h3>
              <form class="contact-form" @submit.prevent="handleFormSubmit">
                <div class="form-row">
                  <div class="form-group">
                    <label for="name">Name</label>
                    <input
                      id="name"
                      v-model="contactForm.name"
                      type="text"
                      class="form-input glass-input"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input
                      id="email"
                      v-model="contactForm.email"
                      type="email"
                      class="form-input glass-input"
                      required
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="subject">Subject</label>
                  <input
                    id="subject"
                    v-model="contactForm.subject"
                    type="text"
                    class="form-input glass-input"
                  />
                </div>
                <div class="form-group">
                  <label for="message">Message</label>
                  <textarea
                    id="message"
                    v-model="contactForm.message"
                    class="form-textarea glass-input"
                    rows="5"
                    required
                  ></textarea>
                </div>
                <button type="submit" class="submit-button glass-button">
                  <span class="button-icon">📤</span>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, onMounted } from 'vue'
import { usePortfolioStore } from '@/stores/portfolioStore'
import { useThemeStore } from '@/stores/themeStore'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import HeroSection from '@/components/features/HeroSection.vue'
import ProjectsSection from '@/components/features/ProjectsSection.vue'

export default defineComponent({
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    HeroSection,
    ProjectsSection
  },
  setup() {
    const portfolioStore = usePortfolioStore()
    const themeStore = useThemeStore()

    const personalInfo = computed(() => portfolioStore.personalInfo)
    const skillsByCategory = computed(() => portfolioStore.skillsByCategory)
    const experience = computed(() => portfolioStore.experience)

    const contactForm = reactive({
      name: '',
      email: '',
      subject: '',
      message: ''
    })

    const handleFormSubmit = () => {
      console.log('Form submitted:', contactForm)
      // Here you would typically send the form data to your backend
      alert('Thank you for your message! I will get back to you soon.')
      
      // Reset form
      Object.keys(contactForm).forEach(key => {
        contactForm[key as keyof typeof contactForm] = ''
      })
    }

    const getCategoryIcon = (category: string) => {
      const categoryIcons: Record<string, string> = {
        'Frontend Development': '🎨',
        'Backend Development': '⚙️', 
        'Database & Storage': '🗄️',
        'Development Tools': '🛠️',
        'Other Technologies': '🚀'
      }
      return categoryIcons[category] || '💻'
    }

    const handleSkillClick = (skill: any) => {
      const skillInfo: Record<string, string> = {
        'vue': 'Vue.js - Progressive JavaScript framework for building user interfaces',
        'react': 'React - A JavaScript library for building user interfaces',
        'typescript': 'TypeScript - JavaScript with syntax for types',
        'javascript': 'JavaScript - Programming language of the web',
        'tailwind': 'Tailwind CSS - Utility-first CSS framework',
        'scss': 'SCSS - Syntactically Awesome Style Sheets',
        'nodejs': 'Node.js - JavaScript runtime built on Chrome\'s V8 engine',
        'express': 'Express.js - Fast, unopinionated web framework for Node.js',
        'python': 'Python - High-level programming language',
        'php': 'PHP - Server-side scripting language',
        'supabase': 'Supabase - Open source Firebase alternative',
        'postgresql': 'PostgreSQL - Advanced open source relational database',
        'mongodb': 'MongoDB - Document-oriented NoSQL database',
        'mysql': 'MySQL - Open source relational database management system',
        'git': 'Git - Distributed version control system',
        'docker': 'Docker - Platform for developing, shipping, and running applications',
        'vite': 'Vite - Next generation frontend tooling',
        'webpack': 'Webpack - Static module bundler for modern JavaScript applications'
      }
      
      const info = skillInfo[skill.id] || `${skill.name} - A powerful technology in my toolkit`
      alert(info)
    }

    onMounted(() => {
      themeStore.initializeTheme()
    })

    return {
      personalInfo,
      skillsByCategory,
      experience,
      contactForm,
      handleFormSubmit,
      getCategoryIcon,
      handleSkillClick
    }
  }
})
</script>

<style lang="scss" scoped>
#app {
  min-height: 100vh;
  position: relative;
}

.main-content {
  padding-top: 0;
}

.content-section {
  padding: 5rem 1rem;
  
  @include mobile {
    padding: 3rem 0.5rem;
  }
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
  
  @include mobile {
    margin-bottom: 3rem;
  }
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: 1rem;
}

.section-description {
  font-size: 1.125rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

// About Section
.about-content {
  @include glass-card(0.1, var(--blur-md));
  padding: 3rem;
  
  @include mobile {
    padding: 2rem;
  }
}

.about-text {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--text-secondary);
  
  p {
    margin-bottom: 1.5rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

// Skills Section
.skills-section {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.02), rgba(0, 0, 0, 0.05));
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
}

.skills-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  position: relative;
  z-index: 1;
  
  @include mobile {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.skills-category {
  @include glass-card(0.08, var(--blur-lg));
  padding: 2rem;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  position: relative;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  animation: slideInUp 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    border-color: rgba(255, 255, 255, 0.25);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.1),
      0 0 30px rgba(255, 255, 255, 0.1);
    
    .category-header::before {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01));
    border-radius: 24px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
}

.category-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.02));
    border-radius: 16px;
    opacity: 0;
    transform: scale(0.9);
    transition: all 0.3s ease;
    z-index: -1;
  }
}

.category-icon {
  font-size: 2rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
  padding: 0.8rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  animation: pulse 2s infinite;
  
  .skills-category:hover & {
    transform: rotate(10deg) scale(1.1);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
}

.category-title {
  flex: 1;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  background: linear-gradient(135deg, var(--text-primary), rgba(255, 255, 255, 0.8));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.category-count {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08));
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  border: 1px solid rgba(255, 255, 255, 0.1);
  min-width: 2.5rem;
  text-align: center;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  
  @include mobile {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 0.8rem;
  }
}

.skill-card {
  position: relative;
  animation: slideInUp 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
  
  .skill-content {
    @include glass-card(0.05, var(--blur-sm));
    padding: 1.5rem 1rem;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    text-align: center;
    position: relative;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    cursor: pointer;
    overflow: hidden;
    
    &:hover {
      transform: translateY(-4px) scale(1.05);
      border-color: rgba(255, 255, 255, 0.2);
      box-shadow: 
        0 12px 24px rgba(0, 0, 0, 0.15),
        0 0 20px rgba(255, 255, 255, 0.1);
      
      .skill-icon {
        transform: scale(1.2) rotate(5deg);
      }
      
      .skill-glow {
        opacity: 1;
        transform: scale(1);
      }
      
      .skill-name {
        color: var(--text-primary);
        transform: translateY(-2px);
      }
    }
  }
}

.skill-icon {
  font-size: 2rem;
  margin-bottom: 0.8rem;
  display: block;
  transition: all 0.3s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.skill-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin: 0;
  transition: all 0.3s ease;
  line-height: 1.4;
}

.skill-hover-text {
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  font-size: 0.75rem;
  color: var(--text-secondary);
  opacity: 0;
  transition: all 0.3s ease;
  font-weight: 500;
  
  .skill-content:hover & {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.skill-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60px;
  height: 60px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
  transition: all 0.3s ease;
  pointer-events: none;
  z-index: -1;
}

// Animations
@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.1);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(255, 255, 255, 0);
  }
}

// Experience Section
.experience-timeline {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.timeline-item {
  @include glass-card(0.1, var(--blur-md));
  padding: 2rem;
}

.timeline-header {
  margin-bottom: 1rem;
  
  .position {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
  }
  
  .company {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
    display: block;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: inline-block;
  }
  
  .period {
    font-size: 0.875rem;
    color: var(--text-muted);
  }
}

.description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  @include glass-button(0.05, var(--blur-sm));
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-secondary);
  border-radius: 16px;
}

// Contact Section
.contact-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 3rem;
  
  @include tablet {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.contact-info,
.contact-form-container {
  @include glass-card(0.1, var(--blur-md));
  padding: 2rem;
}

.contact-title,
.form-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

.contact-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  .contact-icon {
    font-size: 1.2rem;
    width: 24px;
    text-align: center;
  }
}

.contact-link {
  color: var(--text-secondary);
  text-decoration: none;
  transition: var(--transition);
  
  &:hover {
    color: var(--text-primary);
  }
}

// Contact Form
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @include mobile {
    grid-template-columns: 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-secondary);
  }
}

.form-input,
.form-textarea {
  @include glass-input();
  padding: 0.75rem 1rem;
  font-size: 1rem;
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  resize: vertical;
  
  &::placeholder {
    color: var(--text-muted);
  }
}

.submit-button {
  @include glass-button(0.2, var(--blur-sm));
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15));
  padding: 0.875rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  
  &:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.25));
  }
}

.button-icon {
  font-size: 1.2em;
}
</style>