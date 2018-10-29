import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Home from "./components/home";

ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(<Home />, document.getElementById("root1"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
