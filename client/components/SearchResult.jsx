//  SearchResult.jsx

let React = require("react");
let ReactDOM = require("react-dom");

module.exports = class SearchResult extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <hr />
                <div>
                    <span>Title: {this.props.title}</span>&nbsp;
                    <span>Text: {this.props.text}</span>
                </div>
                <hr />
            </div>
        );
    }
}