import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * Custom hook to detect if the current viewport is mobile size
 * Handles hydration properly by returning false during SSR
 * and updating after client-side hydration
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)
  const [isClient, setIsClient] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Mark that we're now on the client side
    setIsClient(true)
    
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Set initial value
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  // Return false during SSR to prevent hydration mismatch
  return isClient ? isMobile : false
}
