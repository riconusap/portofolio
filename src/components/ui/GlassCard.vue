<template>
  <div
    :class="cardClasses"
    @click="handleClick"
  >
    <div v-if="$slots.header" class="glass-card__header">
      <slot name="header" />
    </div>
    
    <div class="glass-card__content">
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="glass-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'GlassCard',
  props: {
    variant: {
      type: String,
      default: 'default',
      validator: (value: string) => ['default', 'elevated', 'outline'].includes(value)
    },
    padding: {
      type: Boolean,
      default: true
    },
    hoverable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const cardClasses = computed(() => [
      'glass-card',
      `glass-card--${props.variant}`,
      {
        'glass-card--no-padding': !props.padding,
        'glass-card--hoverable': props.hoverable
      }
    ])

    const handleClick = (event: Event) => {
      if (props.hoverable) {
        emit('click', event)
      }
    }

    return {
      cardClasses,
      handleClick
    }
  }
})
</script>

<style lang="scss" scoped>
.glass-card {
  @include glass-card();
  transition: var(--transition);

  &--default {
    background: rgba(255, 255, 255, 0.1);
  }

  &--elevated {
    @include glass-card-lg();
    transform: translateY(0);
  }

  &--outline {
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.2);
  }

  &--hoverable {
    cursor: pointer;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 48px 0 rgba(31, 38, 135, 0.5);
      background: rgba(255, 255, 255, 0.15);
    }
  }

  &--no-padding {
    .glass-card__content {
      padding: 0;
    }
  }

  &__header {
    padding: 1.5rem 1.5rem 0.75rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  &__content {
    padding: 1.5rem;
  }

  &__footer {
    padding: 0.75rem 1.5rem 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
}

@include mobile {
  .glass-card {
    &__header,
    &__content,
    &__footer {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }
}
</style>