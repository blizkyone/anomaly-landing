import { useState, useRef, useEffect } from "react";
import autoAnimate from "@formkit/auto-animate";
import Image from "next/image";
import Proyectos from "../components/Proyectos";
import { Loader } from "@googlemaps/js-api-loader";
import { client } from "../lib/client";
import { useNextSanityImage } from "next-sanity-image";
import { useRouter } from "next/router";

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
  const [loading, setLoading] = useState();

  const router = useRouter();

  const parent = useRef();
  const parent2 = useRef();
  const main = useRef();
  const title = useRef();
  const navbar = useRef();
  const googlemap = useRef();

  let map, google;

  const imageProps = useNextSanityImage(client, landing[0].image);

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
    main.current && autoAnimate(main.current);

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

  useEffect(() => {
    router.events.on("routeChangeStart", (_) => setLoading(true));
    router.events.on("routeChangeComplete", (_) => setLoading(false));
    return () => {
      router.events.off("routeChangeStart", (_) => setLoading(true));
      router.events.off("routeChangeComplete", (_) => setLoading(false));
    };
  }, [router.events]);

  return (
    <div className="relative" ref={main}>
      {loading && (
        <div className="fixed top left w-screen h-screen bg-black/50 flex justify-center items-center text-center z-50">
          <p className="text-2xl text-white animate-pulse">
            Obteniendo imagenes...
          </p>
        </div>
      )}
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
            style={{ fontSize: "126px", color: "transparent" }}
            onClick={(_) => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            ANOMALY
          </p>
          <div
            className="w-12 h-12 hover:cursor-pointer active:bg-white/20 rounded p-2"
            onClick={(_) =>
              window.open(
                "https://www.instagram.com/anomaly_arquitectura",
                "_blank"
              )
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0"
              y="0"
              version="1.1"
              viewBox="0 0 54 54"
              xmlSpace="preserve"
            >
              <path
                fill="white"
                d="M28.2 16.7c-7 0-12.8 5.7-12.8 12.8s5.7 12.8 12.8 12.8S41 36.5 41 29.5s-5.8-12.8-12.8-12.8zm0 21c-4.5 0-8.2-3.7-8.2-8.2s3.7-8.2 8.2-8.2 8.2 3.7 8.2 8.2-3.7 8.2-8.2 8.2z"
              ></path>
              <circle fill="white" cx="41.5" cy="16.4" r="2.9"></circle>
              <path
                fill="white"
                d="M49 8.9c-2.6-2.7-6.3-4.1-10.5-4.1H17.9c-8.7 0-14.5 5.8-14.5 14.5v20.5c0 4.3 1.4 8 4.2 10.7 2.7 2.6 6.3 3.9 10.4 3.9h20.4c4.3 0 7.9-1.4 10.5-3.9 2.7-2.6 4.1-6.3 4.1-10.6V19.3c0-4.2-1.4-7.8-4-10.4zm-.4 31c0 3.1-1.1 5.6-2.9 7.3s-4.3 2.6-7.3 2.6H18c-3 0-5.5-.9-7.3-2.6C8.9 45.4 8 42.9 8 39.8V19.3c0-3 .9-5.5 2.7-7.3 1.7-1.7 4.3-2.6 7.3-2.6h20.6c3 0 5.5.9 7.3 2.7 1.7 1.8 2.7 4.3 2.7 7.2v20.6z"
              ></path>
            </svg>
          </div>
          {/* <p
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
          )} */}
        </div>
      </div>

      <div className="relative h-screen w-full">
        <Image
          {...imageProps}
          alt="casa"
          className="z-0"
          // src="/main.jpg"
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
      <div className="bg-black text-white px-24 flex justify-between items-center h-48">
        <p>Anomaly estudio de arquitectura 2022</p>
        <div
          className="w-12 h-12 hover:cursor-pointer active:bg-white/20 rounded p-2"
          onClick={(_) =>
            window.open(
              "https://www.instagram.com/anomaly_arquitectura",
              "_blank"
            )
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0"
            y="0"
            version="1.1"
            viewBox="0 0 54 54"
            xmlSpace="preserve"
          >
            <path
              fill="white"
              d="M28.2 16.7c-7 0-12.8 5.7-12.8 12.8s5.7 12.8 12.8 12.8S41 36.5 41 29.5s-5.8-12.8-12.8-12.8zm0 21c-4.5 0-8.2-3.7-8.2-8.2s3.7-8.2 8.2-8.2 8.2 3.7 8.2 8.2-3.7 8.2-8.2 8.2z"
            ></path>
            <circle fill="white" cx="41.5" cy="16.4" r="2.9"></circle>
            <path
              fill="white"
              d="M49 8.9c-2.6-2.7-6.3-4.1-10.5-4.1H17.9c-8.7 0-14.5 5.8-14.5 14.5v20.5c0 4.3 1.4 8 4.2 10.7 2.7 2.6 6.3 3.9 10.4 3.9h20.4c4.3 0 7.9-1.4 10.5-3.9 2.7-2.6 4.1-6.3 4.1-10.6V19.3c0-4.2-1.4-7.8-4-10.4zm-.4 31c0 3.1-1.1 5.6-2.9 7.3s-4.3 2.6-7.3 2.6H18c-3 0-5.5-.9-7.3-2.6C8.9 45.4 8 42.9 8 39.8V19.3c0-3 .9-5.5 2.7-7.3 1.7-1.7 4.3-2.6 7.3-2.6h20.6c3 0 5.5.9 7.3 2.7 1.7 1.8 2.7 4.3 2.7 7.2v20.6z"
            ></path>
          </svg>
        </div>
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
