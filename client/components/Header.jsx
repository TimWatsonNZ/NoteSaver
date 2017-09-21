//  Header.jsx

const React = require("react");
const ReactDOM = require("react-dom");

module.exports = class Header extends React.Component {
    constructor(props){
        super(props);

        this.logout = this.logout.bind(this);
    }

    logout(){
        
    }

    render(){
        return( 
            <div className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">WebSiteName</a>
                    </div>
                    <ul className="nav navbar-nav">
                        <li><a href="/addNote">Add Note</a></li>
                        <li><a href="/">Search Notes</a></li>
                        <li><a href="/" onClick={this.logout}>Logout</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}