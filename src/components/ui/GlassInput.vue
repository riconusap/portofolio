<template>
  <div class="glass-input-wrapper">
    <label v-if="label" :for="inputId" class="glass-input__label">
      {{ label }}
      <span v-if="required" class="glass-input__required">*</span>
    </label>
    
    <input
      :id="inputId"
      v-model="inputValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :class="inputClasses"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
    />
    
    <span v-if="error" class="glass-input__error">
      {{ error }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

export default defineComponent({
  name: 'GlassInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue', 'input', 'blur', 'focus'],
  setup(props, { emit }) {
    const inputId = ref(`glass-input-${Math.random().toString(36).substr(2, 9)}`)
    const isFocused = ref(false)

    const inputValue = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value)
    })

    const inputClasses = computed(() => [
      'glass-input',
      {
        'glass-input--error': props.error,
        'glass-input--disabled': props.disabled,
        'glass-input--focused': isFocused.value
      }
    ])

    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement
      emit('input', target.value)
    }

    const handleFocus = (event: Event) => {
      isFocused.value = true
      emit('focus', event)
    }

    const handleBlur = (event: Event) => {
      isFocused.value = false
      emit('blur', event)
    }

    return {
      inputId,
      inputValue,
      inputClasses,
      handleInput,
      handleFocus,
      handleBlur
    }
  }
})
</script>

<style lang="scss" scoped>
.glass-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.glass-input {
  @include glass-input();
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  
  &::placeholder {
    color: var(--text-muted);
  }
  
  &--focused {
    background: rgba(255, 255, 255, 0.12);
  }
  
  &--error {
    border-color: rgba(239, 68, 68, 0.5);
    
    &:focus {
      border-color: rgba(239, 68, 68, 0.7);
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
  }
  
  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.glass-input__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
}

.glass-input__required {
  color: rgba(239, 68, 68, 0.8);
}

.glass-input__error {
  font-size: 0.875rem;
  color: rgba(239, 68, 68, 0.9);
  margin-top: 0.25rem;
}

@include mobile {
  .glass-input {
    padding: 0.625rem 0.875rem;
    font-size: 0.9rem;
  }
}
</style>