import { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite?: boolean;
}

interface CarouselState {
  currentPosition: number;
  currentElement: number;
}

const Carousel = ({
  images,
  step,
  frameSize,
  itemWidth = 130,
  animationDuration,
}: Props) => {
  const [carouselState, setCarouselState] = useState<CarouselState>({
    currentPosition: 0,
    currentElement: 0,
  });

  if (!images || images.length === 0) {
    return <div className="Carousel">No Images to Display</div>;
  }

  if (frameSize <= 0 || step <= 0 || itemWidth <= 0) {
    return <div className="Carousel">Invalid caurosel configuration</div>;
  }

  const canMoveNext = carouselState.currentElement + step < images.length;
  const canMovePrev = carouselState.currentElement - step >= 0;

  const handleNext = () => {
    if (!canMoveNext) {
      return;
    }

    setCarouselState({
      currentElement: carouselState.currentElement + step,
      currentPosition: carouselState.currentPosition - step * itemWidth,
    });
  };

  const handlePrev = () => {
    if (!canMovePrev) {
      return;
    }

    setCarouselState({
      currentElement: carouselState.currentElement - step,
      currentPosition: carouselState.currentPosition + step * itemWidth,
    });
  };

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={{
          width: frameSize * itemWidth,
          transform: `translateX(${carouselState.currentPosition}px)`,
          transition: `all ${animationDuration}ms ease-in`,
        }}
      >
        {images &&
          images.map((item, index) => {
            return (
              <li
                key={item}
                className="Carousel__item"
                style={{ width: itemWidth }}
              >
                <img
                  src={`${item}`}
                  alt={`${index + 1}`}
                  width={`${itemWidth}`}
                />
              </li>
            );
          })}
      </ul>

      <div className="Carousel__btns">
        <button
          disabled={!canMovePrev}
          type="button"
          onClick={() => handlePrev()}
        >
          Prev
        </button>
        <button
          disabled={!canMoveNext}
          type="button"
          onClick={() => handleNext()}
          data-cy="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
