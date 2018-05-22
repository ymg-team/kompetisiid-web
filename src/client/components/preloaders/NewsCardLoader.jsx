import React from 'react'

const Loader = (props) => {
    let childs = []
    for(let n = 0; n < props.total;n++)
    {
        childs.push(
            <div key={n} className={`${props.size == 'large' ? 'col-md-4' : 'col-md-3'} ${n > 0 ? 'hide-mobile' : ''}`}>
                <div className='news-loader'>
                    <div className='animated-background'>
                        <div className='background-masker background-masker-1' />
                        <div className='background-masker background-masker-1-1' />
                        <div className='background-masker background-masker-1-2' />
                        <div className='background-masker background-masker-2' />
                        <div className='background-masker background-masker-2-1' />
                        <div className='background-masker background-masker-2-2' />
                        <div className='background-masker background-masker-3' />
                        <div className='background-masker background-masker-3-1' />
                        <div className='background-masker background-masker-3-2' />
                    </div>
                </div>
            </div>
        )
    }

    return <div className='row'>{childs}</div>
}

Loader.defaultProps = {
    total: 3,
    size: 'large'
}

export default Loader