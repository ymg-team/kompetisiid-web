import React, {Component} from 'react'

const data = [
    {
        image: '/assets/4.2/img/slider/slider-1.png',
        title: 'Ikuti Kompetisinya dan Menangkan Hadiahnya',
        text: 'Temukan dan ikuti beragam kompetisi sesuai dengan minat kamu, dan berjuanglah untuk menjadi pemenang dan dapatkan hadiahnya.'
    },
    {
        image: '/assets/4.2/img/slider/slider-2.png',
        title: 'Kamu Seorang Penyelenggara Kompetisi',
        text: 'Pasang kompetisi disini untuk meramaikan kompetisi yang kamu adakan dan mempermudah peserta mengikuti kompetisi tersebut.'
    }
]

export default class HomeSlider extends Component
{
    constructor()
    {
        super()
        this.state = {
            marginTopSlider: '-500'
        }
    }

    handleResizeSlider()
    {
        this.setState({
            marginTopSlider: -1 * document.querySelector('.slider-container').offsetHeight
        })
    }

    componentWillUnmount()
    {
        window.removeEventListener('resize', (e) => this.handleResizeSlider)
    }

    componentDidMount()
    {
        window.addEventListener('resize', (e) => this.handleResizeSlider)
        this.setState({
            marginTopSlider: -1 * document.querySelector('.slider-container').offsetHeight
        })

        // init slidder
        let currentIndex = 0
        const SliderItemEl = document.getElementsByClassName('slider--item')
        const BtnPrevEl = document.getElementById('btn-slider--prev')
        const BtnNextEl = document.getElementById('btn-slider--next')
        const totalIndex = SliderItemEl.length

        // event listener
        BtnPrevEl.addEventListener('click', prev)
        BtnNextEl.addEventListener('click', cycle)

        //interval 
        let autoSlide = setInterval(cycle, 10000)

        function cycle() {
            clearInterval(autoSlide)
            autoSlide = setInterval(cycle, 10000)
            if (currentIndex == 0) {
                currentIndex++
            } else if (currentIndex == totalIndex - 1) {
                currentIndex = 0
            } else {
                currentIndex++ 
            }

            return toggle()
        }

        function prev() {
            clearInterval(autoSlide)
            autoSlide = setInterval(cycle, 10000)
            if (currentIndex == 0) {
                currentIndex = totalIndex - 1
            } else if (currentIndex == totalIndex - 1) {
                currentIndex = totalIndex - 2
            } else {
                currentIndex--
            }

            return toggle()
        }

        function toggle() {
            Object.keys(SliderItemEl).map((n, key) => {
                let visibility = 'hidden'
                let opacity = 0
                if (key == currentIndex) visibility = 'visible'
                if (key == currentIndex) opacity = 1
                SliderItemEl[key].style.visibility = visibility
                SliderItemEl[key].style.opacity = opacity
            })
        }
    }

    render()
    {
        return(
            <div className='col-md-12 slider'>
                <div className='slider-buttons'>
                    <a className='btn-nav btn-nav--left' id='btn-slider--prev' href='javascript:;'><i className='fa fa-angle-left' /></a>
                    <a className='btn-nav btn-nav--right' id='btn-slider--next' href='javascript:;'><i className='fa fa-angle-right' /></a>
                </div>
                <div className='slider-container'>
                    {
                        data.map((n, key) => {
                            const style = {
                                backgroundImage:`url(${n.image})`,
                                visibility: key == 0 ? 'visible' : 'hidden', 
                                opacity: key == 0 ? 1 : 0,
                                marginTop: key == 0 ? '0' : this.state.marginTopSlider+'px'
                                }
                            return <div key={key} className='slider--item' style={style}>
                                <div className='slider--item--text'>
                                    <h2>{n.title}</h2>
                                    <p>{n.text}</p>
                                </div>
                            </div>
                        })
                    }                   
                </div>
            </div>
        )
    }
}