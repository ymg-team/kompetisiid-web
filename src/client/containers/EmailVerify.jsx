/**
 * Created by yussan on 04/02/17.
 */
import React, {Component} from 'react'
import Helmet from 'react-helmet'
import Loader from '../components/spiner/Circle'

import {connect} from 'react-redux'
import {emailVerification} from '../../store/user/actions'

class EmailVerify extends Component
{

    componentDidMount()
    {
        const {token} = this.props.location.query
        this.props.dispatch(emailVerification(token))
    }

    componentWillReceiveProps(np)
    {
        if(np.email_verification.meta)
        {
            this.setState({
                onprogress: false
            }, () => {
                if(np.email_verification.meta.code === 201)
                {
                    setTimeout(() => {
                        fullalert.close()
                        window.location.href = '/'
                    },1500)
                    fullalert.open('success', np.email_verification.meta.message, false)
                }else
                {
                    fullalert.open('error', np.email_verification.meta.message, false)
                }
            })
        }
    }

    render()
    {
        return(
            <div className="text-center">
                <Helmet
                    title="Email verification..."
                />
                <Loader  />sedang verifikasi email..
            </div>
        )
    }
}

function mapStateToProps(state)
{
    return {
        email_verification: state.User.email_verification
    }
}

function mapDispatchToProps(dispatch)
{
    return {
        dispatch
    }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(EmailVerify)