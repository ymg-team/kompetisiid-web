import React, {PureComponent} from 'react'
import {truncate} from 'string-manager'
import {Link} from 'react-router'
import Transition from 'react-addons-css-transition-group'

export default class HomeSlider extends PureComponent
{
    static defaultProps = {
        meta: {}
    }

    constructor()
    {
        super()
        this.state = {
            active: 0
        }
        this.inteval = null
    }

    componentDidMount()
    {
        this.interval = setInterval(() => {
            this.setState({active: this.state.active < 3 ? this.state.active + 1 : 0})
        }, 15000)
    }

    componentWillUnmount()
    {
        clearInterval(this.interval)
    }

    render()
    {
        const {data, meta} = this.props
        if(meta.code)
        {
            if(meta.code == 200)
            {
                // success get data
                return <div className='col-md-12 home-slider'>
                    <div className='container'>
                        <div className='row'>
                            {/* preview */}
                            <CardPreview {...data[this.state.active]} />
                            {/* navigation */}
                            <div className='col-sm-12 home-slider-navigation'>
                                {data.map((n, key) => (
                                    <CardSelector 
                                        handleClick={() => this.setState({active: key})}
                                        is_active={this.state.active == key} 
                                        key={key} 
                                        {...n} />
                                ))}
                            </div>
                            {/* end of navigation */}
                        </div>
                        <div className='row'> 
                            <div className='col-sm-12' />
                        </div>
                    </div>
                </div>
            }else 
            {
                // failed get data
                return null
            }
        }else 
        {
            return null
        }
    }
}

const CardPreview = props => {
    return <Transition
        component='span'
        transitionName='card'
        transitionEnterTimeout={500}
        transitionLeave={false}>
            <div className='col-sm-6 home-slider-left'> 
            <h2>{props.title}</h2>
            <h3>Penyelenggara {props.penyelenggara}<br />Total Hadiah Senilai {props.total_hadiah}<br />Deadline {props.sisadeadline}</h3>
            <p style={{marginBottom: '1.5em'}}>{truncate(props.sort, 300, '...')}</p>
            <Link className='btn btn-bordergray' to={`/competition/${props.id_kompetisi}/regulations/${props.nospace_title}`}>SYARAT KETENTUAN</Link>
            </div>
            <div className='col-sm-6 home-slider-right'> 
                <div className='home-slider-poster' style={{backgroundImage: `url(${props.poster.original})`}} />
            </div>
    </Transition>
}

const CardSelector = props => {
    return <div className={`col-sm-6 col-md-3 home-slider-item ${props.is_active ? 'active' : ''}`}>
        <a href='javascript:;' onClick={() => props.handleClick()}>
            {props.title}
            <br />
            <small>
            {props.mainkategori} - {props.subkategori} <br />
            <strong>{props.total_hadiah}</strong></small>
        </a>
    </div>
}