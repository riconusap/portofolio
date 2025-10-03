import { ref, onUnmounted } from 'vue'

export const useIntersectionObserver = (
  options: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  }
) => {
  const isVisible = ref(false)
  const target = ref<Element | null>(null)

  let observer: IntersectionObserver | null = null

  const observe = (element: Element) => {
    if (observer) {
      observer.unobserve(element)
    }

    observer = new IntersectionObserver(([entry]) => {
      isVisible.value = entry.isIntersecting
    }, options)

    observer.observe(element)
    target.value = element
  }

  const unobserve = () => {
    if (observer && target.value) {
      observer.unobserve(target.value)
    }
  }

  onUnmounted(() => {
    unobserve()
  })

  return {
    isVisible,
    observe,
    unobserve
  }
}

// Animation on scroll composable
export const useAnimateOnScroll = (animationClass: string = 'animate-fade-in-up') => {
  const { isVisible, observe } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  })

  const bindElement = (element: Element) => {
    observe(element)
    
    if (isVisible.value) {
      element.classList.add(animationClass)
    }
  }

  return {
    isVisible,
    bindElement
  }
}

export default useIntersectionObserver