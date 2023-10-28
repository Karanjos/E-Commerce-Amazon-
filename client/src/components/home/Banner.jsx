import "./banner.css";
import Carousel from "react-material-ui-carousel";

const data = [
  "https://rukminim1.flixcart.com/flap/1680/280/image/1defb861e409319b.jpg?q=50",
  " https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50",
  "https://rukminim1.flixcart.com/flap/1680/280/image/8d4150cc4f3f967d.jpg?q=50",
  "https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50",
];

const Banner = () => {
  return (
    <div>
      <Carousel
        className="carasousel"
        autoPlay={true}
        animation="slide"
        indicators={false}
        navButtonsAlwaysVisible={true}
        cycleNavigation={true}
        navButtonsProps={{
          style: {
            background: "#FFFFFF",
            color: "#494949",
            borderRadius: 0,
            margin: 15,
            marginTop: -40,
            height: 104,
          },
        }}
      >
        {data.map((item, i) => {
          return (
            <>
              <img id={i} src={item} alt="banner" className="banner_img" />
            </>
          );
        })}
      </Carousel>
    </div>
  );
};
export default Banner;
