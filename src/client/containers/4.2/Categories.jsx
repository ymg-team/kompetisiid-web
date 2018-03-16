import React, {Component} from 'react'
import Helmet from '../../components/Helmet'
import Subheader from '../../components/4.2/Subheader'
import Loader from '../../components/4.2/loaders/DefaultLoader'
import {setCategories, getCategories} from '../../../store/kompetisi/actions'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import {getStorage, setStorage} from '../../../store/helpers/LocalStorage'

class Categories extends Component 
{
    static fetchData({store})
    {
        return store.dispatch(getCategories())
    }

    componentDidMount()
    {
        const Categories = getStorage('categories')
        if(Categories)
        {
            this.props.dispatch(setCategories(JSON.parse(Categories)))
        }else 
        {
            this.props.dispatch(getCategories())
        }
    }

    generateList()
    {
        if(this.props.categories.meta.code == 200)
        {
            return (
                <div className='col-md-12'>
                    <div className='container'>
                        {this.props.categories.data.map((n, key) => {
                            return (
                                <div key={key} className='categories'>
                                    <h2>{n.main_kat}</h2>
                                    <div className='categories-child'>
                                        {
                                            n.subkat.map((m, key) => (
                                                <Link key={key} to={`/browse/${n.main_kat}/${m.sub_kat}`}>{m.sub_kat}<i className='fa fa-angle-right' /></Link> 
                                            ))
                                        }
                                        <Link to={`/browse/${n.main_kat}`}>Semua {n.main_kat}<i className='fa fa-angle-right' /></Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        }else
        {
            return (
                <div className='align-center text-muted'>
                    <p>{this.props.categories.meta.message}</p>
                </div>
            )
        }
    }

    render()
    {
        return(
            <div>
                <Helmet 
                    title='Kategori Kompetisi'
                    description='Ikuti kompetisi-kompetisi berdasarkan kategori dan minat kamu'
                />
                <Subheader 
                    title='Kategori Kompetisi'
                    desc='Ikuti kompetisi-kompetisi berdasarkan kategori dan minat kamu'
                />
                <div className='col-md-12'><div className='m-30' /></div>
                {this.props.categories.meta ? this.generateList() : <Loader />}
                <div className='col-md-12'><div className='m-30' /></div>
            </div>
        )
    }
}

function mapStateToProps(state)
{
    const {Kompetisi} = state

    return {
        categories: Kompetisi.categories
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
)(Categories)