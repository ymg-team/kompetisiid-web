/**
 * Created by yussan on 28/02/17.
 */
import Moment from 'moment'

Moment.locale('id', {
    month: 'januari_februari_maret_april_mei_juni_juli_agustus_september_oktober_november_desember'.split('_'),
    monthsShort: 'jan_feb_mar_apr_mei_jun_jul_agu_sep_okt_nov_des'.split('_'),
    weekdays: 'minggu_senin_selasa_rabu_kamis_jum\'at_sabtu'.split('_'),
    weekdaysShort: 'min_sen_sel_rab_kam_jum_sab'.split('_'),
    weekdaysMin: 'mi_se_sl_ra_ka_ju_sa'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY LT',
        LLLL: 'dddd D MMMM YYYY LT'
    },
    calendar: {
        sameDay: '[hari ini pada] LT',
        nextDay: '[besok pada] LT',
        nextWeek: 'dddd [pada] LT',
        lastDay: '[kemarin pada] LT',
        lastWeek: 'dddd [latest pada] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: '%s lagi',
        past: '%s lalu',
        s: 'baru saja',
        m: 'semenit',
        mm: '%d mnt',
        h: 'sejam',
        hh: '%d jam',
        d: 'sehari',
        dd: '%d hari',
        M: 'sebulan',
        MM: '%d bln',
        y: 'setahun',
        yy: '%d thn'
    },
    // ordinal: function (number) {
    //     return number + (number === 1 ? 'er' : 'ème');
    // },
    week: {
        dow: 0, // Monday is the first day of the week.
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
})

Moment.locale('id')

export function epochToRelativeTime(epochtime)
{
  return Moment.unix(epochtime).fromNow()
}

export function datetimeToRelativeTime(datetime)
{
    const date = new Date(datetime)
    return Moment(datetime).fromNow()
}

export function strToDateTime(str)
{
    return ''
}

export function strToCal(str)
{
    return Moment(str).format('YYYYMMDD') + 'T000000Z'
}

export function today(format = 'Do MMM YY')
{
    return Moment().format(format)
}