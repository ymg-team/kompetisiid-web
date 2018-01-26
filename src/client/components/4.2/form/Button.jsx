import React, {Component} from 'react'
import {validator, validationSeter, validationChecker} from './Validator'

export default class Button extends Component 
{
    handleClick()
    {
        fullalert('warning', 'memproses permintaan....')
        if(Object.keys(validator).length < 1)//no data input
        {
            fullalert('error', 'beberapa input wajib diisi')
            this.props.setState(validationSeter(this.props.requiredInputs), () => {
                const errorEl = document.getElementsByClassName('error')[0]
                errorEl.scrollIntoView({block: "end", behavior: "smooth"})
            })            
        }else if(!validationChecker())
        {
            const errorEl = document.getElementsByClassName('error')[0]
            fullalert('error', 'beberapa input belum valid')
            errorEl.scrollIntoView({block: "end", behavior: "smooth"})
            
        }else
        {
            return this.props.action()
        }
    }

    render()
    {
        const {style, className} = this.props
        return(
            <div className='form-child'>
                <button 
                    onClick={() => this.handleClick()}
                    className={className} 
                    disabled={this.props.disabled}
                    style={style}
                    type={this.props.type}>
                    {this.props.text}
                </button>
            </div>
        )
    }
}

Button.defaultProps = {
    type: 'submit',
    disabled: false,
    className: 'btn btn-white'
}