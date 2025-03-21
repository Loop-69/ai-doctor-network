
import * as React from "react"

// Use a constant for the mobile breakpoint
export const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Function to update the state based on window size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Set the initial value
    checkMobile()

    // Use matchMedia for more reliable breakpoint detection
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Modern event listener syntax
    const onChange = () => checkMobile()
    mql.addEventListener("change", onChange)
    
    // Clean up event listener
    return () => mql.removeEventListener("change", onChange)
  }, [])

  // Return false as default when undefined (during SSR)
  return !!isMobile
}
