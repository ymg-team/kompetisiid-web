import React, {Component} from 'react'

export default class Error extends Component
{
    render()
    {
        return(
            <span>
                {this.props.children}
            </span>
        )
    }
}
