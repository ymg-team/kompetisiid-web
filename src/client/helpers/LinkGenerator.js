import React from 'react'

/**
 * Created by yussan on 21/10/16.
 */
export function singleLink(id, title, prefix)
{
    return `/${prefix}/${id}/${title}`
}

export function generateLink(link, target = '_self')
{
    if(link.search('http') > -1 )
    {
        return <a href={`/exit?to=${link}`} target={target}>{link}</a>
    }else
    {
        return link
    }
}

export function isHttps(link)
{
    if(link.search('https') > -1 )
    {
        return true
    }else
    {
        return false
    }
}

export function openInNewTab(url)
{
    return (window.open(url, '_blank')).focus()
}
