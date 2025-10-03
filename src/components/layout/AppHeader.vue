<template>
  <header class="app-header">
    <nav class="navbar glass-card">
      <div class="navbar-container">
        <!-- Logo -->
        <div class="navbar-brand">
          <a href="#" class="brand-link">
            <span class="brand-text gradient-text">{{ personalInfo.name }}</span>
          </a>
        </div>

        <!-- Desktop Navigation -->
        <div class="navbar-nav desktop-nav">
          <a
            v-for="item in navigationItems"
            :key="item.id"
            :href="item.href"
            :class="['nav-link', { active: activeSection === item.id }]"
            @click="setActiveSection(item.id)"
          >
            <span class="nav-icon">{{ item.icon }}</span>
            {{ item.label }}
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="mobile-menu-btn glass-button"
          @click="toggleMenu"
          aria-label="Toggle navigation menu"
        >
          <span class="hamburger-icon">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <div :class="['mobile-nav', { open: isMenuOpen }]">
        <div class="mobile-nav-content glass-card">
          <a
            v-for="item in navigationItems"
            :key="item.id"
            :href="item.href"
            :class="['mobile-nav-link', { active: activeSection === item.id }]"
            @click="handleMobileNavClick(item.id)"
          >
            <span class="nav-icon">{{ item.icon }}</span>
            {{ item.label }}
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { usePortfolioStore } from '@/stores/portfolioStore'
import { useThemeStore } from '@/stores/themeStore'

export default defineComponent({
  name: 'AppHeader',
  setup() {
    const portfolioStore = usePortfolioStore()
    const themeStore = useThemeStore()

    const navigationItems = [
      { id: 'hero', label: 'Home', href: '#hero', icon: '🏠' },
      { id: 'about', label: 'About', href: '#about', icon: '👨‍💻' },
      { id: 'skills', label: 'Skills', href: '#skills', icon: '⚡' },
      { id: 'projects', label: 'Projects', href: '#projects', icon: '🚀' },
      { id: 'experience', label: 'Experience', href: '#experience', icon: '💼' },
      { id: 'contact', label: 'Contact', href: '#contact', icon: '📧' }
    ]

    const personalInfo = computed(() => portfolioStore.personalInfo)
    const isMenuOpen = computed(() => themeStore.isMenuOpen)
    const activeSection = computed(() => themeStore.activeSection)

    const toggleMenu = () => {
      themeStore.toggleMenu()
    }

    const setActiveSection = (section: string) => {
      themeStore.setActiveSection(section)
      themeStore.closeMenu()
    }

    const handleMobileNavClick = (section: string) => {
      setActiveSection(section)
    }

    return {
      navigationItems,
      personalInfo,
      isMenuOpen,
      activeSection,
      toggleMenu,
      setActiveSection,
      handleMobileNavClick
    }
  }
})
</script>

<style lang="scss" scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem;
  
  @include mobile {
    padding: 0.5rem;
  }
}

.navbar {
  @include glass-card(0.1, var(--blur-md));
  padding: 0.75rem 1.5rem;
  border-radius: 20px;
  
  @include mobile {
    padding: 0.5rem 1rem;
    border-radius: 16px;
  }
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

.navbar-brand {
  .brand-link {
    text-decoration: none;
    display: flex;
    align-items: center;
  }
  
  .brand-text {
    font-size: 1.5rem;
    font-weight: 700;
    
    @include mobile {
      font-size: 1.25rem;
    }
  }
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @include mobile {
    display: none;
  }
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: var(--text-secondary);
  border-radius: 12px;
  transition: var(--transition);
  font-weight: 500;
  
  &:hover {
    color: var(--text-primary);
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
  
  &.active {
    color: var(--text-primary);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
    box-shadow: 0 4px 16px 0 rgba(255, 255, 255, 0.1);
  }
}

.nav-icon {
  font-size: 1.2em;
}

.mobile-menu-btn {
  display: none;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  
  @include mobile {
    display: block;
  }
}

.hamburger-icon {
  display: flex;
  flex-direction: column;
  width: 20px;
  height: 16px;
  
  span {
    height: 2px;
    background: var(--text-primary);
    margin: 2px 0;
    transition: var(--transition);
    border-radius: 2px;
  }
}

.mobile-nav {
  position: fixed;
  top: 100%;
  left: 1rem;
  right: 1rem;
  opacity: 0;
  visibility: hidden;
  transition: var(--transition);
  
  &.open {
    opacity: 1;
    visibility: visible;
    top: 5rem;
  }
  
  @include mobile {
    left: 0.5rem;
    right: 0.5rem;
    
    &.open {
      top: 4rem;
    }
  }
}

.mobile-nav-content {
  @include glass-card(0.15, var(--blur-lg));
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: var(--text-secondary);
  border-radius: 12px;
  transition: var(--transition);
  font-weight: 500;
  
  &:hover,
  &.active {
    color: var(--text-primary);
    background: rgba(255, 255, 255, 0.1);
  }
}
</style>