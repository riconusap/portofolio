import { ref, onMounted, onUnmounted } from 'vue'

export const useScrollSpy = (sections: string[], offset: number = 100) => {
  const activeSection = ref('')

  const handleScroll = () => {
    const scrollPosition = window.scrollY + offset

    for (const section of sections) {
      const element = document.getElementById(section)
      if (element) {
        const elementTop = element.offsetTop
        const elementHeight = element.offsetHeight

        if (scrollPosition >= elementTop && scrollPosition < elementTop + elementHeight) {
          activeSection.value = section
          break
        }
      }
    }
  }

  onMounted(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    activeSection
  }
}

export default useScrollSpy