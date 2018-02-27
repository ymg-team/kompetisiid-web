import React from 'react'
import { Link } from 'react-router'

export default (props) => {
    const {next, prev} = props
    return <div className="col-md-12">
        <div className="container">
            <div className="row">
                <div className="col-md-10 col-md-push-1 m-t-b-20">
                <div className="competition-nextprev">
                    <div className={`col-md-4 align-left ${next ? 'btn-nextprev' : ''}`}>
                        {
                            next ?
                                <Link to={next.link}>
                                    <h4>sebelumnya</h4>
                                    {next.title}
                                </Link>
                            : <p />
                        }                                
                    </div>
                    <div className="col-md-4"><p /></div>
                    <div className={`col-md-4 align-right ${prev ? 'btn-nextprev' : ''}`}>
                        {
                            prev ?
                                <Link to={prev.link}>
                                    <h4>sebelumnya</h4>
                                    {prev.title}
                                </Link>
                            : <p />
                        }
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
}
