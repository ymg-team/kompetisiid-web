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

// copy to clipboard
export function copyText(str)
{

}