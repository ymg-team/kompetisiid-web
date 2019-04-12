import React from "react"
import ReactHelmet from "react-helmet"
import { toCamelCase } from "string-manager"

const Helmet = props => {
  let { title, description, url, image, type, script, link } = props

  return (
    <ReactHelmet
      title={toCamelCase(title) + " - Kompetisi Id"}
      meta={[
        { name: "description", content: description },
        { property: "og:type", content: type || "article" },
        {
          property: "og:title",
          content: toCamelCase(title) + " - Kompetisi Id"
        },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { property: "og:description", content: description },
        { property: "twitter:card", content: type || "summarry" },
        { property: "twitter:site", content: "@kompetisiindo" },
        { property: "twitter:title", content: title },
        { property: "twitter:description", content: description },
        { property: "twitter:image", content: image }
      ]}
      script={script}
      link={link}
    />
  )
}

Helmet.defaultProps = {
  title: "Ada hadiah setiap hari",
  description: "Platform Kompetisi online untuk warga Indonesia",
  image: "http://kompetisi.id/assets/icons/icon-128x128.png"
}

export default Helmet
