//  Header.jsx

const React = require("react");
const ReactDOM = require("react-dom");

module.exports = class Header extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return( 
            <div>
                <span> <a href="/addNote">Add Note</a> </span>
                <span> <a href="/">Search Notes</a></span>
            </div>
        );
    }
}