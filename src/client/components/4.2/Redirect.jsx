import React, { Component } from 'react'

export default class Redirect extends Component 
{
    componentDidMount()
    {
        // setTimeout(() => {
        //     location.href=this.props.url
        // }, 1000)
    }

    render()
    {
        const { url } = this.props
        return(
            <div className='col-md-12 bg-gray-soft'>
                <div className='container'>
                    <div className='row redirect'>
                        <div className='redirect-content bg-white align-center'>
                            <p>
                                Kamu akan meninggalkan kompetisi.id .
                                <br />
                                Jika ingin melanjutkan, silahkan klik dibawah ini
                                {' '}
                                <a rel='nofollow' href={url}>klik disini</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}