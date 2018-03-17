import React, {Component} from 'react'
import Footer from '../../components/4.2/Footer'
import Header from '../../components/4.2/Header'
import Sidebar from '../../components/4.2/navigations/SidebarDashboard'
import { Link } from 'react-router-dom'

export default class Dashboard extends Component 
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
                <div className="col-md-12">
                    <div className="row m-t-2em">
                        <Sidebar />
                        <div className="col-md-10">
                            {this.props.children}
                        </div>
                    </div>
                </div>
                <Footer />
                <div id='fullalert' />
            </div>
        )
    }
}