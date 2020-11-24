import React from "react"

export default props => {
  return (
    <div className="col-md-12">
      <div className="container">
        <div className="col-md-10 col-md-push-1">
          <div className="row">
            <nav className="profile-nav">
              <ul>
                <li>
                  <a href="#">
                    <h3>{props.data.dipasang}</h3>kompetisi dipasang
                  </a>
                </li>
                <li>
                  <a href="#">
                    <h3>{props.data.diikuti}</h3>kompetisi diikuti
                  </a>
                </li>
                <li>
                  <a href="#">
                    <h3>{props.data.menang}</h3>kompetisi dimenangkan
                  </a>
                </li>
                <li>
                  <a href="#">
                    <h3>{props.data.dikunjungi}</h3>kompetisi dikunjungi
                  </a>
                </li>
                <li>
                  <a href="#">
                    <h3>{props.data.langganan}</h3>kompetisi langganan
                  </a>
                </li>
                <li>
                  <a href="#">
                    <h3>{props.data.favorit}</h3>kompetisi favorit
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}
