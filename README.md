# Portfolio Website - Vue 3 + TypeScript + Glassmorphism

A modern portfolio website built with Vue 3, TypeScript, and stunning glassmorphism design. Features a fully responsive layout with smooth animations and a beautiful glass-like aesthetic.

## 🚀 Features

- **Modern Tech Stack**: Vue 3 + TypeScript + Vite
- **Glassmorphism Design**: Beautiful glass-like transparent UI elements
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: CSS animations and scroll-triggered effects
- **Modular Architecture**: Highly reusable components with `export default`
- **State Management**: Pinia for efficient state management
- **Styling**: SCSS + Tailwind CSS combination
- **Supabase Ready**: Prepared for backend integration
- **SEO Optimized**: Clean semantic HTML structure

## 🛠️ Tech Stack

- **Frontend**: Vue 3 (Composition API)
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: SCSS + Tailwind CSS
- **State Management**: Pinia
- **Backend Ready**: Supabase integration prepared
- **Design System**: Custom glassmorphism components

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── GlassButton.vue
│   │   ├── GlassCard.vue
│   │   └── GlassInput.vue
│   ├── layout/          # Layout components
│   │   ├── AppHeader.vue
│   │   └── AppFooter.vue
│   └── features/        # Feature-specific components
│       ├── HeroSection.vue
│       └── ProjectsSection.vue
├── composables/         # Reusable composition functions
│   ├── useScrollSpy.ts
│   ├── useIntersectionObserver.ts
│   └── useForm.ts
├── stores/             # Pinia stores
│   ├── portfolioStore.ts
│   └── themeStore.ts
├── types/              # TypeScript definitions
│   ├── components.ts
│   ├── portfolio.ts
│   └── index.ts
├── styles/             # SCSS styles
│   ├── variables.scss
│   ├── mixins.scss
│   └── main.scss
└── supabase/           # Supabase configuration
    ├── client.ts
    ├── types.ts
    ├── composables.ts
    └── schema.sql
```

## 🎨 Design System

### Glassmorphism Components

The project includes a complete glassmorphism design system:

- **Glass Cards**: Transparent cards with blur effects
- **Glass Buttons**: Interactive buttons with hover animations
- **Glass Inputs**: Form inputs with glass styling
- **Glass Navigation**: Transparent navigation elements

### SCSS Mixins

Ready-to-use SCSS mixins for consistent glassmorphism effects:

```scss
@include glass-card($opacity, $blur, $border-opacity);
@include glass-button($opacity, $blur);
@include glass-input($opacity);
@include gradient-text();
```

## 📱 Sections

1. **Hero Section**: Personal introduction with animated elements
2. **About Section**: Personal background and description
3. **Skills Section**: Technical skills with progress bars
4. **Projects Section**: Featured projects with technology tags
5. **Experience Section**: Professional experience timeline
6. **Contact Section**: Contact form and information

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
# Edit .env.local with your Supabase credentials (optional)
```

4. **Start development server**
```bash
npm run dev
```

5. **Build for production**
```bash
npm run build
```

## 🎯 Customization

### Personal Information

Edit the portfolio store (`src/stores/portfolioStore.ts`) to update:

- Personal information
- Skills and technologies
- Projects and portfolio items
- Work experience
- Education background
- Social media links

### Styling

The design system can be customized through:

- **Variables**: `src/styles/variables.scss`
- **Mixins**: `src/styles/mixins.scss`
- **Tailwind Config**: `tailwind.config.js`

### Components

All components are built with modularity in mind:

- **Reusable**: Components use `export default` for maximum flexibility
- **Typed**: Full TypeScript support with interfaces
- **Documented**: Clear prop definitions and usage examples

## 🔮 Supabase Integration

The project is prepared for Supabase backend integration:

### Database Setup

1. Create a new Supabase project
2. Run the SQL schema from `src/supabase/schema.sql`
3. Configure Row Level Security policies
4. Set up authentication (optional)

### Environment Setup

```bash
# .env.local
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Features Ready for Integration

- **User Authentication**: Sign up, sign in, sign out
- **Portfolio Management**: CRUD operations for portfolio data
- **Project Management**: Dynamic project creation and updates
- **Contact Messages**: Store and manage contact form submissions
- **File Storage**: Image and document uploads

## 🎨 Design Guidelines

### Glassmorphism Principles

1. **Transparency**: Use rgba() values with low opacity (0.1-0.3)
2. **Blur Effects**: Apply backdrop-filter for glass-like appearance
3. **Subtle Borders**: Light borders with low opacity
4. **Layered Depth**: Multiple glass layers for visual hierarchy
5. **Smooth Animations**: Gentle transitions and hover effects

### Color Palette

- **Glass Background**: Semi-transparent whites
- **Text Primary**: High contrast white
- **Text Secondary**: Medium opacity white
- **Accents**: Blue to purple gradient
- **Success/Error**: Subtle colored overlays

## 📊 Performance

- **Lazy Loading**: Components loaded on demand
- **Optimized Assets**: Compressed images and fonts
- **Minimal Bundle**: Tree-shaking enabled
- **Fast Builds**: Vite for lightning-fast development

## 🔧 Development

### Code Style

- **TypeScript**: Strict typing enabled
- **ESLint**: Code quality enforcement
- **Prettier**: Consistent code formatting
- **Conventional Commits**: Structured commit messages

### Component Guidelines

```vue
<template>
  <!-- Always use semantic HTML -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// Always export default for modularity
export default defineComponent({
  name: 'ComponentName',
  // Component logic here
})
</script>

<style lang="scss" scoped>
// Use SCSS mixins for glassmorphism
@include glass-card();
</style>
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please read the contributing guidelines before submitting PRs.

## 📞 Support

For questions or support, please open an issue on GitHub or contact through the portfolio website.

---

**Built with ❤️ using Vue 3, TypeScript, and Modern Web Technologies**