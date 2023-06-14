import React, { useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(' sub mit');
    if (data.password !== data.confirmPassword) {
      return setError("Passwords do not match");
    }
    await register(data.email, data.password);
    navigate("/");
  };

  return (
    <Card>
      <Card.Header>Register</Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
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
          <Form.Group id="confirm-password">
            <Form.Label>Comfirm Password</Form.Label>
            <Form.Control
              name="confirmPassword"
              type="password"
              required
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" className="w-100 mt-2" type="submit">
          Submit
        </Button>
        </Form>
      </Card.Body>
      <Card.Footer>
        
        Already have an account? <Link to={'/login'}>Login</Link>
      </Card.Footer>
    </Card>
  );
};
