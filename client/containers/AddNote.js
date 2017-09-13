let React = require("react");
let ReactDOM = require("react-dom");
let AddNote = require("../components/AddNote.jsx");
let Header = require("../components/Header.jsx");

ReactDOM.render(
    <Header />,
    document.querySelector("#header")
);

ReactDOM.render(
    <AddNote />,
    document.querySelector("#app")
);