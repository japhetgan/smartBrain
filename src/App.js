import React, { useState } from "react";
import Navigation from "./components/Navigation";
import ImageLinkForm from "./components/ImageLinkForm";
import ImageRecognition from "./components/ImageRecognition";
import SignIn from "./components/SignIn";
import Registration from "./components/Registration";
import PuffLoader from "react-spinners/PuffLoader";

function App() {
  const [waitingForUser, setWaitingForUSer] = useState(true);
  const [input, setInput] = useState("");
  const [boxRegions, setBoxRegions] = useState({});
  const [route, setRoute] = useState("signIn");
  const [caption, setCaption] = useState("");
  const [faceRegions, setFaceRegions] = useState([]);
  const [displayBox, setDisplayBox] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [validURL, setValidURL] = useState(true);
  const [howManyConcepts, setHowManyConcepts] = useState(faceRegions.length);

  const onButtonConceptHover = (concept) => {
    setDisplayBox(boxRegions[concept]);
    setHowManyConcepts(boxRegions[concept].length);
  };

  const onButtonConceptLeft = () => {
    setDisplayBox(faceRegions);
    setHowManyConcepts(faceRegions.length);
  };

  const onInputChange = (event) => {
    const URL = event.target.value;

    const pattern = /\.jpe?g(.*\?[^#\s]*)?$|\.png(.*\?[^#\s]*)?$/;
    if (pattern.test(URL)) {
      setValidURL(true);
    } else {
      setValidURL(false);
    }

    if (URL.length === 0) {
      setWaitingForUSer(true);
      setValidURL(true);
    }

    setHowManyConcepts(0);
    setBoxRegions({});
    setCaption("");
    setFaceRegions([]);
    setInput(URL);
  };

  const getFaceRegions = (response) => {
    const region = response.data.regions.length
      ? response.data.regions.map((obj) => obj.region_info.bounding_box)
      : [];
    return region;
  };

  const displayFaceBox = (result) => {
    setHowManyConcepts(result.length);
    setFaceRegions(result);
    setDisplayBox(result);
  };

  const getBoxRegions = (response) => {
    return response.data.regions;
  };

  const displayBoxRegions = (result) => {
    const regions = {};

    for (let x = 0; x < result.length; x++) {
      const obj = result[x];
      const concept = obj.data.concepts[0].name;

      if (concept === "Human face") continue;

      if (regions.hasOwnProperty(concept)) {
        regions[concept].push(obj.region_info.bounding_box);
      } else {
        regions[concept] = [];
        regions[concept].push(obj.region_info.bounding_box);
      }
    }
    setBoxRegions(regions);
  };

  const getCaption = (obj) => {
    const result = obj.data.text.raw;
    const caption =
      result.toLowerCase().charAt(0).toUpperCase() + result.slice(1);
    setCaption(caption);
    setIsLoading(false);
  };

  const onButtonClick = () => {
    setWaitingForUSer(false);
    setIsLoading(true);
    fetch("http://localhost:3000/imageUrl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        getCaption(result[0]);
        displayFaceBox(getFaceRegions(result[1]));
        displayBoxRegions(getBoxRegions(result[2]));
      })
      .catch((error) => console.log("error", error));
  };

  const onRouteChange = (route) => {
    setWaitingForUSer(true);
    setBoxRegions({});
    setCaption("");
    setFaceRegions([]);
    setInput("");
    setRoute(route);
  };

  return route === "home" ? (
    <div className="">
      <Navigation onRouteChange={onRouteChange} />
      <ImageLinkForm
        validURL={validURL}
        input={input}
        onInputChange={onInputChange}
        onButtonClick={onButtonClick}
      />
      {waitingForUser ? (
        <PuffLoader size={100} className="m-auto my-20" color="#36d7b7" />
      ) : (
        <ImageRecognition
          howManyConcepts={howManyConcepts}
          isLoading={isLoading}
          displayBox={displayBox}
          onButtonConceptHover={onButtonConceptHover}
          onButtonConceptLeft={onButtonConceptLeft}
          boxRegions={boxRegions}
          faceRegions={faceRegions}
          caption={caption}
          input={input}
        />
      )}
    </div>
  ) : route === "registration" ? (
    <Registration onRouteChange={onRouteChange} />
  ) : (
    <SignIn onRouteChange={onRouteChange} />
  );
}

export default App;
