import React, {PureComponent} from 'react'

export default class GoogleAdsense extends PureComponent 
{
    componentDidMount()
    {
        console.log('render ga...')
        if(window) (window.adsbygoogle = window.adsbygoogle || []).push({});
    }

    render()
    {
        switch(this.props.type)
        {
            case 'leaderboard':
                return <LeaderBoard />
            case 'reponsive':
            default: 
                return <Responsive />
        }
    }
}

const LeaderBoard = () => (
    <div className='col-md-12'>
        <div className='container align-center'>
            <ins 
                className='adsbygoogle' 
                style={{display: 'inline-block', width: 728, height: 90}} 
                data-ad-client='ca-pub-4468477322781117' 
                data-ad-slot={3854326285} />
        </div>
    </div>
)

const Responsive = () => (
    <ins 
        className='adsbygoogle' 
        style={{display: 'block'}} 
        data-ad-client='ca-pub-4468477322781117' 
        data-ad-slot={6629922616} 
        data-ad-format='auto' />
)