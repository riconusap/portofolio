# GitHub Copilot Instructions

## Project Stack & Architecture

This project uses the following technology stack:
- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Pinia** for state management
- **SCSS** for styling
- **Tailwind CSS** for utility-first styling
- **Supabase** for backend integration (future implementation)

## Design Guidelines

### Design System
- Use **glassmorphism** design aesthetic with modern styling
- Implement glass-like transparent backgrounds with blur effects
- Use subtle gradients and soft shadows
- Maintain clean, minimalist interfaces with depth

### Color Palette
- Primary: Semi-transparent backgrounds with backdrop-blur
- Use rgba() values with low opacity (0.1-0.3)
- Implement gradient overlays
- Soft, muted color schemes

## Component Architecture

### Component Structure
All components must follow this structure and use `export default`:

```vue
<template>
  <!-- Template content with glassmorphism styling -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// TypeScript interfaces and types
interface ComponentProps {
  // Define props with proper types
}

// Component logic using Composition API
// Use Pinia stores when needed

export default defineComponent({
  name: 'ComponentName',
  props: {
    // Define props here
  },
  setup(props) {
    // Component logic here
    
    return {
      // Return reactive data and methods
    }
  }
})
</script>

<style lang="scss" scoped>
// SCSS styling with glassmorphism effects
// Combine with Tailwind classes
</style>
```

### Modular Design Principles
- **Single Responsibility**: Each component should have one clear purpose
- **Reusability**: Components should be easily reusable across the application
- **Props Interface**: Always define TypeScript interfaces for props
- **Composables**: Extract reusable logic into composables
- **Export Default**: Always use `export default defineComponent()` for components

### Export Default Explanation
`export default defineComponent()` means:
- **Flexible Imports**: Import component with any name you want
- **Maximum Modularity**: Each component is self-contained module
- **Easy Reusability**: Component can be used anywhere in the app
- **Tree Shaking**: Better bundle optimization

Examples of how to use exported components:
```typescript
// Import dengan nama apapun
import MyButton from '@/components/ui/Button.vue'
import CustomButton from '@/components/ui/Button.vue'
import PrimaryBtn from '@/components/ui/Button.vue'

// Lazy loading untuk performance
const LazyComponent = defineAsyncComponent(() => import('@/components/ui/Button.vue'))
```

## Code Generation Guidelines

### Vue 3 Components
When creating Vue components:

1. **Use `<script lang="ts">`** with `defineComponent()`
2. **Export Default**: Always use `export default defineComponent()`
3. **Define Props Interface**: Always create TypeScript interfaces for props
4. **Composition API**: Use `setup()` function for component logic
5. **Reactive Data**: Use `ref()`, `reactive()`, `computed()` appropriately
6. **Lifecycle Hooks**: Use `onMounted()`, `onUnmounted()`, etc.

Example:
```vue
<template>
  <div class="glass-card">
    <h2>{{ title }}</h2>
    <p>{{ computedMessage }}</p>
    <button @click="handleClick" class="glass-button">
      {{ buttonText }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'

interface Props {
  title: string;
  variant?: 'primary' | 'secondary';
  initialCount?: number;
}

export default defineComponent({
  name: 'GlassCard',
  props: {
    title: {
      type: String,
      required: true
    },
    variant: {
      type: String as PropType<'primary' | 'secondary'>,
      default: 'primary'
    },
    initialCount: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    // Reactive data
    const count = ref(props.initialCount)
    const buttonText = ref('Click me')
    
    // Computed properties
    const computedMessage = computed(() => 
      `Count is: ${count.value} (${props.variant} variant)`
    )
    
    // Methods
    const handleClick = () => {
      count.value++
    }
    
    // Lifecycle
    onMounted(() => {
      console.log('Component mounted')
    })
    
    // Return what template needs
    return {
      count,
      buttonText,
      computedMessage,
      handleClick
    }
  }
})
</script>

<style lang="scss" scoped>
.glass-card {
  @apply backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6;
  // Additional SCSS styling
}

.glass-button {
  @apply backdrop-blur-sm bg-white/15 border border-white/30 rounded-lg px-4 py-2;
  transition: all 0.3s ease;
  
  &:hover {
    @apply bg-white/25;
    transform: translateY(-2px);
  }
}
</style>
```

### TypeScript Guidelines
- Use **strict typing** throughout the project
- Define interfaces for all data structures
- Use generic types where appropriate
- Implement proper error handling with typed exceptions

### Pinia Store Structure
When creating stores:
```typescript
import { defineStore } from 'pinia'

export const useExampleStore = defineStore('example', () => {
  // State
  const state = ref<StateInterface>({})
  
  // Getters
  const getters = computed(() => {})
  
  // Actions
  const actions = {
    async fetchData() {}
  }
  
  return { state, getters, ...actions }
})

export default useExampleStore
```

### SCSS + Tailwind Integration
- Use Tailwind for layout and spacing
- Use SCSS for complex styling and glassmorphism effects
- Create mixins for common glassmorphism patterns

SCSS Mixins for Glassmorphism:
```scss
@mixin glass-card($opacity: 0.1, $blur: 10px) {
  background: rgba(255, 255, 255, $opacity);
  backdrop-filter: blur($blur);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
}

@mixin glass-button {
  @include glass-card(0.15, 8px);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
}
```

### Supabase Integration Preparation
- Create composables for Supabase operations
- Use TypeScript interfaces for database schemas
- Implement proper error handling for async operations
- Structure authentication composables

Example Supabase composable structure:
```typescript
export const useSupabase = () => {
  // Supabase client and operations
  return {
    auth: {},
    database: {},
    storage: {}
  }
}

export default useSupabase
```

## File Naming Conventions
- **Components**: PascalCase (e.g., `UserProfile.vue`)
- **Composables**: camelCase with 'use' prefix (e.g., `useAuth.ts`)
- **Stores**: camelCase with 'use' and 'Store' (e.g., `useUserStore.ts`)
- **Types**: PascalCase with 'Interface' or 'Type' suffix (e.g., `UserInterface.ts`)

## Folder Structure
```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── layout/       # Layout components
│   └── features/     # Feature-specific components
├── composables/      # Reusable composition functions
├── stores/          # Pinia stores
├── types/           # TypeScript type definitions
├── styles/          # Global SCSS files
│   ├── _mixins.scss
│   ├── _variables.scss
│   └── glassmorphism.scss
└── supabase/        # Supabase configuration and types
```

## Best Practices

### Performance
- Use `defineAsyncComponent` for code splitting
- Implement proper lazy loading
- Use `shallowRef` and `shallowReactive` when appropriate

### Accessibility
- Include proper ARIA attributes
- Ensure keyboard navigation
- Maintain color contrast ratios

### Testing Considerations
- Write components to be easily testable
- Use dependency injection for external services
- Create mock implementations for Supabase

### Git Workflow
- Use conventional commits
- Create feature branches
- Write descriptive commit messages

## Glassmorphism Implementation

### Core CSS Classes
```scss
.glass-primary {
  @apply backdrop-blur-lg bg-gradient-to-r from-white/10 to-white/5;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

.glass-secondary {
  @apply backdrop-blur-md bg-white/5;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 16px 0 rgba(31, 38, 135, 0.2);
}
```

### Animation Guidelines
- Use smooth transitions (300ms ease)
- Implement subtle hover effects
- Add loading states with glassmorphism styling

Remember: Always prioritize modularity, type safety, and maintainable code structure. Each component should be self-contained and reusable across the application.