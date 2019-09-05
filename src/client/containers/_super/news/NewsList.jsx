import React from "react"
import { connect } from "react-redux"
import { fetchBerita, fetchBeritaMore } from "../../news/actions"

// components
import Helmet from "../../../components/Helmet"
import Tab from "../../../components/navigations/Tab"
import HeaderDashboard from "../../../components/cards/HeaderDashboard"
import Loader from "../../../components/preloaders/GlobalLoader"
import NewsCard from "../../../components/boxs/_super/NewsListCard"
import Button from "../../../components/buttons/index"

const Limit = 10

class NewsList extends React.Component {
  componentDidMount = () => {
    this.fetchData()
  }

  componentWillReceiveProps(np) {
    this.fetchData(np)
  }

  fetchData = (props = this.props) => {
    const filter = this.filterGenerator(props)
    const news = this.props.news[filter] || {}

    if (Object.keys(news).length < 1) {
      const params = this.paramsGenerator(props)
      this.props.dispatch(fetchBerita(params, filter))
    }
  }

  fetchMore = () => {
    let Params = this.paramsGenerator()
    const filter = this.filterGenerator()
    const news = this.props.news[filter]

    if (news && news.data) {
      Params.lastid = news.data[news.data.length - 1].id
      if (!news.is_loading && news.status === 200) {
        this.props.dispatch(fetchBeritaMore(Params, filter))
      }
    }
  }

  // generate params
  paramsGenerator(props = this.props) {
    return {
      limit: Limit,
      draft: props.route.tab_active == 2
    }
  }

  // fenerate filter
  filterGenerator(props = this.props) {
    return `super_${props.route.tab_active == 1 ? "posted" : "draft"}`
  }

  render = () => {
    const { stats } = this.props
    const filter = this.filterGenerator()
    const news = this.props.news[filter] || {}
    const { tab_active } = this.props.route

    const tabcontent = [
      {
        text: "posted",
        is_active: tab_active == 1,
        count: stats.status == 200 && stats.news ? stats.news.posted : 0,
        target: "/super/news/posted"
      },
      {
        text: "draft",
        is_active: tab_active == 2,
        count: stats.status == 200 && stats.news ? stats.news.draft : 0,
        target: "/super/news/draft"
      }
    ]

    return (
      <React.Fragment>
        <Helmet title="Kabar Kompetisi Id" />
        <HeaderDashboard
          title="Kabar"
          text="Berikut adalah kabar yang dipost Kompetisi Id."
          noBorder
        />

        {/* tab navigations */}
        <Tab tabs={tabcontent} />
        {/* end of tab navigations */}

        {news && news.is_loading && !news.status ? (
          <div className="row">
            <Loader />
          </div>
        ) : null}

        {/* show news meta */}
        {news.status && news.status == 200 ? (
          <p>
            Menampilkan <strong>{news.data.length}</strong> dari{" "}
            <strong>{news.count}</strong> kabar
          </p>
        ) : null}
        {/* end of show news meta */}

        {/* data literation */}
        {news && news.data
          ? news.data.map((n, key) => <NewsCard key={key} data={n} />)
          : null}
        {/* end of data literation */}

        {/* error message handler */}
        {news.status != 200 ? (
          <p className="text-muted align-center">{news.message}</p>
        ) : null}
        {/* end of error message handler */}

        {/* load more news */}
        {news.status == 200 ? (
          <div className="align-center">
            <Button
              onClick={() => this.fetchMore()}
              size="large"
              color="white"
              loading={news.is_loading}
              text="Kabar Berikutnya"
            />
          </div>
        ) : null}
        {/* end of load more news */}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    news: state.Berita.data,
    stats: state.Others.count_super_sidebar || {}
  }
}

export default connect(mapStateToProps)(NewsList)
