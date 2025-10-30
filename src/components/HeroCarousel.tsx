"use client";

import { useState, useEffect, useCallback } from "react";

interface Slide {
  id: number;
  backgroundImage: string;
  discount: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const slides: Slide[] = [
  {
    id: 1,
    backgroundImage: "/images/background-pattern.jpg",
    discount: "40% off",
    title: "Men's Lightweight Fleece Trousers",
    description:"",
    buttonText: "Shop Now",
    buttonLink: "#products",
  },
  {
    id: 2,
    backgroundImage: "/images/banner-2.jpg",
    discount: "20% off",
    title: "Tops and T-shirts Collection",
    description:"",
    buttonText: "Shop Now",
    buttonLink: "#products",
  },
  {
    id: 3,
    backgroundImage: "/images/banner-3.jpg",
    discount: "",
    title: "",
    description: "",
    buttonText: "",
    buttonLink: "#products",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [isTransitioning]);

  const goToSlide = (index: number) => {
    if (!isTransitioning && index !== currentSlide) {
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section
      className="hero-carousel-section position-relative"
      style={{ minHeight: "100vh" }}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`carousel-slide position-absolute top-0 start-0 w-100 h-100 ${
            index === currentSlide ? "active" : ""
          }`}
          style={{
            backgroundImage: `url('${slide.backgroundImage}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: index === currentSlide ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
            zIndex: index === currentSlide ? 1 : 0,
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="container">
            <div
              className="row align-items-center"
              style={{ minHeight: "100vh" }}
            >
              <div className="col-lg-8 col-md-10 mx-auto text-center">
                <div
                  className="carousel-content"
                  style={{
                    animation:
                      index === currentSlide
                        ? "fadeInUp 0.8s ease-out"
                        : "none",
                  }}
                >
                  <div
                    className="categories mb-4 d-inline-block px-4 py-2 rounded-pill"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      fontSize: "1.2rem",
                      fontWeight: "600",
                      color: "#000",
                    }}
                  >
                    {slide.discount}
                  </div>
                  <h1
                    className="display-2 fw-bold font-nunito mb-4"
                    style={{
                      color: "#000",
                      fontSize: "2rem",
                      textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
                    }}
                  >
                    {slide.title}
                  </h1>
                  <p
                    className="lead mb-5 mx-auto"
                    style={{
                      maxWidth: "700px",
                      fontSize: "1rem",
                      color: "#000",
                      textShadow: "1px 1px 4px rgba(0,0,0,0.5)",
                    }}
                  >
                    {slide.description}
                  </p>
                  <a
                    href={slide.buttonLink}
                    className="btn btn-light btn-lg text-uppercase fs-10 rounded-1 px-5 py-3 fw-bold"
                    style={{
                      boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow =
                        "0 6px 20px rgba(0,0,0,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 15px rgba(0,0,0,0.2)";
                    }}
                  >
                    {slide.buttonText}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="carousel-control carousel-control-prev position-absolute top-50 start-0 translate-middle-y border-0 bg-black bg-opacity-75 d-flex align-items-center justify-content-center"
        style={{
          width: "60px",
          height: "60px",
          marginLeft: "20px",
          borderRadius: "50%",
          zIndex: 10,
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 1)";
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.75)";
          e.currentTarget.style.transform = "scale(1)";
        }}
        aria-label="Previous slide"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="carousel-control carousel-control-next position-absolute top-50 end-0 translate-middle-y border-0 bg-black bg-opacity-75 d-flex align-items-center justify-content-center"
        style={{
          width: "60px",
          height: "60px",
          marginRight: "20px",
          borderRadius: "50%",
          zIndex: 10,
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 1)";
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.75)";
          e.currentTarget.style.transform = "scale(1)";
        }}
        aria-label="Next slide"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Indicators */}
      <div
        className="carousel-indicators position-absolute bottom-0 start-50 translate-middle-x d-flex gap-3 mb-4"
        style={{ zIndex: 10 }}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`indicator border-0 ${index === currentSlide ? "active" : ""}`}
            style={{
              width: index === currentSlide ? "40px" : "12px",
              height: "12px",
              borderRadius: "6px",
              backgroundColor:
                index === currentSlide ? "#fff" : "rgba(255, 255, 255, 0.5)",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .carousel-control:hover {
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .indicator:hover {
          background-color: rgba(255, 255, 255, 0.8) !important;
        }
      `}</style>
    </section>
  );
}
