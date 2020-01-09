import React, { Component } from 'react'
import Loadable from 'react-loadable'

// components
import Helmet from '../../components/Helmet'
import Subheader from '../../components/Subheader'
import Loading from '../../components/preloaders/GlobalLoader'

const CareerBox = Loadable({
  loader: () => import('../../components/boxs/CareerBox'),
  loading: Loading
})

class CareersContainer extends Component {

  componentDidMount(){
    window.scrollTo(0,0)
  }

  render() {
    return (
      <div>
        <Helmet
          title="Karir - Kompetisi ID"
          description="Mari bergabung bersama kami untuk terus meramaikan semangat kompetisi di Indonesia"
        />
        <CareerBox />
      </div>
    )
  }
}

export default CareersContainer
