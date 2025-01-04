import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import { AxiosRequest } from '../../AxiosRequest/AxiosRequest';

const SupplierSlider = () => {
    const [slides, setSlides] = useState([]);

    // Fetch suppliers from the API
    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await AxiosRequest.get('/api/supplier/all-suppliers');
                setSlides(response.data);
            } catch (error) {
                console.error('Error fetching suppliers:', error);
            }
        };

        fetchSuppliers();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1280, // Adjusted for larger screens
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 640, // Adjusted for smaller screens
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="w-full mx-auto">
            <Slider {...settings}>
                {slides.map((slide) => (
                    <div key={slide._id} className="p-4">
                <div className="rounded-lg bg-white overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                  <img 
                    src={slide.image} 
                    alt={slide.name} 
                    className="w-full h-24 object-contain p-4"
                    loading='lazy'
                  />
                </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default SupplierSlider;
