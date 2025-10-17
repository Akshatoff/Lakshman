"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface Category {
  id: string;
  name: string;
  image: string;
  link: string;
}

interface CategoryCarouselProps {
  categories: Category[];
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({ categories }) => {
  return (
    <section className="py-5">
      <div className="row">
        <div className="col-md-12">
          <div className="section-header d-flex justify-content-between mb-5">
            <h3 className="fw-bold font-nunito text-black">
              Shop by Categories
            </h3>
            <div className="swiper-buttons d-flex gap-2">
              <button
                type="button"
                className="swiper-prev category-carousel-prev btn btn-outline-primary"
                aria-label="Previous"
              >
                ❮
              </button>
              <button
                type="button"
                className="swiper-next category-carousel-next btn btn-outline-primary"
                aria-label="Next"
              >
                ❯
              </button>
            </div>
          </div>

          <div className="category-carousel">
            <Swiper
              modules={[Navigation]}
              slidesPerView={4}
              spaceBetween={30}
              speed={500}
              loop={false}
              grabCursor={true}
              watchOverflow={true}
              navigation={{
                nextEl: ".category-carousel-next",
                prevEl: ".category-carousel-prev",
                disabledClass: "swiper-button-disabled",
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 15,
                },
                576: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                991: {
                  slidesPerView: 4,
                  spaceBetween: 25,
                },
                1200: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
            >
              {categories.map((category) => (
                <SwiperSlide key={category.id}>
                  <Link href={category.link} className="category-item">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={80}
                      height={80}
                      className="category-image"
                      unoptimized={category.image.startsWith("http")}
                    />
                    <h3 className="category-title">{category.name}</h3>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Fallback grid for when there are few items */}
          {categories.length <= 3 && (
            <div
              className="category-grid d-none"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "1rem",
              }}
            >
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={category.link}
                  className="category-item"
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={80}
                    height={80}
                    className="category-image"
                    unoptimized={category.image.startsWith("http")}
                  />
                  <h3 className="category-title">{category.name}</h3>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryCarousel;
