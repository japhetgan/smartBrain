import React, { useEffect, useRef, useState } from "react";

export default function FaceRecognition({ imageURL, boxRegions = [] }) {
  const image = document.getElementById("inputImage");
  const width = image ? Number(image.offsetWidth) : 1;
  const height = image ? Number(image.offsetHeight) : 1;

  return (
    <div className="flex justify-center">
      <div className="my-12 absolute">
        <img
          id="inputImage"
          className="max-w-sm rounded-lg"
          alt=""
          src={imageURL}
        />
        {boxRegions.map((obj, index) => {
          const data = obj.region_info.bounding_box;
          const colLeft = data.left_col * width;
          const colRight = width - data.right_col * width;
          const colTop = data.top_row * height;
          const colBottom = height - data.bottom_row * height;

          return (
            <div
              key={index}
              style={{
                top: colTop,
                bottom: colBottom,
                left: colLeft,
                right: colRight,
              }}
              className="absolute flex flex-wrap justify-center cursor-pointer shadow-[0_0_0_3px_rgb(20,157,242)] "
            ></div>
          );
        })}
      </div>
    </div>
  );
}
