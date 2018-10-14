import React, {Component} from 'react'
import { validator, validationSeter, validationChecker } from './Validator'
import {alert} from '../Alert'

export default class Button extends Component 
{
  handleClick()
  {
    if(Object.keys(validator).length < 1)//no data input
    {
      alert(true, 'beberapa input wajib diisi', 'error')
      this.props.setState(validationSeter(this.props.requiredInputs), () => {
        const errorEl = document.getElementsByClassName('error')[0]
        errorEl.scrollIntoView({block: "end", behavior: "smooth"})
      })            
    }else if(!validationChecker())
    {
      alert(true, 'beberapa input belum valid', 'error')
      const errorEl = document.getElementsByClassName('error')[0]
      errorEl.scrollIntoView({block: "end", behavior: "smooth"})
            
    }else
    {
      return this.props.action()
    }
  }

  render()
  {
    let {style, className} = this.props
    return(
      <div className='form-child'>
        <button 
          onClick={() => this.handleClick()}
          className={`${className} ${this.props.loading ? 'loading' : ''}`} 
          disabled={(this.props.disabled || this.props.loading)}
          style={style}
          type={this.props.type}>
          {this.props.loading ? 'Memproses permintaan...' : this.props.text }
        </button>
      </div>
    )
  }
}

Button.defaultProps = {
  type: 'submit',
  disabled: false,
  className: 'btn btn-white',
  style: {},
}
