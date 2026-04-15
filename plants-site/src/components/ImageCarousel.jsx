import { useState } from "react";

function ImageCarousel({ images, alt }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div
      id="carousel-container"
      className="carousel slide"
      data-bs-ride="false"
    >
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item ${index === currentIndex ? "active" : ""}`}
          >
            <img
              src={image}
              className="d-block w-100 carousel-image"
              alt={`${alt} - фото ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        onClick={goToPrevious}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Предыдущее</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        onClick={goToNext}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Следующее</span>
      </button>
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={index === currentIndex ? "active" : ""}
            onClick={() => goToSlide(index)}
            aria-label={`Слайд ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default ImageCarousel;
