import { reactive } from 'vue'

interface FormField {
  value: string | number
  error: string
  touched: boolean
  required?: boolean
  validator?: (value: any) => string | null
}

interface FormState {
  [key: string]: FormField
}

export const useForm = <T extends Record<string, any>>(initialValues: T) => {
  const formState = reactive<FormState>(
    Object.keys(initialValues).reduce((acc, key) => {
      acc[key] = {
        value: initialValues[key],
        error: '',
        touched: false,
        required: false,
        validator: undefined
      }
      return acc
    }, {} as FormState)
  )

  const setFieldValue = (fieldName: string, value: any) => {
    if (formState[fieldName]) {
      formState[fieldName].value = value
      formState[fieldName].touched = true
      validateField(fieldName)
    }
  }

  const setFieldError = (fieldName: string, error: string) => {
    if (formState[fieldName]) {
      formState[fieldName].error = error
    }
  }

  const setFieldValidator = (fieldName: string, validator: (value: any) => string | null) => {
    if (formState[fieldName]) {
      formState[fieldName].validator = validator
    }
  }

  const setFieldRequired = (fieldName: string, required: boolean = true) => {
    if (formState[fieldName]) {
      formState[fieldName].required = required
    }
  }

  const validateField = (fieldName: string) => {
    const field = formState[fieldName]
    if (!field) return true

    // Clear previous error
    field.error = ''

    // Required validation
    if (field.required && (!field.value || field.value.toString().trim() === '')) {
      field.error = `${fieldName} is required`
      return false
    }

    // Custom validator
    if (field.validator) {
      const error = field.validator(field.value)
      if (error) {
        field.error = error
        return false
      }
    }

    return true
  }

  const validateForm = () => {
    let isValid = true
    
    Object.keys(formState).forEach(fieldName => {
      const fieldValid = validateField(fieldName)
      if (!fieldValid) {
        isValid = false
      }
    })

    return isValid
  }

  const resetForm = () => {
    Object.keys(formState).forEach(fieldName => {
      formState[fieldName].value = initialValues[fieldName]
      formState[fieldName].error = ''
      formState[fieldName].touched = false
    })
  }

  const getFieldProps = (fieldName: string) => {
    const field = formState[fieldName]
    if (!field) return {}

    return {
      modelValue: field.value,
      error: field.error,
      required: field.required,
      'onUpdate:modelValue': (value: any) => setFieldValue(fieldName, value),
      onBlur: () => validateField(fieldName)
    }
  }

  const getFormValues = () => {
    return Object.keys(formState).reduce((acc, key) => {
      (acc as any)[key] = formState[key].value
      return acc
    }, {} as T)
  }

  const hasErrors = () => {
    return Object.values(formState).some(field => field.error !== '')
  }

  return {
    formState,
    setFieldValue,
    setFieldError,
    setFieldValidator,
    setFieldRequired,
    validateField,
    validateForm,
    resetForm,
    getFieldProps,
    getFormValues,
    hasErrors
  }
}

// Email validator
export const emailValidator = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address'
  }
  return null
}

// Phone validator
export const phoneValidator = (phone: string): string | null => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  if (!phoneRegex.test(phone.replace(/[-\s\(\)]/g, ''))) {
    return 'Please enter a valid phone number'
  }
  return null
}

// URL validator
export const urlValidator = (url: string): string | null => {
  try {
    new URL(url)
    return null
  } catch {
    return 'Please enter a valid URL'
  }
}

// Min length validator
export const minLengthValidator = (minLength: number) => {
  return (value: string): string | null => {
    if (value.length < minLength) {
      return `Minimum length is ${minLength} characters`
    }
    return null
  }
}

export default useForm