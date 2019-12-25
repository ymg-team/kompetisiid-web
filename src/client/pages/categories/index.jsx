import React, { Component } from 'react'
import { setCategories, getCategories } from '../competition/actions'
import { connect } from 'react-redux'
import { getStorage } from '../../../store/helpers/LocalStorage'
import { LOCAL_STORAGE_CATEGORIES } from "../../../config/version"

// components
import Helmet from '../../components/Helmet'
import Subheader from '../../components/Subheader'
import { Link } from 'react-router-dom'
import Loader from '../../components/preloaders/GlobalLoader'

class Index extends Component {
  static fetchData({ store }) {
    return store.dispatch(getCategories())
  }

  componentDidMount() {
    window.scrollTo(0, 0)

    const Categories = getStorage(LOCAL_STORAGE_CATEGORIES)
    if (Categories) {
      this.props.dispatch(setCategories(JSON.parse(Categories)))
    } else {
      this.props.dispatch(getCategories())
    }
  }

  generateList() {
    if (this.props.categories.status === 200) {
      return (
        <div className="col-md-12">
          <div className="container">
            {this.props.categories.data.map((n, key) => {
              return (
                <div key={key} className="categories">
                  <h2>{n.name}</h2>
                  <div className="categories-child">
                    {n.subcategories.map((m, key) => (
                      <Link key={key} to={`/browse/${n.name}/${m.name}`}>
                        {m.name}
                        <i className="fa fa-angle-right" />
                      </Link>
                    ))}
                    <Link to={`/browse/${n.name}`}>
                      Semua {n.name}
                      <i className="fa fa-angle-right" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    } else {
      return (
        <div className="align-center text-muted">
          <p>{this.props.categories.message}</p>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <Helmet
          title="Kategori Kompetisi"
          description="Ikuti kompetisi-kompetisi berdasarkan kategori dan minat kamu"
        />
        <Subheader
          title="Kategori Kompetisi"
          desc="Ikuti kompetisi-kompetisi berdasarkan kategori dan minat kamu"
        />
        <div className="col-md-12">
          <div className="m-30" />
        </div>
        {this.props.categories.status ? this.generateList() : <Loader />}
        <div className="col-md-12">
          <div className="m-30" />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { Kompetisi } = state

  return {
    categories: Kompetisi.categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
