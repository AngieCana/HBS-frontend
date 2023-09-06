import { Link, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { signUp } from "../utilities/SignUp-utils";
import React, { Component } from "react"

// export default function SignUp() {

 
  export default class SignUp extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "",
        email: "",
        password: "",
        confirm: "",
        error: "",
      };

      const { search } = this.props.location;
      const redirectInUrl = new URLSearchParams(search).get("redirect");
      this.redirect = redirectInUrl ? redirectInUrl : "/";
    }
  
    handleChange = (event) => {
      let propertyName = event.target.name;
      this.setState({
        [propertyName]: event.target.value,
        error: "",
      });
    };
  
    handleSubmit = async (event) => {
      event.preventDefault(); // do not refresh the page
      console.log("submitting!");
      // check if password has a special character (error handling)
      let data = { ...this.state };
      delete data.confirm;
      delete data.error;
  
      let response = await signUp(data);
      console.log(response);
  
      // make an async call to the server with the data
      // in a different file - we will bring in that function here
    };
  
    render() {
      return (
        <Container className="small-container">
          <Helmet>
            <title>Sign Up</title>
          </Helmet>
          <h1 className="my-3">Sign Up</h1>
          <Form className="border" onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="Email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                placeholder="Password"
              />
            </Form.Group>
            <div className="mb-3">
              <Button type="submit">Sign Up</Button>
            </div>
            <div className="mb-3">
              Already have an account?{" "}
              <Link to={`/signin?redirect=${this.redirect}`}>Log In</Link>
            </div>
          </Form>
        </Container>
      );
    }
  }