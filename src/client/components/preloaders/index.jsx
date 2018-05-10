import React from "react"

export function topLoading(loading = true) {
  const el = document.getElementById('ki-logo')
  if(el) {
    if(loading) {
      el.classList.add('spinner')
    } else {
      el.classList.remove('spinner')
    }
  }
}
