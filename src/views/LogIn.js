import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { signIn, getUserFromSession } from "../utilities/SignIn-utils";
import { AppContext } from "../context/appContext";

export default function LogIn() {
  const history = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);

  let { setUser } = useContext(AppContext);

  useEffect(() => {
    setDisabled(formState.email && formState.password ? false : true);
  }, [formState]);

  useEffect(() => {
    const autoLogin = async () => {
      await signIn({ email: "w@w", password: "qqq" });
      // get session info (user)
      let user = await getUserFromSession();
      setUser(user);
    }
    autoLogin()
  }, []);

  const handleChange = (event) => {
    let propertyName = event.target.name;
    setFormState({
      ...formState,
      [propertyName]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    // LOGIN
    // make a call to the server with this info and authenticate!
    e.preventDefault();
    await signIn(formState);
    // get session info (user)
    let user = await getUserFromSession();
    setUser(user);
  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Log In</h1>
      <Form className="border" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            name="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            name="password"
            value={formState.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Log In</Button>
        </div>
        <div className="mb-3">
          New customer?{" "}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  );
}