import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { client } from "../lib/client";
import { useRouter } from "next/router";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    console.log(currentIndex);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((index) =>
      index === images.length - 1 ? index : index + 1
    );
  };

  const handleBack = () => {
    setCurrentIndex((index) => (index === 0 ? index : index - 1));
  };

  return (
    <div className="relative w-full h-full">
      <div className="flex justify-between absolute top left w-full h-full">
        <div
          className="fixed top-2 left-2 bg-black/50 text-white hover:cursor-pointer hover:bg-black z-50 p-2 rounded"
          onClick={(_) => router.push("/")}
        >
          <p className="text-xl">{"< Back"}</p>
        </div>
        <button
          onClick={handleBack}
          className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
          // disabled={isDisabled("prev")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-20 -ml-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="sr-only">Prev</span>
        </button>
        <button
          onClick={handleNext}
          className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
          // disabled={isDisabled("next")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-20 -ml-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="sr-only">Next</span>
        </button>
      </div>
      <div className="carousel-container flex w-full h-full overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0">
        {images.map((image, index) => (
          <div
            className={`carousel-item relative w-full h-full snap-start ${
              index != currentIndex && "hidden"
            }`}
            // style={{ width: "1232px" }}
          >
            <Image
              key={index}
              {...useNextSanityImage(client, image)}
              alt="tulum"
              className="z-0"
              layout="fill"
              objectFit="cover"
              priority={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
