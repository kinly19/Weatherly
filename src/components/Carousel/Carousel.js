import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Carousel.scss';

const Carousel = (props) => {

  const [slideIndex, setSlideIndex] = useState(0);
  const [length, setLength] = useState(props.children.length);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  // Carousel slides to show per view
  let slidesToShow = 4;
  if (viewportWidth <= 1650) {
    slidesToShow = 3;
  }

  if (viewportWidth <= 1300) {
    slidesToShow = 2;
  }

  if (viewportWidth <= 800) {
    slidesToShow = 1;
  }

  const nextSliderHandler = () => {
    if (slideIndex < length - slidesToShow)
    setSlideIndex(prevState => prevState + 1);
  }

  const prevSliderHandler = () => {
    if (slideIndex > 0)
    setSlideIndex(prevState => prevState - 1);
  }

  // Update viewport width on page resize
  useEffect(() => {
    const viewportWidthHandler = () => {
      setViewportWidth(window.innerWidth);
      // Reset carousel slide position
      setSlideIndex(0);
    };
    
    // Limit re-renders
    const debounceHandler = (func, delay) => {
      let timer;
      return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func();
        }, delay);
      };
    };

    window.addEventListener("resize", debounceHandler(viewportWidthHandler, 250));
    setLength(props.children.length);
    // Clean up
    return () => window.removeEventListener("resize", debounceHandler);
  },[viewportWidth, props.children]);

  return (
    <section className={props.className ? `carousel ${props.className}` : "carousel"}>
      <div className="carousel__wrapper">
        <ul
          className={`carousel__content show-${slidesToShow}`}
          style={{
            transform: `translateX(-${slideIndex * (100 / slidesToShow)}%)`,
          }}
        >
          {props.children}
        </ul>
      </div>
      <button className="carousel__btn-left" onClick={prevSliderHandler}>
        <FiChevronLeft />
      </button>
      <button className="carousel__btn-right" onClick={nextSliderHandler}>
        <FiChevronRight />
      </button>
    </section>
  );
};

export default Carousel; 