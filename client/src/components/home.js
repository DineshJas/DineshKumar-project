import React, { Component } from "react";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      users: [],
      signUpError: "",
      signInError: "",
      signUpUsername: "",
      signUpPassword: "",
      signUpFirstname: "",
      signUpLastname: "",
      signInUsername: "",
      signInPassword: ""
    };
    this.ontextBoxChangeSignInUsername = this.ontextBoxChangeSignInUsername.bind(
      this
    );
    this.ontextBoxChangeSignInPassword = this.ontextBoxChangeSignInPassword.bind(
      this
    );
    this.ontextBoxChangeSignUpUsername = this.ontextBoxChangeSignUpUsername.bind(
      this
    );
    this.ontextBoxChangeSignUpPassword = this.ontextBoxChangeSignUpPassword.bind(
      this
    );
    this.ontextBoxChangeSignUpFirstname = this.ontextBoxChangeSignUpFirstname.bind(
      this
    );
    this.ontextBoxChangeSignUpLastname = this.ontextBoxChangeSignUpLastname.bind(
      this
    );
    this.onSignUp = this.onSignUp.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }
  //   componentDidMount() {
  //     this.callApi()
  //       .then(res => this.setState({ response: res.express }))
  //       .catch(err => console.log(err));
  //   }

  //   callApi = async () => {
  //     const response = await fetch("/home");
  //     const body = await response.json();

  //     if (response.status !== 200) throw Error(body.message);

  //     return body;
  //   };
  componentDidMount() {
    fetch("/home")
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            isSignedIn: true,
            users: json.message
          });
        } else {
          this.setState({ isSignedIn: false });
        }
      });
  }
  ontextBoxChangeSignInUsername(event) {
    this.setState({
      signInUsername: event.target.value
    });
  }
  ontextBoxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value
    });
  }
  ontextBoxChangeSignUpUsername(event) {
    this.setState({
      signUpUsername: event.target.value
    });
  }
  ontextBoxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value
    });
  }
  ontextBoxChangeSignUpFirstname(event) {
    this.setState({
      signUpFirstname: event.target.value
    });
  }
  ontextBoxChangeSignUpLastname(event) {
    this.setState({
      signUpLastname: event.target.value
    });
  }
  onSignUp() {
    const {
      signUpUsername,
      signUpPassword,
      signUpFirstname,
      signUpLastname
    } = this.state;
    fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signUpUsername,
        password: signUpPassword,
        firstname: signUpFirstname,
        lastname: signUpLastname
      })
    })
      .then(res => res.json)
      .then(json => {
        this.setState({
          signUpError: json.message,
          signUpUsername: "",
          signUpPassword: "",
          signUpFirstname: "",
          signUpLastname: ""
        });
      });
  }
  onSignIn() {
    const { signInUsername, signInPassword } = this.state;
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword
      })
    })
      .then(res => res.json)
      .then(json => {
        if (json.success) {
          this.setState({
            users: json.message,
            signInUsername: "",
            signInPassword: ""
          });
        } else {
          this.setState({
            signInError: json.message,
            signInUsername: "",
            signInPassword: ""
          });
        }
      });
  }
  onLogout() {
    fetch("/logout");
    this.setState({
      isSignedIn: false
    });
  }
  render() {
    const {
      isSignedIn,
      signUpError,
      signInError,
      signUpUsername,
      signUpPassword,
      signUpFirstname,
      signUpLastname,
      signInUsername,
      signInPassword
    } = this.state;
    if (!isSignedIn) {
      return (
        <div>
          <div>
            {signInError ? <p>{signInError}</p> : null}
            <p>Sign In</p>
            <input
              type="text"
              placeholder="username"
              value={signInUsername}
              onChange={this.ontextBoxChangeSignInUsername}
            />
            <br />
            <input
              type="password"
              placeholder="password"
              value={signInPassword}
              onChange={this.ontextBoxChangeSignInPassword}
            />
            <button onClick={this.onSignIn}>SignIn</button>
            <br />
            <br />
            {signUpError ? <p>{signUpError}</p> : null}
            <p>Sign up</p>
            <input
              type="text"
              placeholder="username"
              value={signUpUsername}
              onChange={this.ontextBoxChangeSignUpUsername}
            />
            <input
              type="password"
              placeholder="password"
              value={signUpPassword}
              onChange={this.ontextBoxChangeSignUpPassword}
            />
            <input
              type="text"
              placeholder="firstname"
              value={signUpFirstname}
              onChange={this.ontextBoxChangeSignUpFirstname}
            />
            <input
              type="text"
              placeholder="lastname"
              value={signUpLastname}
              onChange={this.ontextBoxChangeSignUpFirstname}
            />
            <button onClick={this.onSignUp}>SignUp</button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <p>welcome to the registered user details</p>
          <button onClick={this.onLogout}>logout</button>
          <div>
            <p>users</p>
            <ul>
              {this.state.users.map(function(user, index) {
                return <li key={index}>{user}</li>;
              })}
            </ul>
          </div>
        </div>
      );
    }
  }
}
export default Home;
