import React, { Component } from "react";

import Todo from "./components";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header" />
        <Todo />
      </div>
    );
  }
}

export default App;
