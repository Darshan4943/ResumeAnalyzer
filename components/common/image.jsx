import Image from "next/image";
import React from "react";

const ImageContainer = ({ style, className, src, alt }) => {
  return (
      <Image
      // objectFit="cover"
        style={style}
        className={className}
        src={src}
        alt={alt}
        sizes="100vw"
        width={100}
        height={100}
      />
  );
};

export default ImageContainer;
