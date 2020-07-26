import React from "react"
import ReactHelmet from "react-helmet"
import { toCamelCase } from "string-manager"

const Helmet = props => {
  let { title, description, url, image, type, script, link, keywords } = props

  // ref: http://prcoldfusion.blogspot.com/2012/03/replace-all-double-quotes-in-string.html#:~:text=replace(%2F%5C%22%2Fg%2C%20%22,double%20quotes%20in%20a%20string.
  description = description.replace(/\"/g, "")
  title = title.replace(/\"/g, "")

  return (
    <ReactHelmet
      title={toCamelCase(title) + " - Kompetisi Id"}
      meta={[
        { name: "description", content: description },
        { name: "keywords", content: keywords },
        { property: "og:type", content: type || "article" },
        {
          property: "og:title",
          content: toCamelCase(title) + " - Kompetisi Id"
        },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { property: "og:description", content: description },
        { property: "twitter:card", content: type || "summarry" },
        { property: "twitter:site", content: "@kompetisid" },
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
  description:
    "Platform Kompetisi online untuk warga Indonesia, seperti kompetisi blog, kompetisi desain, kompetisi menulis, kompetisi fotografi",
  image: "http://kompetisi.id/assets/icons/icon-128x128.png",
  keywords:
    "Info kompetisi,kompetisi id,kumpulan lomba,info lomba,kumpulan kompetisi, kompetisi desain, kompetisi menulis, kompetisi fotografi"
}

export default Helmet
