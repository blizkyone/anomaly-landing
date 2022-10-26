import React from "react";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import { client } from "../lib/client";

const SanityImage = ({ image }) => {
  const imageProps = useNextSanityImage(client, image);

  return (
    <Image
      {...imageProps}
      className="z-0"
      layout="fill"
      objectFit="cover"
      priority={true}
    />
  );
};

export default SanityImage;
