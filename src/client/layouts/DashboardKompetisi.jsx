import React, {Component} from 'react'
import {Link} from 'react-router'

export default class DashboardKompetisi extends Component 
{
    render() 
    {
        const {show_sidebar, active_sidebar_competition} = this.props.routes[this.props.routes.length - 1]
        const {id} = this.props.params
        return(
            <div>
                <div className="col-md-8 dashboard-container">
                    {this.props.children}
                </div>
                {
                    show_sidebar ? 
                    <div className="col-md-2 bg-gray-main">
                        <nav className="dashboard-nav dashboard-nav-right">
                            <ul className="nav">
                                <li className={active_sidebar_competition == 1 ? 'active': ''}><Link to={`/dashboard/competition/${id}`}>Kompetisi</Link></li>
                                <li className={active_sidebar_competition == 2 ? 'active': ''}><Link to={`/dashboard/competition/${id}/announcement`}>Pengumuman<span className="badge pull-right">5 total</span></Link></li>
                                <li className={active_sidebar_competition == 3 ? 'active': ''}><Link to={`/dashboard/competition/${id}/discussion`}>Diskusi<span className="badge pull-right">324 belum terbaca</span></Link></li>
                            </ul>
                            <hr />
                            <ul className="nav">
                                <li><Link to={`/competition/${id}`}>Ke Detail Kompetisi</Link></li>
                                <li><Link to="#">Hapus Kompetisi</Link></li>
                            </ul>
                        </nav>
                    </div> :
                    null
                }
                
            </div>

        );
    }
}