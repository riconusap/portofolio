<template>
  <section id="projects" class="projects-section">
    <div class="section-container">
      <div class="section-header animate-fade-in-up">
        <h2 class="section-title gradient-text">Featured Projects</h2>
        <p class="section-description">
          Here are some of my recent projects that showcase my skills and creativity
        </p>
      </div>

      <div class="projects-grid">
        <div
          v-for="(project, index) in featuredProjects"
          :key="project.id"
          :class="['project-card', `animate-fade-in-up-${index + 1}`]"
        >
          <div class="project-card-inner glass-card hoverable">
            <!-- Project Image -->
            <div class="project-image">
              <div class="image-placeholder">
                <span class="project-icon">🚀</span>
              </div>
              <div class="project-status">
                <span :class="['status-badge', `status-${project.status}`]">
                  {{ project.status.replace('-', ' ') }}
                </span>
              </div>
            </div>

            <!-- Project Content -->
            <div class="project-content">
              <div class="project-header">
                <h3 class="project-title">{{ project.title }}</h3>
                <span class="project-category">{{ project.category }}</span>
              </div>

              <p class="project-description">{{ project.description }}</p>

              <!-- Technologies -->
              <div class="project-technologies">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="tech-tag glass-button"
                >
                  {{ tech }}
                </span>
              </div>

              <!-- Project Actions -->
              <div class="project-actions">
                <a
                  v-if="project.liveUrl"
                  :href="project.liveUrl"
                  class="action-button primary glass-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span class="button-icon">🌐</span>
                  Live Demo
                </a>
                <a
                  v-if="project.sourceUrl"
                  :href="project.sourceUrl"
                  class="action-button secondary glass-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span class="button-icon">🐱</span>
                  Source Code
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- View All Projects Button -->
      <div class="section-footer animate-fade-in-up">
        <button class="view-all-button glass-button" @click="showAllProjects">
          <span class="button-icon">📁</span>
          View All Projects
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { usePortfolioStore } from '@/stores/portfolioStore'

export default defineComponent({
  name: 'ProjectsSection',
  setup() {
    const portfolioStore = usePortfolioStore()

    const featuredProjects = computed(() => portfolioStore.featuredProjects)

    const showAllProjects = () => {
      // Implement modal or navigation to all projects
      console.log('Show all projects')
    }

    return {
      featuredProjects,
      showAllProjects
    }
  }
})
</script>

<style lang="scss" scoped>
.projects-section {
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

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  
  @include mobile {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.project-card {
  &.animate-fade-in-up-1 { @include fade-in-up(0.1s); }
  &.animate-fade-in-up-2 { @include fade-in-up(0.2s); }
  &.animate-fade-in-up-3 { @include fade-in-up(0.3s); }
  &.animate-fade-in-up-4 { @include fade-in-up(0.4s); }
}

.project-card-inner {
  @include glass-card(0.1, var(--blur-md));
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: var(--transition);
  
  &.hoverable:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px 0 rgba(31, 38, 135, 0.4);
  }
}

.project-image {
  position: relative;
  height: 200px;
  overflow: hidden;
  border-radius: 16px 16px 0 0;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  @include glass-card(0.05, var(--blur-sm));
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
  
  .project-icon {
    font-size: 3rem;
    opacity: 0.7;
  }
}

.project-status {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.status-badge {
  @include glass-button(0.2, var(--blur-sm));
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 20px;
  text-transform: capitalize;
  
  &.status-completed {
    background: rgba(34, 197, 94, 0.2);
    color: #22c55e;
  }
  
  &.status-in-progress {
    background: rgba(249, 115, 22, 0.2);
    color: #f97316;
  }
  
  &.status-planned {
    background: rgba(156, 163, 175, 0.2);
    color: #9ca3af;
  }
}

.project-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.project-header {
  margin-bottom: 1rem;
}

.project-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.project-category {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.project-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex: 1;
}

.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tech-tag {
  @include glass-button(0.05, var(--blur-sm));
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-secondary);
  border-radius: 16px;
  
  &:hover {
    color: var(--text-primary);
    transform: none;
  }
}

.project-actions {
  display: flex;
  gap: 0.75rem;
  
  @include mobile {
    flex-direction: column;
  }
}

.action-button {
  @include glass-button(0.1, var(--blur-sm));
  padding: 0.625rem 1.25rem;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 10px;
  flex: 1;
  justify-content: center;
  
  &.primary {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
    color: var(--text-primary);
    border: 1px solid rgba(255, 255, 255, 0.3);
    
    &:hover {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2));
    }
  }
  
  &.secondary {
    color: var(--text-secondary);
    
    &:hover {
      color: var(--text-primary);
    }
  }
}

.button-icon {
  font-size: 1em;
}

.section-footer {
  text-align: center;
}

.view-all-button {
  @include glass-button(0.15, var(--blur-md));
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
  color: var(--text-primary);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  
  &:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2));
  }
}
</style>