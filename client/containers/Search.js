let React = require("react");
let ReactDOM = require("react-dom");
let SearchNotes = require("../components/SearchNotes.jsx");
let Header = require("../components/Header.jsx");

ReactDOM.render(
    <Header />,
    document.querySelector("#header")
);

ReactDOM.render(
    <SearchNotes />,
    document.querySelector("#app")
);