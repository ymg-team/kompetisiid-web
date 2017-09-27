import React, {Component} from 'react'

export default class HomeSlider extends Component
{
    componentDidMount()
    {
        // init slidder
        (function() {
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
        })()
    }

    render()
    {
        return(
            <div className='col-md-12 slider'>
                <div className='slider-buttons'>
                    <a className='btn-nav btn-nav--left' id='btn-slider--prev' href='javascript:;'><i className='fa fa-angle-left' /></a><a className='btn-nav btn-nav--right' id='btn-slider--next' href='javascript:;'><i className='fa fa-angle-right' /></a>
                </div>
                <div className='slider-container'>
                    <div className='slider--item' style={{backgroundImage: 'url("/assets/4.2/img/slider/slider-1.png")', visibility: 'visible', opacity: 1}}>
                        <div className='slider--item--text'>
                            <h2>Ikuti Kompetisinya dan Menangkan Hadiahnya</h2>
                            <p>Temukan dan ikuti beragam kompetisi sesuai dengan minat kamu, dan berjuanglah untuk menjadi pemenang dan dapatkan hadiahnya.</p>
                        </div>
                    </div>
                    <div className='slider--item' style={{backgroundImage: 'url("/assets/4.2/img/slider/slider-1.png")', marginTop: '-700px'}}>
                        <div className='slider--item--text'>
                            <h2>Kamu Seorang Penyelenggara Kompetisi</h2>
                            <p>Pasang kompetisi disini untuk meramaikan kompetisi yang kamu adakan dan mempermudah peserta mengikuti kompetisi tersebut.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}