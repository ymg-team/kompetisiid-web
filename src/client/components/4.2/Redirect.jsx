import React, {Component} from 'react'


export default class Redirect extends Component 
{
    componentDidMount()
    {
        setTimeout(() => {
            location.href=this.props.url
        }, 1000)
    }

    render()
    {
        const {url} = this.props
        return(
            <div className='col-md-12 bg-gray-soft'>
                <div className='container'>
                    <div className='row redirect'>
                        <div className='redirect-content bg-white align-center'>
                            <p>
                                Kamu akan diredirect ke halaman
                                {' '}
                                <i>{url}</i> dalam 2 detik.
                                <br />
                                Jika halaman tidak berubah, silahkan
                                {' '}
                                <a href={url}>klik disini</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}