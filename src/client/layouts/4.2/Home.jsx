import React, {Component} from 'react'
import Footer from '../../components/4.2/Footer'
import Header from '../../components/4.2/Header'
import {Link} from 'react-router'

export default class LayoutHome extends Component 
{
    constructor(props)
    {
        super(props)
        this.state = {
            q: this.props.children.props.location.query.q || ''
        }
    }

    componentDidMount()
    {
        const {q} = this.props.children.props.location.query
        if(q) this.setState({q})        
    }

    render()
    {
        const {q} = this.state
        return(
            <div>
                <Header 
                    q={q} 
                    setState={(obj) => this.setState(obj)}
                    />
                {this.props.children}
                <Footer />
                <div id='fullalert' />
            </div>
        )
    }
}