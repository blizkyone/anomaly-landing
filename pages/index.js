import { useState, useRef, useEffect } from "react";
import autoAnimate from "@formkit/auto-animate";
import Image from "next/image";
import Proyectos from "../components/Proyectos";
import { Loader } from "@googlemaps/js-api-loader";
import { client } from "../lib/client";

const getPictureWidth = (width) => {
  if (width > 1440) {
    return width / 3;
  } else if (width > 700) {
    return width / 2;
  } else {
    return width;
  }
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function Home({ banners, landing }) {
  const [nav, setNav] = useState();
  const [windowDimensions, setWindowDimensions] = useState({});

  const parent = useRef();
  const parent2 = useRef();
  const title = useRef();
  const navbar = useRef();
  const googlemap = useRef();

  let map, google;

  useEffect(() => {
    console.log(banners);
    console.log(landing);
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
      version: "weekly",
    });

    loader.load().then(async () => {
      google = window.google;
      map = new google.maps.Map(googlemap.current, {
        clickableIcons: false,
        disableDoubleClickZoom: true,
        center: { lat: 20.9670154, lng: -89.6242833 },
        zoom: 13,
      });
    });

    parent.current && autoAnimate(parent.current);
    parent2.current && autoAnimate(parent2.current);

    setWindowDimensions(getWindowDimensions());

    const handleScroll = () => {
      let visible = pageYOffset !== 0;
      if (visible) {
        navbar.current.style.background = "rgba(0, 0, 0)";
      } else {
        navbar.current.style.background = "transparent";
      }

      let titleScroll = scrollY > window.innerHeight - 128;

      if (titleScroll) {
        title.current.style.color = "white";
      } else {
        title.current.style.color = "transparent";
      }
    };

    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    document.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [parent]);

  return (
    <div className="relative">
      <div
        className="fixed z-20 top-0 left-0 right-0 transition-colors"
        ref={navbar}
      >
        <div
          ref={parent}
          className="container mx-auto text-white flex justify-between items-center h-24 overflow-hidden"
        >
          <p
            ref={title}
            className="font-bold relative -top-2 transition-colors hover:cursor-pointer"
            style={{ fontSize: "126px" }}
            onClick={(_) => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            ANOMALY
          </p>
          <p
            className="hover:cursor-pointer z-50 p-5 text-3xl"
            onClick={(_) => setNav((n) => !n)}
            ref={parent2}
          >
            {nav ? (
              <i className="fa-solid fa-xmark"></i>
            ) : (
              <i className="fa-solid fa-bars"></i>
            )}
          </p>
          {nav && (
            <div className="fixed top-0 left-0 z-30 h-screen w-full bg-black text-white">
              <div className="text-center text-4xl flex flex-col justify-center items-center h-full w-full">
                <h1 className="m-12 hover:cursor-pointer transition-transform hover:scale-110">
                  ANOMALY
                </h1>
                <h1 className="m-12 hover:cursor-pointer transition-transform hover:scale-110">
                  Comercial
                </h1>
                <h1 className="m-12 hover:cursor-pointer transition-transform hover:scale-110">
                  Residencial
                </h1>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="relative h-screen w-full">
        <Image
          alt="tulum"
          className="z-0"
          src="/main.jpg"
          layout="fill"
          objectFit="cover"
          priority={true}
        />
        <div className="absolute top-0 z-10 h-screen w-full flex bg-black/70 items-end justify-end">
          <h1
            className="text-white text-center p-0 m-0 relative top-11 font-bold"
            style={{ fontSize: "126px" }}
          >
            ANOMALY
          </h1>
        </div>
      </div>
      <div className="text-3xl container mx-auto my-64">
        <p className="text-center m-28">{landing[0].principal}</p>
      </div>
      <div className="flex flex-wrap">
        {banners.map((b, i) => (
          <Proyectos key={i} proyecto={b} windowDimensions={windowDimensions} />
        ))}
      </div>

      <div className="container mx-auto p-12 h-screen">
        <div className="bg-gray-500 w-full h-1/2 mt-24" ref={googlemap}>
          Map
        </div>
        <div className="mt-24 flex justify-between">
          <div className="max-w-xs">
            <p>{landing[0].direccion}</p>
          </div>
          <div>
            <p>{landing[0].telefono}</p>
            <p>{landing[0].email}</p>
          </div>
        </div>
      </div>
      <div className="bg-black text-white px-24 flex justify-between items-center h-96">
        <p>Anomaly estudio de arquitectura 2022</p>
        <p>Social media links</p>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const bannerQuery = '*[_type == "banner"]';
  const banners = await client.fetch(bannerQuery);

  const landingQuery = '*[_type == "landing"]';
  const landing = await client.fetch(landingQuery);

  return {
    props: { banners, landing }, // will be passed to the page component as props
  };
}
