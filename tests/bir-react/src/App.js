import React, { Component } from "react";
import { readAndCompressImage } from "browser-image-resizer";

export default class App extends Component {
  state = {
    testType: "global",
    message: "Yo",
    image: null
  };

  onChange = async event => {
    let image = await readAndCompressImage(event.target.files[0], { mimeType: 'image/jpeg', debug: true });
    let base64Image = await this.convertToBase64(image);
    this.setState({ image: base64Image });
  };

  convertToBase64 = blob => {
    return new Promise(resolve => {
      var reader = new FileReader();
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  };

  render() {
    const { image } = this.state;
    return (
      <div className="App">
        <h1>browser-image-resizer</h1>
        <h2>Select a local file to compress</h2>
        <input type="file" accept="image/*" onChange={this.onChange} />
        <img src={image} alt="compress-image-output" />
      </div>
    );
  }
}
