import React from "react";
import "./styles.css";
import socketioClient from "socket.io-client";

export const API_URL = "localhost:4001";

export default class App extends React.Component {
  state = {
    motionData: {}
  };

  constructor() {
    super();
    this.socket = socketioClient(API_URL);
  }

  onDevicemotion = (that, e) => {
    console.log(e.accelerationIncludingGravity);
    that.setState({ motionData: e.accelerationIncludingGravity });
    this.socket.emit("motion_data", {
      timeStamp: e.timeStamp,
      accelerationIncludingGravity: e.accelerationIncludingGravity
    });
  }

  componentDidMount() {
    window.ondevicemotion = (e) => this.onDevicemotion(this, e);
  }

  render() {
    return (
      <div className="App">
        <p>{JSON.stringify(this.state.motionData)}</p>
        <div id="dashboard">
        </div>
      </div>
    );
  }
}
