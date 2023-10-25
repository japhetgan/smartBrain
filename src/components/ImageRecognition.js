import React from "react";
import { Typography } from "@material-tailwind/react";
import Typewriter from "typewriter-effect";

export default function ImageRecognition({
  input,
  faceRegions = [],
  caption = "",
}) {
  const image = document.getElementById("inputImage");
  const width = image ? Number(image.offsetWidth) : 1;
  const height = image ? Number(image.offsetHeight) : 1;

  return (
    <div className="">
      <Typography
        className={`${
          caption.length === 0 ? "hidden" : "visible"
        } my-5 text-center text-blue-gray-900 font-bold`}
        variant="paragraph"
      >
        {`🪄👀 ${caption}`}
      </Typography>
      <div className="relative flex justify-center">
        <div className="absolute">
          <img
            id="inputImage"
            className="max-w-md rounded-lg"
            alt=""
            src={input}
          />
          {faceRegions.map((obj, index) => {
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
                className={`${
                  faceRegions.length === 0 ? "invisible" : "visible"
                } absolute flex flex-wrap justify-center cursor-pointer shadow-[0_0_0_3px_rgb(20,157,242)]`}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
