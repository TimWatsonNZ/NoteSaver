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
                    <div>{this.props.title}</div>&nbsp;
                    <div>{this.props.text}</div>
                </div>
                <hr />
            </div>
        );
    }
}