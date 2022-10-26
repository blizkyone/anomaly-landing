import { useEffect, useState } from "react";
import { useNextSanityImage } from "next-sanity-image";
import { client } from "../lib/client";
import Image from "next/image";
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

const Proyectos = ({ proyecto, windowDimensions }) => {
  const imageProps = useNextSanityImage(client, proyecto.image);

  const router = useRouter();

  return (
    <div
      className="relative w-full md:w-1/2 2xl:w-1/3 hover:cursor-pointer overflow-hidden"
      style={{
        height: getPictureWidth(windowDimensions.width),
      }}
      onClick={(_) => router.push(`/${proyecto.slug.current}`)}
    >
      <div className="relative w-full h-full transition-transform hover:scale-125 duration-500">
        <Image
          {...imageProps}
          alt="tulum"
          className="z-0"
          // src="/cocina.jpg"
          layout="fill"
          objectFit="cover"
          priority={true}
        />
        <div className="absolute top-0 z-10 h-full w-full flex bg-black/70 ">
          <div className=" text-white  w-full h-full flex flex-col flex-1 justify-center items-center">
            <h1 className="text-center text-3xl ">{proyecto.title}</h1>
            <p className="text-sm font-thin">{proyecto.punchline}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proyectos;
