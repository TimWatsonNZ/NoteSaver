let React = require("react");
let ReactDOM = require("react-dom");
let UpdateNote = require("../components/UpdateNote.jsx");
let Header = require("../components/Header.jsx");

ReactDOM.render(
    <Header />,
    document.querySelector("#header")
);

ReactDOM.render(
    <UpdateNote />,
    document.querySelector("#app")
);