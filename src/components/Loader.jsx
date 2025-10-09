import React from "react";
import { FadeLoader } from "react-spinners";

export default class Loader extends React.Component {
  render() {
    return (
      <div className="loader-container">
        <FadeLoader
          color="#ff0000"
          height={25}
          width={8}
          radius={10}
          margin={10}
          speedMultiplier={1.5}
        />
      </div>
    );
  }
}
