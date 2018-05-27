export function nominalToText(nominal) {
  let text = ''
  if(nominal >= 100000 && nominal < 1000000) {
    nominal = `${nominal / 1000} ribu`
  } else if (nominal >= 1000000 && nominal < 1000000000 ){
    nominal = `${nominal / 1000000} juta`
  } else if (nominal >= 1000000000 ){
    nominal = `${nominal / 1000000000} milyar`
  }

  return `Rp ${nominal}`
}
