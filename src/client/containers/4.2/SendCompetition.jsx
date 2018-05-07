import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Subheader from '../../components/Subheader'
import Helmet from '../../components/Helmet'
import {title, desc} from './AddCompetition'
import InputText from '../../components/form/InputText'
import InputFile from '../../components/form/InputFile'
import Button from '../../components/form/Button'

import {submitCepat} from '../../../store/pasang/actions'
import {validator, validationSeter, validationChecker} from '../../components/form/Validator'
import {connect} from 'react-redux'

let RecaptchaContainer

class AddCompetitionFast extends Component 
{
    constructor(props)
    {
        super(props)
        this.state = {
            is_accept: false
        }
    }

    componentDidMount()
    {
        addScript()
        setTimeout(() => {
            renderRecaptcha()
        }, 1500)
    }

    componentWillReceiveProps()
    {
        renderRecaptcha()
    }

    componentWillUnmount()
    {
        fullalert('close')
        grecaptcha.reset(RecaptchaContainer)
    }


    handleSubmit()
    {
        if(!this.state.is_accept)
        {
            return fullalert('error', 'wajib menyetujui syarat dan ketentuan yang berlaku')
        }else if((grecaptcha.getResponse()).length == 0) 
        {
            return fullalert('error', 'Google Recaptcha belum valid')
        }else //start submit
        {
            return this.props.dispatch(submitCepat({
                link: this.state.input_link,
                nama: this.state.input_title,
                email: this.state.input_email,
                poster: this.state.input_poster
            }))
        }
    }

    render()
    {
        const {response} = this.props
        if(response.is_loading) fullalert('warning', 'mengirim kompetisi...')

        if(response.meta)
        {
            if(response.meta.code === 201)
            {
                fullalert('success', response.meta.message)
                setTimeout(() => {location.href='/add/send'}, 500)
            }
            else
            {
                fullalert('error', response.meta.message)
            }
        }

        return (
            <div>
                <Helmet 
                    title='Kirim kompetisi'
                    description={desc}
                />
                <Subheader 
                    title='Kirim kompetisi'
                    desc={desc}
                />
                <div style={{marginTop:'20px'}} className='col-md-12'>
                    <div className='container'>
                    <div className='col-md-6 col-md-push-3 p-50-0'>
                        <h2>Kirim Kompetisi</h2>
                        <p className='text-muted'>Silahkan isi formulir dibawah ini secara komplit. Kami akan memberitahukan melalui email untuk memberikan jawaban seputar status kompetisi yang anda kirim ini.
                        <br />
                        <br />
                        <Link to='/add'>kembali ke pasang</Link></p>
                        <hr />
                        <form method='POST' className='form-ki' action='javascript:;'>
                            <InputText 
                                label='email'
                                name='input_email'
                                setState={(n, cb) => this.setState(n, cb)}
                                validate={ this.state.input_email_validate || {}}
                                value={this.state.input_email || ''}
                                required={true}
                                max={50}
                                type='email'
                            />
                            <InputText 
                                label='judul kompetisi'
                                name='input_title'
                                setState={(n, cb) => this.setState(n, cb)}
                                validate={ this.state.input_title_validate || {}}
                                value={this.state.input_title || ''}
                                required={true}
                                max={300}
                            />
                            <InputText 
                                label='link sumber'
                                name='input_link'
                                setState={(n, cb) => this.setState(n, cb)}
                                validate={ this.state.input_link_validate || {}}
                                value={this.state.input_link || ''}
                                required={true}
                                max={300}
                                type='link'
                            />
                            <InputFile
                                label='poster'
                                name='input_poster'
                                max='2000000' //max 2MB
                                setState={(n, cb) => this.setState(n, cb)}
                                validate={ this.state.input_poster_validate || {}}
                                value={this.state.input_poster || ''}
                            />
                            <div className='form-child'>
                                <input 
                                    onClick={() => this.setState({is_accept: !this.state.is_accept})}
                                    type='checkbox' />
                                <span className='text-muted'>&nbsp; saya menyetujui syarat dan ketentuan yang berlaku</span>
                            </div>
                            <div className='form-child'>
                                <div id="g-recaptcha" className="g-recaptcha" data-sitekey="6LcRCAQTAAAAANRlhWdxZvkj00Ee4aP_Zc2Q42Mi" />
                            </div>
                            <div className='form-child'>
                                <Button 
                                    text='kirim permintaan'
                                    disabled={response.is_loading}
                                    requiredInputs={['input_email', 'input_title', 'input_link', 'input_poster']}
                                    setState={(n, cb) => this.setState(n, cb)}
                                    action={() => this.handleSubmit()}
                                />
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

function addScript()
{
    if(!window.grecaptcha)
    {
        let script = document.createElement('script')
        script.setAttribute('src', 'https://www.google.com/recaptcha/api.js')
        document.head.appendChild(script)
    }
}

function renderRecaptcha()
{
    if(window.grecaptcha && !document.getElementById('g-recaptcha'))
    {
        RecaptchaContainer = grecaptcha.render('g-recaptcha', {
            'sitekey': '6LcRCAQTAAAAANRlhWdxZvkj00Ee4aP_Zc2Q42Mi'
        })
    }
}

function mapStateToProps(state)
{
    const {Pasang} = state
    return {
        response: Pasang.cepat
    }
}

function mapDispatchToProps(dispatch)
{
    return {
        dispatch
    }
}

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCompetitionFast)
