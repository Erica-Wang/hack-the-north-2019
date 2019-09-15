import React, {Component} from 'react';
import axios from 'axios';
import './login.css';
import './assets/css/main.css';
import firebase from 'firebase';

class registration extends Component{

	constructor(props) {
        super(props);
    }

  componentDidMount() {
    if(!this.props.location.data){
      console.log('didnt get status');
       this.setState({personStatus: 'student'});
    }
    else this.setState({personStatus: this.props.location.data.personStatus});
  }

  state = {
    username: null,
	password: null,
	firstName: null,
	lastName: null,
	email: null
  };

  registration = () => {
	const userSend = this.state.username;
    const userPass = this.state.password;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(userSend, userPass);
    promise.catch(e => console.log(e.message));
  }

  render(){
    return (
      <div>
		<div id="log">
		<header id="header" className="container">
            {/* Logo */}
            <div id="logo">
			<h1><a href="/">tourhub</a></h1>
              <span>powered by Accenture.</span>
            </div>
          </header>
			<input className="login" 
				type="text"
				placeholder="First Name"
				onChange={(e)=> this.setState({firstName: e.target.value})}
				style={{ width: '200px' }}
			  />
			  <input className="login"
				type="text"
				placeholder="Last Name"
				onChange={(e)=> this.setState({lastName: e.target.value})}
				style={{ width: '200px' }}
			  />
			<input className="login"
				type="text"
				placeholder="Email"
				onChange={(e)=> this.setState({email: e.target.value})}
				style={{ width: '200px' }}
			  />
			<input className="login"
				type="text"
				placeholder="Username"
				onChange={(e)=> this.setState({username: e.target.value})}
				style={{ width: '200px' }}
			  />
			<input className="login"
				type="text"
				placeholder="Password"
				onChange={(e)=> this.setState({password: e.target.value})}
				style={{ width: '200px' }}
			/>
			<button className="login" onClick={()=>this.registration()}>Register</button>
		</div>
        <script src="https://sbhc.portalhc.com/219008/searchbox/468509"></script>
      </div>
    );
  }
}

export default registration;
