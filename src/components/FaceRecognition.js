import React from "react";

export default function FaceRecognition({ imageURL }) {
  return (
    <div className="my-12">
      <img className="max-w-sm mx-auto rounded-lg" alt="" src={imageURL} />
    </div>
  );
}
