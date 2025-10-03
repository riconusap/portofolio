<template>
  <component
    :is="componentTag"
    :class="buttonClasses"
    :disabled="disabled || loading"
    :href="href"
    :to="to"
    @click="handleClick"
  >
    <span v-if="loading" class="loading-spinner"></span>
    <span v-if="icon && !loading" :class="iconClasses">{{ icon }}</span>
    <span class="button-content">
      <slot />
    </span>
  </component>
</template>

<script lang="ts">
import { defineComponent, computed, type PropType } from 'vue'
import type { ButtonProps, ButtonVariant, ButtonSize } from '@/types'

export default defineComponent({
  name: 'GlassButton',
  props: {
    variant: {
      type: String as PropType<ButtonVariant>,
      default: 'primary'
    },
    size: {
      type: String as PropType<ButtonSize>,
      default: 'md'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    href: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: ''
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const componentTag = computed(() => {
      if (props.href) return 'a'
      if (props.to) return 'router-link'
      return 'button'
    })

    const buttonClasses = computed(() => [
      'glass-button',
      `glass-button--${props.variant}`,
      `glass-button--${props.size}`,
      {
        'glass-button--disabled': props.disabled,
        'glass-button--loading': props.loading
      }
    ])

    const iconClasses = computed(() => [
      'button-icon',
      {
        'button-icon--only': !props.$slots.default
      }
    ])

    const handleClick = (event: Event) => {
      if (!props.disabled && !props.loading) {
        emit('click', event)
      }
    }

    return {
      componentTag,
      buttonClasses,
      iconClasses,
      handleClick
    }
  }
})
</script>

<style lang="scss" scoped>
.glass-button {
  @include glass-button();
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;
  text-decoration: none;
  outline: none;
  position: relative;
  overflow: hidden;

  &--primary {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2));
    color: var(--text-primary);
    
    &:hover {
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3));
    }
  }

  &--secondary {
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-secondary);
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      color: var(--text-primary);
    }
  }

  &--outline {
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.3);
    color: var(--text-primary);
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.5);
    }
  }

  &--ghost {
    background: transparent;
    border: none;
    color: var(--text-secondary);
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: var(--text-primary);
    }
  }

  &--sm {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    border-radius: 8px;
  }

  &--md {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border-radius: 12px;
  }

  &--lg {
    padding: 1rem 2rem;
    font-size: 1.125rem;
    border-radius: 16px;
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    
    &:hover {
      transform: none;
    }
  }

  &--loading {
    cursor: wait;
    
    .button-content {
      opacity: 0.7;
    }
  }
}

.button-icon {
  font-size: 1.2em;
  
  &--only {
    margin: 0;
  }
}

.button-content {
  transition: var(--transition);
}

.loading-spinner {
  width: 1em;
  height: 1em;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>