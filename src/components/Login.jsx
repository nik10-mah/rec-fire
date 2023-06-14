import React, { useState } from "react";
import { Alert, Button, Card, Form, Stack } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [data, setData] = useState({});
  const { login, googleSignIn } = useAuth();
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  /**
   * Basic Sign in using email and password
   * @param {Event} e: html button event 
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(data.email, data.password);  
      navigate("/");
    } catch (error) {
      setErrorMsg(error.message);
    }
    
  };

  /**
   * Signs in user via his google account
   * @param {Event} e: html button event 
   */
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();  
      navigate("/");
    } catch (error) {
      setErrorMsg(error.message);
    }
    
  }

  return (
    <Card>
      <Card.Header className="bg-danger text-white">
      <h3>Login</h3>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
        {errorMsg && <Alert variant="danger" onClose={() => setErrorMsg('')} dismissible>{errorMsg}</Alert>}
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              required
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              required
              onChange={handleChange}
            />
          </Form.Group>
          <Stack gap={3} className="mt-2">
            <Button variant="success" type="submit" className="w-100 ">
              Login
            </Button>
            <hr data-content="OR"/>
            <Button variant="primary" type="button" className="w-100" onClick={handleGoogleSignIn}>
              Login with Google
            </Button>
          </Stack>
        </Form>
      </Card.Body>
      <Card.Footer className="bg-white d-flex justify-content-end">
        Don't have an account yet? <Link to={"/register"}>Create new one?</Link>
      </Card.Footer>
    </Card>
  );
};
