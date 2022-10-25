import { useState, useRef, useEffect } from "react";
import autoAnimate from "@formkit/auto-animate";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Loader } from "@googlemaps/js-api-loader";

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

export default function Home() {
  const [nav, setNav] = useState();
  const [windowDimensions, setWindowDimensions] = useState({});

  const parent = useRef(null);
  const navbar = useRef();
  const googlemap = useRef();

  let map, google;

  useEffect(() => {
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

    setWindowDimensions(getWindowDimensions());

    const handleScroll = () => {
      let visible = pageYOffset !== 0;
      if (visible) {
        navbar.current.style.background = "rgba(0, 0, 0)";
      } else {
        navbar.current.style.background = "transparent";
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
    <div ref={parent} className="relative">
      <div
        className="fixed z-20 top-0 left-0 right-0 p-6 transition-colors"
        ref={navbar}
      >
        <div className="container mx-auto text-white flex justify-between">
          <p>Anomaly</p>
          <p className="hover:cursor-pointer" onClick={(_) => setNav(true)}>
            <i className="fa-solid fa-bars"></i>
          </p>
        </div>
      </div>

      {nav && (
        <div className="fixed top-0 z-30 h-screen w-full bg-black text-white">
          <p
            className="relative text-right top-10 right-10 hover:cursor-pointer"
            onClick={(_) => setNav(false)}
          >
            Close
          </p>
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
      <div className="relative h-screen w-full">
        <Image
          alt="tulum"
          className="z-0"
          src="/main.jpg"
          layout="fill"
          objectFit="cover"
          priority={true}
        />
        <div className="absolute top-0 z-10 h-screen w-full flex justify-center items-center bg-black/70">
          <h1 className="text-white text-center text-4xl">ANOMALY</h1>
        </div>
      </div>
      <div className="container mx-auto">
        <p className="text-4xl text-center m-28">
          Alguna frase inspiradora o del estilo del estudio
        </p>
      </div>
      <div className="flex flex-wrap">
        <div
          className="w-full md:w-1/2 2xl:w-1/3 relative hover:cursor-pointer overflow-hidden"
          style={{
            height: getPictureWidth(windowDimensions.width),
          }}
        >
          <div className="w-full h-full transition-transform hover:scale-125 duration-500">
            <Image
              alt="tulum"
              className="z-0"
              src="/cocina.jpg"
              layout="fill"
              objectFit="cover"
              priority={true}
            />
            <div className="absolute top-0 z-10 h-full w-full flex bg-black/70 ">
              <div className=" text-white  w-full h-full flex flex-col flex-1 justify-center items-center">
                <h1 className="text-center text-3xl ">CASA UNO</h1>
                <p className="text-sm font-thin">
                  Este proyecto fue una casa para un gaio
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className=" w-full md:w-1/2 2xl:w-1/3 relative hover:cursor-pointer overflow-hidden"
          style={{
            height: getPictureWidth(windowDimensions.width),
          }}
        >
          <div className="w-full h-full transition-transform hover:scale-125 duration-500">
            <Image
              alt="tulum"
              className="z-0"
              src="/piscina.jpg"
              layout="fill"
              objectFit="cover"
              priority={true}
            />
            <div className="absolute top-0 z-10 h-full w-full flex bg-black/70 ">
              <div className=" text-white  w-full h-full flex flex-col flex-1 justify-center items-center">
                <h1 className="text-center text-3xl ">CASA DOS</h1>
                <p className="text-sm font-thin">
                  Este proyecto fue una casa para un gaio
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className=" w-full md:w-1/2 2xl:w-1/3 relative hover:cursor-pointer overflow-hidden"
          style={{
            height: getPictureWidth(windowDimensions.width),
          }}
        >
          <div className="w-full h-full transition-transform hover:scale-125 duration-500">
            <Image
              alt="tulum"
              className="z-0"
              src="/sala.jpg"
              layout="fill"
              objectFit="cover"
              priority={true}
            />
            <div className="absolute top-0 z-10 h-full w-full flex bg-black/70 ">
              <div className=" text-white  w-full h-full flex flex-col flex-1 justify-center items-center">
                <h1 className="text-center text-3xl ">CASA TRES</h1>
                <p className="text-sm font-thin">
                  Este proyecto fue una casa para un gaio
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className=" w-full md:w-1/2 2xl:w-1/3 relative hover:cursor-pointer overflow-hidden"
          style={{
            height: getPictureWidth(windowDimensions.width),
          }}
        >
          <div className="w-full h-full transition-transform hover:scale-125 duration-500">
            <Image
              alt="tulum"
              className="z-0"
              src="/ventana.jpg"
              layout="fill"
              objectFit="cover"
              priority={true}
            />
            <div className="absolute top-0 z-10 h-full w-full flex bg-black/70 ">
              <div className=" text-white  w-full h-full flex flex-col flex-1 justify-center items-center">
                <h1 className="text-center text-3xl ">CASA TRES</h1>
                <p className="text-sm font-thin">
                  Este proyecto fue una casa para un gaio
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-12 h-screen">
        <div className="bg-gray-500 w-full h-1/2 mt-24" ref={googlemap}>
          Map
        </div>
        <div className="mt-24 flex justify-between">
          <div>
            <p>Calle 24 Numero 450 x Paseo Montejo</p>

            <p>Colonia Campestre 97117</p>
            <p>Merida Yucatan Mexico</p>
          </div>
          <div>
            <p>+52 999 455 6565</p>
            <p>jr@anomaly.com</p>
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
