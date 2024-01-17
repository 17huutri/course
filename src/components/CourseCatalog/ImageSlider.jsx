import React, { useState, useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import { useTypewriter } from "react-simple-typewriter";

function ImageSlider() {
    const slides = [
        {
            url: 'https://th.bing.com/th/id/R.076ec40913f18d3fe9456a2c2e7cd88d?rik=0JvmnKMmEFqYpA&riu=http%3a%2f%2f3.bp.blogspot.com%2f-EfBiiIlbybI%2fUyW-AuFMqSI%2fAAAAAAAAQ2U%2f-9q1vpJXvi8%2fs1600%2fWinter-Solstice-HD-Wallpaper.jpg&ehk=%2b6UJGuYGDbU6bSl0%2fRoZ1nkpI2P029CeH%2b6IItbnpeM%3d&risl=&pid=ImgRaw&r=0',
        },
        {
            url: 'https://cdn.hubs.vn/pv-blog/https://cdn.hubs.vn/pv-blog/2018/07/tong-hop-anh-nen-laptop-toi-uu-cho-cong-viec-va-bao-ve-mat-3.jpg',
        }, {
            url: 'https://th.bing.com/th/id/R.076ec40913f18d3fe9456a2c2e7cd88d?rik=0JvmnKMmEFqYpA&riu=http%3a%2f%2f3.bp.blogspot.com%2f-EfBiiIlbybI%2fUyW-AuFMqSI%2fAAAAAAAAQ2U%2f-9q1vpJXvi8%2fs1600%2fWinter-Solstice-HD-Wallpaper.jpg&ehk=%2b6UJGuYGDbU6bSl0%2fRoZ1nkpI2P029CeH%2b6IItbnpeM%3d&risl=&pid=ImgRaw&r=0',
        }, {
            url: 'https://cdn.hubs.vn/pv-blog/https-cdn-hubs-vn-pv-blog-2018-07-tong-hop-anh-nen-laptop-toi-uu-cho-cong-viec-va-bao-ve-mat-3.jpg',
        },
        {
            url: 'https://th.bing.com/th/id/R.076ec40913f18d3fe9456a2c2e7cd88d?rik=0JvmnKMmEFqYpA&riu=http%3a%2f%2f3.bp.blogspot.com%2f-EfBiiIlbybI%2fUyW-AuFMqSI%2fAAAAAAAAQ2U%2f-9q1vpJXvi8%2fs1600%2fWinter-Solstice-HD-Wallpaper.jpg&ehk=%2b6UJGuYGDbU6bSl0%2fRoZ1nkpI2P029CeH%2b6IItbnpeM%3d&risl=&pid=ImgRaw&r=0',
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    const [text] = useTypewriter({
        words: [
            "Explore new knowledge with our online courses.",
            "Enhance your skills with high-quality online courses.",
            "Discover new opportunities with our online courses.",
            "Self-study and grow with reputable online courses.",
            "Equip yourself for a brighter future with online learning."
        ],
        loop: true,
        typeSpeed: 30,
        deleteSpeed: 10,
        delaySpeed: 2000,
    });

    const [autoplayInterval, setAutoplayInterval] = useState(null);

    useEffect(() => {
        startAutoplay();
        return () => {
            stopAutoplay();
        };
    }, [currentIndex]);

    const startAutoplay = () => {
        const intervalId = setInterval(() => {
            nextSlide();
        }, 4000);
        setAutoplayInterval(intervalId);
    };

    const stopAutoplay = () => {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            setAutoplayInterval(null);
        }
    };

    return (
        <div className='max-w-[1400px] h-[580px] w-full m-auto py-16 px-4 relative group'>
            <div
                style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
                className='w-full h-full rounded-2xl bg-center bg-cover duration-500 relative'
            >
                <div className="absolute top-1/4 left-0 right-0 text-center">
                    <h1 className="text-white text-2xl md:text-4xl uppercase font-bold">
                        " YOUR DREAM, YOUR COURSE, YOUR FUTURE."
                    </h1>
                    <p className=" text-white md:text-lg font-semibold mt-2">
                        {text} <span className="animate-blink">|</span>
                    </p>
                </div>
            </div>
            <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] 
            left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>
            <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%]
             right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactRight onClick={nextSlide} size={30} />
            </div>
            <div className='flex top-4 justify-center py-2'>
                {slides.map((slide, slideIndex) => (
                    <div
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className={`text-2xl cursor-pointer ${slideIndex === currentIndex ? 'text-white' : 'text-gray-400'}`}
                    >
                        <RxDotFilled />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ImageSlider;
