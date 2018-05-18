
import React from 'react'
import jwtDecode from "jwt-decode";

class Header extends React.Component {

    constructor(){
        super()
        this.state = {
            username: ''
        }
    }

    componentDidMount(){
        let token = localStorage.getItem('token'), user;
        if(token){
            user= jwtDecode(token);
            this.setState({username:user.username})
        }
    }
    render(){
        let user = this.state.username, LoginContainer;

        if (user) {
          LoginContainer = <li><a href="/log"> Welcome back !</a></li>;
        } else {
          LoginContainer = <li><a href="/login"> 登录</a></li>;
        }
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="/log">查看日志</a>
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav navbar-right">
                            {LoginContainer}
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }

}
export default Header;
