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
      box: {},
    };
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  boundingBox = (response) => {
    this.setState({
      box: response.outputs[0].data.regions[0].region_info.bounding_box,
    });
    console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
  };

  onButtonClick = () => {
    this.setState({ imageURL: this.state.input });
    fetch(
      "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
      clarifaiRequestOptions(this.state.input)
    )
      .then((response) => response.json())
      .then((result) => this.boundingBox(result))
      .catch((error) => console.log("error", error));
  };

  render() {
    return (
      <div className="">
        <Navigation />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonClick={this.onButtonClick}
        />
        <FaceRecognition imageURL={this.state.imageURL} />
      </div>
    );
  }
}

export default App;
