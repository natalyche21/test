import { useState } from "react";
import "./ImageCarousel.css";

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

  if (!images || images.length === 0) return null;

  return (
    <div className="image-carousel">
      <div className="carousel-viewport">
        <div 
          className="carousel-track" 
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="carousel-slide">
              <img
                src={image}
                alt={`${alt} - фото ${index + 1}`}
                className="carousel-image"
                onError={(e) => {
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23f0f4f0' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='18' fill='%23999'%3EИзображение недоступно%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
          ))}
        </div>
      </div>
      
      {images.length > 1 && (
        <>
          <button
            className="carousel-btn carousel-btn-prev"
            onClick={goToPrevious}
            aria-label="Предыдущее фото"
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            className="carousel-btn carousel-btn-next"
            onClick={goToNext}
            aria-label="Следующее фото"
          >
            <span aria-hidden="true">›</span>
          </button>
          
          <div className="carousel-indicators">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`indicator ${index === currentIndex ? "active" : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Слайд ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ImageCarousel;
