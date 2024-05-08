import { MINIOURL } from "@/constant/minio";
import React from "react";
import Slider from "react-slick";

const ImageCarousel = ({
  imageList,
  slug,
}: {
  imageList: string[];
  slug?: string;
}) => {
  const settings = {
    // dots: true,
    fade: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,

    slidesToScroll: 1,
  };

  return (
    <div>
      <Slider {...settings}>
        {imageList.map((item, index) => (
          <div key={index}>
            <img
              className="w-full rounded-lg object-cover h-auto"
              alt={item}
              src={slug ? `${MINIOURL}${item}` : item}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
