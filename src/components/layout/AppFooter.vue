<template>
  <footer class="app-footer">
    <div class="footer-content glass-card">
      <div class="footer-container">
        <!-- Footer Brand -->
        <div class="footer-brand">
          <h3 class="brand-text gradient-text">{{ personalInfo.name }}</h3>
          <p class="brand-subtitle">{{ personalInfo.title }}</p>
        </div>

        <!-- Quick Links -->
        <div class="footer-section">
          <h4 class="section-title">Quick Links</h4>
          <ul class="link-list">
            <li v-for="item in quickLinks" :key="item.id">
              <a :href="item.href" class="footer-link">{{ item.label }}</a>
            </li>
          </ul>
        </div>

        <!-- Social Links -->
        <div class="footer-section">
          <h4 class="section-title">Connect</h4>
          <div class="social-links">
            <a
              v-for="social in socialLinks"
              :key="social.id"
              :href="social.url"
              class="social-link glass-button"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.name"
            >
              <span class="social-icon">{{ social.icon }}</span>
            </a>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="footer-section">
          <h4 class="section-title">Contact</h4>
          <div class="contact-info">
            <p class="contact-item">
              <span class="contact-icon">📧</span>
              <a :href="`mailto:${personalInfo.email}`" class="footer-link">
                {{ personalInfo.email }}
              </a>
            </p>
            <p v-if="personalInfo.phone" class="contact-item">
              <span class="contact-icon">📱</span>
              <a :href="`tel:${personalInfo.phone}`" class="footer-link">
                {{ personalInfo.phone }}
              </a>
            </p>
            <p class="contact-item">
              <span class="contact-icon">📍</span>
              {{ personalInfo.location }}
            </p>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <p class="copyright">
            © {{ currentYear }} {{ personalInfo.name }}. All rights reserved.
          </p>
          <p class="built-with">
            Built with ❤️ using Vue 3, TypeScript & Glassmorphism
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { usePortfolioStore } from '@/stores/portfolioStore'

export default defineComponent({
  name: 'AppFooter',
  setup() {
    const portfolioStore = usePortfolioStore()

    const currentYear = new Date().getFullYear()

    const personalInfo = computed(() => portfolioStore.personalInfo)
    const socialLinks = computed(() => portfolioStore.socialLinks)

    const quickLinks = [
      { id: 'about', label: 'About', href: '#about' },
      { id: 'skills', label: 'Skills', href: '#skills' },
      { id: 'projects', label: 'Projects', href: '#projects' },
      { id: 'experience', label: 'Experience', href: '#experience' },
      { id: 'contact', label: 'Contact', href: '#contact' }
    ]

    return {
      personalInfo,
      socialLinks,
      quickLinks,
      currentYear
    }
  }
})
</script>

<style lang="scss" scoped>
.app-footer {
  margin-top: 4rem;
  padding: 2rem 1rem 1rem;
  
  @include mobile {
    padding: 1.5rem 0.5rem 0.5rem;
  }
}

.footer-content {
  @include glass-card(0.1, var(--blur-md));
  padding: 3rem 2rem 1rem;
  border-radius: 24px;
  
  @include mobile {
    padding: 2rem 1rem 0.75rem;
    border-radius: 20px;
  }
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 3rem;
  
  @include tablet {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  
  @include mobile {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.footer-brand {
  .brand-text {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  .brand-subtitle {
    color: var(--text-secondary);
    font-size: 1rem;
    margin: 0;
  }
}

.footer-section {
  .section-title {
    color: var(--text-primary);
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
}

.link-list {
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    margin-bottom: 0.5rem;
  }
}

.footer-link {
  color: var(--text-secondary);
  text-decoration: none;
  transition: var(--transition);
  
  &:hover {
    color: var(--text-primary);
  }
}

.social-links {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.social-link {
  @include glass-button(0.1, var(--blur-sm));
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border-radius: 12px;
  
  .social-icon {
    font-size: 1.2rem;
  }
}

.contact-info {
  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    color: var(--text-secondary);
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .contact-icon {
    font-size: 1rem;
    width: 20px;
    text-align: center;
  }
}

.footer-bottom {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  @include mobile {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
  }
}

.footer-bottom-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @include mobile {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}

.copyright,
.built-with {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin: 0;
}

.built-with {
  @include mobile {
    font-size: 0.8rem;
  }
}
</style>