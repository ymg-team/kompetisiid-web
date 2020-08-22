import React from "react"
import { generateLink } from "../../helpers/linkGenerator"

const Type = [
  { icon: "" },
  { icon: "fas fa-globe-asia" },
  { icon: "fab fa-facebook" },
  { icon: "fab fa-twitter-square" },
  { icon: "fab fa-instagram" },
  { icon: "fab fa-google-plus" },
  { icon: "fas fa-envelope-square" },
  { icon: "fas fa-map" },
  { icon: "fab fa-youtube-square" },
  { icon: "fas fa-phone-square" }
]

export default props => (
  <React.Fragment>
    <h2>Kontak kompetisi</h2>
    <p className="text-muted">
      Ada pertanyaan atau ingin info lebih lanjut langsung dari penyelenggara,
      silahkan sampaikan melalui kontak dibawah ini.
    </p>
    <hr />
    {props.data && props.data.length > 0 ? (
      props.data.map((n, key) => {
        return (
          <p key={key}>
            <i className={Type[n.type].icon} />{" "}
            {[1, 2, 3, 4, 8].includes(parseInt(n.type))
              ? generateLink(n.value, "_blank")
              : n.value}
          </p>
        )
      })
    ) : (
      <p>kontak tidak tersedia</p>
    )}
  </React.Fragment>
)
