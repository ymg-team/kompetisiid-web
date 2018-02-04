// event to fire to valid DOM
export function eventFire(el, evType)
{
    if(el.fireEvent)
    {
        el.fireEvent('on' + eventType)
    }else 
    {
        const evObj = document.createEvent('Event')
        evObj.initEvent(evType, true, false)
        el.dispatchEvent(evObj)
    }
}

export function pushScript(src, cb)
{
    if(!isScriptLoaded())
    {
        const s = document.createElement('script')
        s.setAttribute('src', src)
        if(cb)
            s.onload = cb
        document.body.appendChild(s)
    }
}

function isScriptLoaded(src)
{
    const scripts = document.getElementsByTagName('script')
    // is script available
    for (let i = scripts.length; i--;) {
        if (scripts[i].src == src) return true
    }

    return false
}