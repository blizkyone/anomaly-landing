import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { client } from "../lib/client";
import { useRouter } from "next/router";
import autoAnimate from "@formkit/auto-animate";
import SanityImage from "./SanityImage";

const Carousel = ({ images }) => {
  const [loading, setLoading] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sanityImages, setSanityImages] = useState([]);

  const router = useRouter();
  const main = useRef();
  const car = useRef();

  useEffect(() => {
    console.log(car.current.scrollWidth / images.length);
    main.current && autoAnimate(main.current);
    router.events.on("routeChangeStart", (_) => setLoading(true));
    router.events.on("routeChangeComplete", (_) => setLoading(false));
    return () => {
      router.events.off("routeChangeStart", (_) => setLoading(true));
      router.events.off("routeChangeComplete", (_) => setLoading(false));
    };
  }, [router.events]);

  const handleNext = () => {
    setCurrentIndex((index) =>
      index === images.length - 1 ? index : index + 1
    );
    // car.current.scrollLeft += car.current.scrollWidth / images.length;
  };

  const handleBack = () => {
    setCurrentIndex((index) => (index === 0 ? index : index - 1));
    // car.current.scrollLeft -= car.current.scrollWidth / images.length;
  };

  return (
    <div className="relative w-full h-full" ref={main}>
      {loading && (
        <div className="fixed top left w-screen h-screen bg-black/50 flex justify-center items-center text-center z-50"></div>
      )}
      <div className="flex justify-between absolute top left w-full h-full">
        <div
          className="fixed top-2 left-2 bg-black/50 text-white hover:cursor-pointer hover:bg-black z-50 p-2 rounded"
          onClick={(_) => router.push("/")}
        >
          <p className="text-xl">{"< Back"}</p>
        </div>
        <button
          onClick={handleBack}
          className="hover:bg-gray-900/75 text-white w-24 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
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
          className="hover:bg-gray-900/75 text-white w-24 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
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
      <div
        ref={car}
        className="relative carousel-container flex w-full h-full overflow-x-auto scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
      >
        {images.map((image, index) => {
          return (
            <li
              key={index}
              className={`carousel-item absolute top-0 left-0 w-full h-full snap-start flex-shrink-0 transition-opacity duration-700 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
              // ${index === currentIndex && "hidden"}
              // style={{ width: "1232px" }}
            >
              <SanityImage image={image} />
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
