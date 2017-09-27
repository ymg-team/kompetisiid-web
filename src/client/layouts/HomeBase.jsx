import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Ads from '../components/ads/TopAds'

export default class HomeBase extends React.Component
{
    componentDidMount()
    {
        topProgress.progress = $('#top-progress-bar')
    }

    componentDidUpdate()
    {
        document.addEventListener('fb_init', e => FB.XFBML.parse())
    }

    render()
    {
        const {fullscreen, ads, isRed} = this.props.children.props.route
        return (
            <div>
                <div className="progress-container">
                    <div id="top-progress-bar" className="progress-bar"></div>
                </div>
                <div id="darkmasking" />
                {!fullscreen ?
                    <div>
                        {
                            typeof window != 'undefined'?
                                __data__.User.session.data && __data__.User.session.data.is_verified != 1 ?
                                    <div style={{margin:0}} className="alert alert-warning">
                                        <div className="container">
                                            <strong>Satu langkah lagi</strong> anda belum melakukan konfirmasi email, silahkan cek email untuk melanjutkan
                                        </div>
                                    </div>
                                    : null
                                : null
                        }
                        {ads ? <Ads />: null}
                        <Header isRed={isRed} query={this.props.location.query} />
                    </div>
                    :null}

                {this.props.children}

                <div style={{display:'none'}} id="fullalert-success" className="fullalert fullalert-success">
                    <strong>sukses </strong> <span className="fullalert-text" />
                    {' '}
                    <a onClick={() => fullalert.close()} href="javascript:;">(x)</a>
                </div>
                <div style={{display:'none'}} id="fullalert-error" className="fullalert fullalert-error">
                    <strong>maaf </strong> <span className="fullalert-text" />
                    {' '}
                    <a onClick={() => fullalert.close()} href="javascript:;">(x)</a>
                </div>
                <div style={{display:'none'}} id="fullalert-loading" className="fullalert fullalert-loading">
                    <strong>tunggu sebentar </strong> <span className="fullalert-text" />
                </div>
                {/* footer */}
                {!fullscreen ?
                    <Footer />
                    : null}
                <button id="btn-up" style={{display:'none',position:'fixed',bottom:'10px',zIndex:10,right:'10px'}} className="btn btn-lg">
                    <i className="glyphicon glyphicon-chevron-up" />
                </button>    
            </div>
        )
    }
}