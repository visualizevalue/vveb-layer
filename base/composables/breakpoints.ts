export const useWindowBreakpoints = () => {
  const REM = 16

  const breakpoints = useBreakpoints({
    xs: 24 * REM,
    sm: 27 * REM,
    md: 45 * REM,
    lg: 64 * REM,
  })

  return breakpoints
}
