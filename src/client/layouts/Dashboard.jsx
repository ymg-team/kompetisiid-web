import React, {Component} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/dashboard/SidebarDashboard'

export default class Dashboard extends Component 
{
    render()
    {
        const {active_sidebar} = this.props.routes[this.props.routes.length - 1]
        return(
            <div>
                {/*header*/}
                <Header fullwidth={true} query={this.props.location.query} />
                <div className="bg-gray-main col-lg-12">
                    {/*sidebar*/}
                    <Sidebar active={active_sidebar} />
                    {/*content*/}
                    {this.props.children}
                </div>
                {/*footer*/}
                <Footer />
            </div>
        )
    }
}