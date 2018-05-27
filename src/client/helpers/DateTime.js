/**
 * Created by yussan on 28/02/17.
 */

const Bulan = [
  ['jan', 'januari'],
  ['feb', 'februari'],
  ['mar', 'maret'],
  ['apr', 'april'],
  ['mei', 'mei'],
  ['jun', 'juni'],
  ['jul', 'juli'],
  ['agu', 'agustus'],
  ['sep', 'september'],
  ['okt', 'oktober'],
  ['nov', 'november'],
  ['des', 'desember']
]

// ref : https://www.samclarke.com/javascript-convert-time-ago-future/
export function epochToRelativeTime(epochtime) {
  const lang = lang || {
    postfixes: {
      '<': ' lagi',
      '>': ' lalu'
    },
    1000: {
      singular: 'beberapa saat',
      plural: 'beberapa saat'
    },
    60000: {
      singular: 'semenit',
      plural: '# menit'
    },
    3600000: {
      singular: 'sejam',
      plural: '# jam'
    },
    86400000: {
      singular: 'sehari',
      plural: '# hari'
    },
    2592000000: {
      singular: 'sebulan',
      plural: '# bulan'
    },
    31540000000: {
      singular: 'setahun',
      plural: '# tahun'
    }
  }

  const now = Date.now()
  const timespans = [1000, 60000, 3600000, 86400000, 2592000000, 31540000000]
  let timeDifference = now - epochtime * 1000
  const postfix = lang.postfixes[timeDifference < 0 ? '<' : '>']
  let timespan = timespans[0]

  if(timeDifference < 0) timeDifference = timeDifference * -1

  for (let i = 1; i < timespans.length; i++) {
    if (timeDifference > timespans[i]) {
      timespan = timespans[i]
    }
  }

  const n = Math.round(timeDifference / timespan)

  return lang[timespan][n > 1 ? 'plural' : 'singular'].replace('#', n) +  postfix
}

export function datetimeToRelativeTime(datetime) {
  const date = new Date(datetime)
  return epochToRelativeTime(date)
}

export function strToDateTime(str) {
  return ''
}

export function today(format = 'Do MMM YY') {
  const d = new Date()
  return `${d.getDate()} ${Bulan[d.getMonth()][0]} ${d.getFullYear()}`
}
