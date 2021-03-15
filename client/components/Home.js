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
    <div className="homepage-text">
      <h1 className="homepage-title">URealM</h1>
      <h3 className="homepage-subtitle">Get all of your links together</h3>
    </div>
    {/* <Slider {...settings}>
      <div>
        <img src="https://res.cloudinary.com/dznpk39i0/image/upload/v1614164524/ycbvvupx1wywxptztwot.jpg" />
      </div>
      <div>
        <img src="https://res.cloudinary.com/dznpk39i0/image/upload/v1614164540/k3bytggi8u4yelvppsml.jpg" />
      </div>
      <div>
        <img src="https://res.cloudinary.com/dznpk39i0/image/upload/v1614164540/k3bytggi8u4yelvppsml.jpg" />
      </div>
      <div>
        <img src="https://res.cloudinary.com/dznpk39i0/image/upload/v1614164540/k3bytggi8u4yelvppsml.jpg" />
      </div>
    </Slider> */}
  </section>

}
