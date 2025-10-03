<template>
  <section id="hero" class="hero-section">
    <div class="hero-container">
      <div class="hero-content">
        <!-- Main Content -->
        <div class="hero-main animate-fade-in-up">
          <div class="hero-text">
            <h1 class="hero-title">
              Hi, I'm <span class="gradient-text">{{ personalInfo.name }}</span>
            </h1>
            <h2 class="hero-subtitle">{{ personalInfo.title }}</h2>
            <p class="hero-description">{{ personalInfo.description }}</p>
          </div>

          <div class="hero-actions">
            <a href="#contact" class="cta-button glass-button">
              <span class="button-icon">💬</span>
              Get In Touch
            </a>
            <a v-if="personalInfo.resume" :href="personalInfo.resume" class="secondary-button glass-button" target="_blank">
              <span class="button-icon">📄</span>
              Download CV
            </a>
          </div>

          <div class="social-links">
            <a
              v-for="social in socialLinks"
              :key="social.id"
              :href="social.url"
              class="social-link glass-button"
              target="_blank"
              rel="noopener noreferrer"
              :title="social.name"
            >
              <span class="social-icon">{{ social.icon }}</span>
            </a>
          </div>
        </div>

        <!-- Avatar/Image -->
        <div class="hero-visual animate-fade-in-right">
          <div class="hero-avatar glass-card">
            <div class="avatar-placeholder">
              <span class="avatar-icon">👨‍💻</span>
            </div>
            <div class="floating-elements">
              <div class="floating-element element-1">⚡</div>
              <div class="floating-element element-2">🚀</div>
              <div class="floating-element element-3">💡</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="scroll-indicator animate-fade-in-up">
        <a href="#about" class="scroll-link">
          <span class="scroll-text">Scroll Down</span>
          <div class="scroll-arrow">
            <span>⬇️</span>
          </div>
        </a>
      </div>
    </div>

    <!-- Background Elements -->
    <div class="hero-background">
      <div class="bg-element bg-element-1"></div>
      <div class="bg-element bg-element-2"></div>
      <div class="bg-element bg-element-3"></div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { usePortfolioStore } from '@/stores/portfolioStore'

export default defineComponent({
  name: 'HeroSection',
  setup() {
    const portfolioStore = usePortfolioStore()

    const personalInfo = computed(() => portfolioStore.personalInfo)
    const socialLinks = computed(() => portfolioStore.socialLinks)

    return {
      personalInfo,
      socialLinks
    }
  }
})
</script>

<style lang="scss" scoped>
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding: 6rem 1rem 4rem;
  overflow: hidden;
  
  @include mobile {
    padding: 5rem 0.5rem 3rem;
  }
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 2;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 4rem;
  align-items: center;
  
  @include tablet {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
  
  @include mobile {
    gap: 2rem;
  }
}

.hero-main {
  @include fade-in-up(0.2s);
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.hero-subtitle {
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.hero-description {
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
  max-width: 500px;
  
  @include tablet {
    margin: 0 auto 2.5rem;
  }
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @include tablet {
    justify-content: center;
  }
  
  @include mobile {
    flex-direction: column;
    align-items: center;
  }
}

.cta-button {
  @include glass-button(0.2, var(--blur-sm));
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15));
  padding: 0.875rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  
  &:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.25));
    box-shadow: 0 12px 40px 0 rgba(255, 255, 255, 0.2);
  }
  
  @include mobile {
    width: 200px;
    justify-content: center;
  }
}

.secondary-button {
  @include glass-button(0.1, var(--blur-sm));
  padding: 0.875rem 2rem;
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: var(--text-primary);
  }
  
  @include mobile {
    width: 200px;
    justify-content: center;
  }
}

.button-icon {
  font-size: 1.2em;
}

.social-links {
  display: flex;
  gap: 1rem;
  
  @include tablet {
    justify-content: center;
  }
}

.social-link {
  @include glass-button(0.1, var(--blur-sm));
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border-radius: 12px;
  
  .social-icon {
    font-size: 1.5rem;
  }
}

.hero-visual {
  @include fade-in-right(0.4s);
  
  @include tablet {
    order: -1;
  }
}

.hero-avatar {
  @include glass-card-lg(0.1, var(--blur-lg));
  position: relative;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  @include mobile {
    max-width: 280px;
    margin: 0 auto;
  }
}

.avatar-placeholder {
  width: 200px;
  height: 200px;
  @include glass-card(0.15, var(--blur-md));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .avatar-icon {
    font-size: 4rem;
  }
  
  @include mobile {
    width: 150px;
    height: 150px;
    
    .avatar-icon {
      font-size: 3rem;
    }
  }
}

.floating-elements {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.floating-element {
  position: absolute;
  font-size: 2rem;
  opacity: 0.7;
  animation: float 6s ease-in-out infinite;
  
  &.element-1 {
    top: 20%;
    right: 20%;
    animation-delay: 0s;
  }
  
  &.element-2 {
    bottom: 20%;
    left: 15%;
    animation-delay: 2s;
  }
  
  &.element-3 {
    top: 50%;
    right: 10%;
    animation-delay: 4s;
  }
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  @include fade-in-up(0.8s);
}

.scroll-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--text-muted);
  transition: var(--transition);
  
  &:hover {
    color: var(--text-secondary);
    transform: translateY(-4px);
  }
}

.scroll-text {
  font-size: 0.875rem;
  font-weight: 500;
}

.scroll-arrow {
  font-size: 1.5rem;
  animation: bounce 2s infinite;
}

.hero-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 1;
}

.bg-element {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(0, 0, 0, 0.1));
  backdrop-filter: blur(40px);
  animation: float 8s ease-in-out infinite;
  
  &.bg-element-1 {
    width: 300px;
    height: 300px;
    top: 10%;
    right: 10%;
    animation-delay: 0s;
  }
  
  &.bg-element-2 {
    width: 200px;
    height: 200px;
    bottom: 20%;
    left: 5%;
    animation-delay: 3s;
  }
  
  &.bg-element-3 {
    width: 150px;
    height: 150px;
    top: 60%;
    right: 30%;
    animation-delay: 6s;
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}
</style>