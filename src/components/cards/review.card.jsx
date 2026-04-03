"use client";
import React from 'react';
import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReviewsCard = ({ data = [] }) => {
    const sliderRef = useRef(null);

    const settings = {
        className: "",
        centerMode: true,
        infinite: true,
        centerPadding: "0px",
        slidesToShow: 3,
        speed: 500,
        dots: true,
        responsive: [
            {
                breakpoint: 1424,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                    centerPadding: "0px",
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    centerPadding: "0px",
                },
            },
        ],
    };

    return (
        <div className="h-[100%] sm:h-[50vh] lg:h-[80vh] xl:h-[60vh]  overflow-hidden md:overflow-visible">
            <Slider ref={sliderRef} {...settings}>
                {data?.map((x, i) => (
                    <div key={i}>
                        <div className="">
                            <div className="flex flex-col sm:flex-row gap-4 pb-4">
                                <img
                                    src={x.image}
                                    alt={x.name}
                                    className="h-16 w-16 rounded-full"
                                />
                                <p className="text-xl font-semibold">{x.name}</p>
                            </div>
                            <div className="feedback-conten">
                                <p>{x.content}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default ReviewsCard;