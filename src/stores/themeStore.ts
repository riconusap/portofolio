import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // State
  const currentTheme = ref('dark')
  const primaryColor = ref('#3b82f6')
  const accentColor = ref('#8b5cf6')
  const isMenuOpen = ref(false)
  const activeSection = ref('hero')

  // Actions
  const setTheme = (theme: string) => {
    currentTheme.value = theme
    // Update CSS variables or apply theme logic here
  }

  const setPrimaryColor = (color: string) => {
    primaryColor.value = color
    // Update CSS custom property
    document.documentElement.style.setProperty('--accent-primary', color)
  }

  const setAccentColor = (color: string) => {
    accentColor.value = color
    // Update CSS custom property
    document.documentElement.style.setProperty('--accent-secondary', color)
  }

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }

  const closeMenu = () => {
    isMenuOpen.value = false
  }

  const setActiveSection = (section: string) => {
    activeSection.value = section
  }

  // Initialize theme
  const initializeTheme = () => {
    // Set initial CSS custom properties
    setPrimaryColor(primaryColor.value)
    setAccentColor(accentColor.value)
  }

  return {
    // State
    currentTheme,
    primaryColor,
    accentColor,
    isMenuOpen,
    activeSection,
    
    // Actions
    setTheme,
    setPrimaryColor,
    setAccentColor,
    toggleMenu,
    closeMenu,
    setActiveSection,
    initializeTheme
  }
})

export default useThemeStore