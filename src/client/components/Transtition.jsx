export const duration = 200
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
