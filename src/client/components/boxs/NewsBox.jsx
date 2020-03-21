import React, { Component } from "react"
import { duration, style } from "../Transtition"
import Transition from "react-transition-group/Transition"

// components
import GAds from "../cards/GoogleAds"
import Card from "../cards/NewsListCard"
import Loader from "../preloaders/NewsCardLoader"
// import { Link } from "react-router-dom"

export default class NewsBox extends Component {
  generateList(n) {
    return n.map((n, key) => {
      if (key % 15 === 0 && key !== 0) {
        return [
          <div
            className="col-md-12 align-center"
            style={{ margin: "0 0 40px" }}
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
    const { status, message, count, data, is_loading } = this.props
    return (
      <div id="news-container">
        <div className="container">
          <div className="row no-margin">
            {this.props.subtitle && data ? (
              <span style={{ display: "table" }}>
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
              </span>
            ) : null}
          </div>
          <div className="row m-10" />
          <div className="row" style={{ margin: "60px 0 0" }}>
            <Transition in={data && data.length > 0} timeout={duration}>
              {state => (
                <div
                  style={Object.assign(
                    {},
                    style.fade.default,
                    style.fade[state]
                  )}
                >
                  {status ? (
                    !data ? (
                      <p className="text-muted">{message}</p>
                    ) : (
                      this.generateList(data)
                    )
                  ) : null}
                </div>
              )}
            </Transition>
          </div>
          {is_loading || !status ? <Loader /> : null}
        </div>
      </div>
    )
  }
}

NewsBox.defaultProps = {
  subtitle: true
}
