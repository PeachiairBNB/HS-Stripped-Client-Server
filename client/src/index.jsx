import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import Carousel from "./components/Carousel.jsx";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCoffee,
  faAngleLeft,
  faAngleRight
} from "@fortawesome/free-solid-svg-icons";
import CarouselImages from './components/RevisedCarousel.jsx';

library.add(fab, faCoffee, faAngleLeft, faAngleRight);
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      clicked: false,
      clickedImage: "",
      listingID: undefined
    };
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getPictures = this.getPictures.bind(this);
  }

  componentDidMount() {
    console.log(
      "This is the current URL >>>>>>>>>>",
      window.location.pathname.substr(1).split("/")[0]
    );
  
    let url_listing = window.location.pathname.substr(1).split("/")[0];

    console.log('this is the url listing', url_listing)
    console.log('this is the type of the url listing: ', url_listing.constructor);

    this.getPictures(url_listing); 
  }

  getPictures(listingID) {
    console.log('YOU MADE IT THIS FAR! LISTINGID AND TYPE ARE: ', listingID);
    // console.log('filler')
    axios.get(`/api/pictures/${listingID}`).then(({ data }) => {
      console.log('DID I RUN????????', data);
      this.setState({pictures: data.images});
      console.log(this.state.pictures);
    })
    .catch((err) => {
      console.log('THERE WAS AN ERROR AT THE REACT GET: ', err);
    })
  }

  handleClick(e) {
    let image = e.target.id;
    this.setState({
      clicked: true,
      clickedImage: image
    });
  }

  onMouseEnter(hoveredImage) {
    // console.log("onHover has run on >>>>>>>", clickedImage);

    if (hoveredImage === "a") {
      $(`.${hoveredImage}`).hover(
        () => {
          // on over
          $(`.b, .c, .d, .e`).animate({
            // opacity: 0.25,
            transition: 0.3
          });
        },
        () => {
          // on out
          $(`.b, .c, .d, .e`).animate({
            opacity: 1,
            transition: 0.3
          });
        }
      );
    }

    if (hoveredImage === "b") {
      $(`.${hoveredImage}`).hover(
        () => {
          // on over
          $(`.a, .c, .d, .e`).animate({
            opatcity: 0.25,
            transition: 0.3
          });
        },
        () => {
          // on out
          $(`.a, .c, .d, .e`).animate({
            opacity: 1
          });
        }
      );
    }

    if (hoveredImage === "c") {
      $(`.${hoveredImage}`).hover(
        () => {
          // on over
          $(`.a, .b, .d, .e`).animate({
            opacity: 0.25,
            transition: 0.3
          });
        },
        () => {
          // on out
          $(`.a, .b, .d, .e`).animate({
            opacity: 1
          });
        }
      );
    }

    if (hoveredImage === "d") {
      $(`.${hoveredImage}`).hover(
        () => {
          // on over
          $(`.a, .b, .c, .e`).animate({
            opacity: 0.25,
            transition: 0.3
          });
        },
        () => {
          // on out
          $(`.a, .b, .c, .e`).animate({
            opacity: 1
          });
        }
      );
    }

    if (hoveredImage === "e") {
      $(`.${hoveredImage}`).hover(
        () => {
          // on over
          $(`.a, .b, .c, .d`).animate({
            opacity: 0.25
          });
        },
        () => {
          // on out
          $(`.a, .b, .c, .d`).animate({
            opacity: 1
          });
        }
      );
    }
  }

  render() {
    if (this.state.clicked === false) {
      return (
        <main>
          <div className="wrapper">
            <CarouselImages images={this.state.pictures} handleClick={this.handleClick}/>
          </div>
        </main>
      );
    }

    if (this.state.clicked === true) {
      return (
        <Carousel
          clickedImage={this.state.clickedImage}
          pictures={this.state.pictures}
        />
      );
    }
  }
}

// ReactDOM.render(<App />, document.getElementById("image-carousel"));
window.ImageCarousel = App;
