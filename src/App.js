import React, { useState } from "react";
import Navigation from "./components/Navigation";
import ImageLinkForm from "./components/ImageLinkForm";
import ImageRecognition from "./components/ImageRecognition";
import SignIn from "./components/SignIn";
import Registration from "./components/Registration";
import { Typography } from "@material-tailwind/react";

function App() {
  const [input, setInput] = useState("");
  const [boxRegions, setBoxRegions] = useState([]);
  const [route, setRoute] = useState("signIn");
  const [caption, setCaption] = useState("");
  const [faceRegions, setFaceRegions] = useState([]);

  const onInputChange = (event) => {
    setCaption("");
    setFaceRegions([]);
    setInput(event.target.value);
  };

  const getBoxRegions = (response) => {
    return response.data.regions;
  };

  const displayFaceBox = (response) => {
    setFaceRegions(response);
  };

  const getCaption = (obj) => {
    const result = obj.data.text.raw;
    const caption =
      result.toLowerCase().charAt(0).toUpperCase() + result.slice(1);
    setCaption(caption);
  };

  const onButtonClick = () => {
    fetch("http://localhost:3000/imageUrl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        getCaption(result[0]);
        displayFaceBox(getBoxRegions(result[1]));
      })
      .catch((error) => console.log("error", error));
  };

  const onRouteChange = (route) => {
    setFaceRegions([]);
    setInput("");
    setRoute(route);
  };

  return route === "home" ? (
    <div>
      <Navigation onRouteChange={onRouteChange} />
      <ImageLinkForm
        input={input}
        onInputChange={onInputChange}
        onButtonClick={onButtonClick}
      />
      <ImageRecognition
        faceRegions={faceRegions}
        caption={caption}
        input={input}
      />
    </div>
  ) : route === "registration" ? (
    <Registration onRouteChange={onRouteChange} />
  ) : (
    <SignIn onRouteChange={onRouteChange} />
  );
}

export default App;
