import React from 'react'
import Helmet from 'react-helmet'
import {toCamelCase} from 'string-manager'

export default (props) => {
    let {title, description, url, image, type, script, link} = props
    if(!title) title = 'Ada hadiah setiap hari'
    if(!description) description = 'Kompetisi platform untuk warga Indonesia'
    if(!image) image = 'http://kompetisi.id/assets/icons/icon-128x128.png'

    return(
        <Helmet
            title={toCamelCase(title) + ' - Kompetisi Indonesia'}
            meta={[
                {'name': 'description', 'content': description},
                {'property': 'og:type', 'content': type || 'article'},
                {'property': 'og:title', 'content': toCamelCase(title) + ' - Kompetisi Indonesia'},
                {'property': 'og:url', 'content': url},
                {'property': 'og:image', 'content': image},
                {'property': 'og:description', 'content': description},
                {'property': 'twitter:card', 'content': type || 'summarry'},
                {'property': 'twitter:site', 'content': '@kompetisiindo'},
                {'property': 'twitter:title', 'content': title},
                {'property': 'twitter:description', 'content': description},
                {'property': 'twitter:image', 'content': image}
            ]}
            script={script}
            link={link}                
        />
    )
}