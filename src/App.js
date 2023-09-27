import React, { Component } from "react";
import Navigation from "./components/Navigation";
import ImageLinkForm from "./components/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition";

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

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageURL: "",
      boxRegions: [],
    };
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  calculateFaceLocation = (response) => {
    return response.outputs[0].data.regions;
  };

  displayFaceBox = (obj) => {
    this.setState({ boxRegions: obj }, () =>
      console.log(this.setState.boxRegions)
    );
  };

  onButtonClick = () => {
    this.setState({ imageURL: this.state.input });
    fetch(
      "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
      clarifaiRequestOptions(this.state.input)
    )
      .then((response) => response.json())
      .then((result) => this.displayFaceBox(this.calculateFaceLocation(result)))
      .catch((error) => console.log("error", error));
  };

  render() {
    return (
      <div className="">
        <Navigation />
        <ImageLinkForm
          input={this.state.input}
          onInputChange={this.onInputChange}
          onButtonClick={this.onButtonClick}
        />
        <FaceRecognition
          boxRegions={this.state.boxRegions}
          imageURL={this.state.imageURL}
        />
      </div>
    );
  }
}

export default App;
