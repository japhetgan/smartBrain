import React, { useState } from "react";
import Navigation from "./components/Navigation";
import ImageLinkForm from "./components/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition";
import SignIn from "./components/SignIn";

const PAT = "2299a679ea584861bb8d798870940edb";
const USER_ID = "bhn3dh1qh8ah";
const APP_ID = "smartBrain_app";
const MODEL_ID = "face-detection";

const clarifaiRequestOptions = (IMAGE_URL) => {
  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };
  return requestOptions;
};

function App() {
  const [input, setInput] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [boxRegions, setBoxRegions] = useState([]);
  const [route, setRoute] = useState("signIn");

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const getBoxRegions = (response) => {
    return response.outputs[0].data.regions;
  };

  const displayFaceBox = (obj) => {
    setBoxRegions(obj);
  };

  const onButtonClick = () => {
    fetch(
      "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
      clarifaiRequestOptions(input)
    )
      .then((response) => response.json())
      .then((result) => displayFaceBox(getBoxRegions(result)))
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="">
      {/* <SignIn /> */}
      <Navigation />
      <ImageLinkForm
        input={input}
        onInputChange={onInputChange}
        onButtonClick={onButtonClick}
      />
      <FaceRecognition boxRegions={boxRegions} input={input} />
    </div>
  );
}

export default App;
