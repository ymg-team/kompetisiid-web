export const duration = 300
export const style = {
  fade: {
    default: {
      transition: `opacity ${duration}ms ease-in-out`,
      opacity: 0,
    },
    entering: { opacity: 0 },
    entered: { opacity: 1 }
  }
}