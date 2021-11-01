import React from 'react'
import { Link } from 'react-router-dom'
// import Slider from 'react-slick'

export default function Home() {
  // var settings = {
  //   infinite: true,
  //   speed: 1500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: true
  // }

  return <section className="heropage">
    <section className="hero is-fullheight-with-navbar" id="hero-image">
      <div className="hero-body" id="hero-image">
        <div className="">
          <p className="title" id="home-title">
            UReaLm
          </p>
          <p className="subtitle" id="home-subtitle">
            Keep your links organized. For real.
          </p>
        </div>
      </div>
    </section>
  </section>

}
