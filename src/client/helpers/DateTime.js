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
  ['des', 'desember'],
]

const timeSegments = [
  3.154e10,
  2.628e9,
  6.048e8,
  8.64e7,
  3.6e6,
  60000,
  -Infinity
]

const makeTimeString = (unit, singularString) => (timeSegment, time) =>
time >= 2 * timeSegment
  ? `${Math.floor(time / timeSegment)} ${unit} lalu`
  : singularString

const timeFunctions = [
  makeTimeString('tahun', 'setahun lalu'),
  makeTimeString('bulan', 'sebulan lalu'),
  makeTimeString('minggu', 'seminggu lalu'),
  makeTimeString('hari', 'sehari lalu'),
  makeTimeString('jam', 'sejam lalu'),
  makeTimeString('menit', 'semenit lalu'),
  () => 'barusaja'
]

export function epochToRelativeTime(epochtime)
{
  const timeDifference = Date.now() - (epochtime * 1000)
  const index = timeSegments.findIndex(time => timeDifference >= time)
  const timeAgo = timeFunctions[index](timeSegments[index], timeDifference)
  return timeAgo
}

export function datetimeToRelativeTime(datetime)
{
    const date = new Date(datetime)
    return epochToRelativeTime(date)
}

export function strToDateTime(str)
{
    return ''
}

export function today(format = 'Do MMM YY')
{
    const d = new Date() 
    return `${d.getDate()} ${Bulan[d.getMonth()][0]} ${d.getFullYear()}`
}
