import React, {Component} from 'react'
import UserStats from '../../components/4.2/navigations/TabProfile'
import Helmet from '../../components/Helmet'

import {profile} from '../../../store/user/actions'
import {epochToRelativeTime} from '../../helpers/DateTime'
import {connect} from 'react-redux'

class UserProfile extends Component 
{
    static fetchData({params, store})
    {
        return store.dispatch(profile(params.username))
    }

    componentDidMount()
    {   
        this.reqData(this.props)
    }

    componentWillReceiveProps(np)
    {
        this.reqData(np)
    }

    reqData(props)
    {
        const {username} = props.params
        if(!this.props.profile[username])
        {
            const {dispatch} = props 
            window.scrollTo(0, 0)
            dispatch(profile(username))
        }
    }    

    render()
    {
        const {profile} = this.props
        const {username} = this.props.params
        let helmetdata = {}

        if(profile[username] && profile[username].meta)
        {
            if(profile[username].meta.code == 200)
            {
                helmetdata = {
                    title: `profil ${username} - Kompetisi Indonesia`,
                    description: `halaman profil ${username} - di Kompetisi Indonesia`
                }
            }else 
            {
                helmetdata = {
                    title: `profil ${username} - Kompetisi Indonesia`,
                    description: profile[username].meta.message
                }
            }
        }else 
        {
            helmetdata = {
                title: 'user tidak ditemukan',
                description: 'user tidak ditemukan'
            }
        }

        return(
            <div className='profile'>
                <Helmet {...helmetdata} />
                <div className='col-md-12 no-margin profile__cover'>
                    <div className='row'>
                        <div className='col-md-12 divider'> </div>
                    </div>
                    <div className='row meta-container'>
                        <div className='container'>
                            <div className='col-sm-1 col-sm-push-1 col-xs-3'>
                                <div className='avatar'><img src='/assets/4.2/img/avatar-1.jpg' /></div>
                            </div>
                            <div className='col-sm-9 col-sm-push-1 col-xs-9'>
                                {
                                    profile[username] && profile[username].meta ?
                                        profile[username].meta.code == 200 ?
                                        <h3>{profile[username].data.username}&nbsp;
                                            <small>
                                                terdaftar {epochToRelativeTime(profile[username].data.register_date)}
                                                {/*terakhir login {epochToRelativeTime(profile[username].data.last_active)}*/}
                                            </small>
                                        </h3> :
                                        <h3>{profile[username].meta.message}</h3>
                                    : <h3><i>...</i></h3>                                    
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {
                    profile[username] && profile[username].meta && profile[username].meta.code == 200 ?
                        <UserStats data={profile[username].data.competition_stats} />
                    : null
                }                
            </div>

        )
    }
}

function mapStateToProps(state)
{
    const {User, Kompetisi} = state
    return {
        profile: User.profile,
        kompetisi: Kompetisi.data
    }
}

function mapDispatchToProps(dispatch)
{
    return {
        dispatch
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserProfile)
