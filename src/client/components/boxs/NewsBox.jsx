import React, { Component } from "react"
import Styled from "styled-components"

// components
import GAds from "../cards/GoogleAds"
import Card from "../cards/NewsListCard"
import Loader from "../preloaders/NewsCardLoader"

const NewsBoxStyled = Styled.div`
.news-container__cards {
  margin: 0 -15px;
}
/* responsiveness */

/* small */
@media only screen and (max-width: 543px) {
  /* padding: 0 15px; */
  .news-container__cards {
    margin: 0;
  }
}

/* medium screen */
@media only screen and (min-width: 544px) and (max-width: 767px) {
  /* padding: 0 15px; */
  .news-container__cards {
    margin: 0;
  }
}
`

export default class NewsBox extends Component {
  generateList(n) {
    return n.map((n, key) => {
      if (key % 15 === 0 && key !== 0) {
        return [
          <div
            className="col-md-12 align-center"
            style={{ margin: "0 0 40px", textAlign: "center" }}
            key={`ads_${key}`}
          >
            <GAds
              key={`ads_key`}
              adClient="ca-pub-4468477322781117"
              adSlot={5218613800}
              timeout={1000}
              // adTest={true}
            />
          </div>,
          <Card key={key} n={n} size={this.props.size} />
        ]
      } else {
        return <Card key={key} n={n} size={this.props.size} />
      }
    })
  }

  render() {
    const { status, message, count, data, is_loading, subtitle } = this.props
    return (
      <NewsBoxStyled id="news-container">
        <div className="container">
          <div className="news-container__text no-margin">
            {this.props.subtitle && data ? (
              <div className="col-md-12">
                <br />
                menampilkan&nbsp;
                <strong>
                  {" "}
                  {data.length}
                  &nbsp;
                </strong>
                dari&nbsp;
                <strong>
                  {count}
                  &nbsp;
                </strong>
                kabar
                <br />
              </div>
            ) : null}
          </div>
          {subtitle ? <div className="row m-10" /> : null}
          <div className="row news-container__cards">
            {status ? (
              !data ? (
                <p className="text-muted align-center">{message}</p>
              ) : (
                this.generateList(data)
              )
            ) : null}
          </div>
          {is_loading || !status ? <Loader /> : null}
        </div>
      </NewsBoxStyled>
    )
  }
}

NewsBox.defaultProps = {
  subtitle: true
}
