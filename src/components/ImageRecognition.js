import React from "react";
import { Typography, Badge, Button } from "@material-tailwind/react";
import Typewriter from "typewriter-effect";
import BeatLoader from "react-spinners/BeatLoader";

export default function ImageRecognition({
  howManyConcepts,
  isLoading,
  displayBox = [],
  onButtonConceptHover,
  onButtonConceptLeft,
  boxRegions = {},
  input,
  faceRegions = [],
  caption = "",
}) {
  const image = document.getElementById("inputImage");
  const width = image ? Number(image.offsetWidth) : 1;
  const height = image ? Number(image.offsetHeight) : 1;

  const concepts = Object.keys(boxRegions);

  return (
    <div className="text-center max-w-md m-auto">
      <BeatLoader className="mt-5" loading={isLoading} color="#263238" />
      <Typography
        className={`${
          caption.length === 0 ? "hidden" : "visible"
        } mt-5 mb-3 text-center text-blue-gray-900 font-bold`}
        variant="paragraph"
      >
        {`🪄👀 ${caption}`}
      </Typography>

      <Typography
        variant="small"
        className={`text-center mb-3 ${concepts.length ? "visible" : "hidden"}`}
      >
        {`I ${
          faceRegions.length
            ? faceRegions.length === 1
              ? "recognized a face and"
              : `spotted ${faceRegions.length} faces and`
            : ""
        } identified ${
          concepts.length
        } interesting objects in the image. Feel free to hover over these words to discover their locations!`}
      </Typography>

      <div className="flex flex-wrap items-center justify-center gap-1 mb-8 ">
        {concepts.map((property, index) => {
          return (
            <button
              key={index}
              onMouseOver={() => onButtonConceptHover(property)}
              onMouseLeave={() => onButtonConceptLeft()}
              className="bg-blue-gray-800 rounded-lg px-4 py-2 text-xs font-light text-white hover:bg-blue-gray-400 "
            >
              {property}
            </button>
          );
        })}
      </div>
      <Badge
        className={` ${howManyConcepts ? "visible" : "hidden"}`}
        color="blue"
        content={howManyConcepts}
      >
        <div className="relative flex justify-center">
          <div className="absolute">
            <img
              id="inputImage"
              className="max-w-md rounded-lg"
              alt=""
              src={input}
            />
            {displayBox.map((obj, index) => {
              const data = obj;
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
                    concepts.length === 0 ? "invisible" : "visible"
                  } absolute flex flex-wrap justify-center cursor-pointer shadow-[0_0_0_3px_rgb(20,157,242)]`}
                ></div>
              );
            })}
          </div>
        </div>
      </Badge>
    </div>
  );
}
