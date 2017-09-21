//  Login.jsx

let React = require("react");
let ReactDOM = require("react-dom");

module.exports = class Login extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="container">
                <div className="col-sm-6 col-sm-offset-3">
                    <h1>
                        <span className="fa fa-sign-in"></span>Login
                    </h1>

                    <form action="/api/login">
                        <div className="">
                            <label htmlFor="">Email</label>
                            <input type="text"  className="form-control" name="email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Password</label>
                            <input type="password"  className="form-control" name="password" />
                        </div>
                        <button type="submit" className="btn btn-warning btn-lg">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}