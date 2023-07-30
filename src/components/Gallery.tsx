"use client";
import { LightGallery } from "lightgallery/lightgallery";
import LightGalleryComponent from "lightgallery/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Masonry from "react-masonry-css";
import type { Photo } from "../types";

// import styles
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lightgallery.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

type GalleryProps = {
  photos: Photo[];
};

export function Gallery({ photos }: GalleryProps) {
  const lightboxRef = useRef<LightGallery | null>(null);

  const [screenSize, setScreenSize] = useState(Math.ceil(window.innerWidth / 480));

  const handleResize = () => {
    const width = window.innerWidth;
    setScreenSize(Math.ceil(width / 480));
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Masonry
        breakpointCols={screenSize}
        className="flex gap-4"
        columnClassName=""
      >
        {photos.map((photo, idx) => (
          <div className="relative" key={photo.src}>
            <Image
              src={photo.src}
              width={photo.width}
              height={photo.height}
              alt={photo.alt}
              className="relative my-4 bg-stone-900"
            />
            <div
              className="absolute w-full h-full inset-0 bg-transparent hover:bg-stone-900 hover:bg-opacity-10 cursor-pointer"
              onClick={() => {
                lightboxRef.current?.openGallery(idx);
              }}
            ></div>
          </div>
        ))}
      </Masonry>

      <LightGalleryComponent
        onInit={(ref) => {
          if (ref) {
            lightboxRef.current = ref.instance;
          }
        }}
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
        dynamic
        dynamicEl={photos.map((photo) => ({
          src: photo.src,
          thumb: photo.src,
        }))}
      />
    </>
  );
}
