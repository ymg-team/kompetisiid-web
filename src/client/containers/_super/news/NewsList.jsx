import React from "react"
import { connect } from "react-redux"
import { fetchBerita, fetchBeritaMore } from "../../news/actions"

// components
import Helmet from "../../../components/Helmet"
import HeaderDashboard from "../../../components/cards/HeaderDashboard"
import Loader from "../../../components/preloaders/GlobalLoader"
import NewsCard from "../../../components/boxs/_super/NewsListCard"
import Button from "../../../components/buttons/index"

const Filter = "super"
const Limit = 10

class NewsList extends React.Component {
  componentDidMount = () => {
    this.props.dispatch(
      fetchBerita(
        {
          limit: Limit
        },
        Filter
      )
    )
  }

  fetchMore = () => {
    let Params = { limit: Limit }
    const news = this.props.news[Filter]

    if (news && news.data) {
      Params.lastid = news.data[news.data.length - 1].id
      if (!news.is_loading && news.status === 200) {
        this.props.dispatch(fetchBeritaMore(Params, Filter))
      }
    }
  }

  render = () => {
    const news = this.props.news[Filter] || {}

    return (
      <React.Fragment>
        <Helmet title="Kabar Kompetisi Id" />
        <HeaderDashboard
          title="Kabar"
          text="Berikut adalah kabar yang dipost Kompetisi ID."
        />

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
    news: state.Berita.data
  }
}

export default connect(mapStateToProps)(NewsList)
