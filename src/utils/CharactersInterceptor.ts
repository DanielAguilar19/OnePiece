import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useIntersectionObserver(
  target: Ref<HTMLElement | null>,
  callback: () => void,
  options: IntersectionObserverInit = { threshold: 0.1 },
) {
  const observer = ref<IntersectionObserver | null>(null)

  const setupObserver = () => {
    if (!target.value) return

    observer.value = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback()
        }
      })
    }, options)

    observer.value.observe(target.value)
  }

  const cleanupObserver = () => {
    if (observer.value) {
      observer.value.disconnect()
      observer.value = null
    }
  }

  onMounted(() => {
    setupObserver()
  })

  onUnmounted(() => {
    cleanupObserver()
  })

  return {
    observer,
    cleanupObserver,
  }
}
