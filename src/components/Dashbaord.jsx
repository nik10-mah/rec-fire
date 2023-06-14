import React from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

export const Dashbaord = () => {
  const { currentUser, logout } = useAuth();
  return (
    <Card>
      <Card.Header className="bg-danger text-white">
        <h3>Dashboard</h3>
      </Card.Header>
      <Card.Body>
        <Container>
          <Row>
            <Col xs={12} md={12}>
              <h4>
                Welcome &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Badge bg="success">
                  {currentUser.displayName || currentUser.email}
                </Badge>
              </h4>
            </Col>
            <Col xs={6} md={3}>
              <Image
                src={
                  currentUser.photoURL ||
                  "https://image.pngaaa.com/189/734189-middle.png"
                }
                thumbnail
              />
            </Col>
            <Col xs={6} md={9}>
              <ListGroup>
                <ListGroupItem>
                  Email: <Badge bg="info">{currentUser.email}</Badge>
                </ListGroupItem>

                <ListGroupItem>
                  Logged In via:{" "}
                  <Badge bg="warning">
                    {currentUser.providerData[0].providerId}
                  </Badge>
                </ListGroupItem>
                <ListGroupItem>
                  Login Time:{" "}
                  <Badge>{currentUser.metadata.lastSignInTime}</Badge>
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </Card.Body>
      <Card.Footer className="bg-white d-flex justify-content-end">
        <Button variant="link" className="text-secondary" onClick={logout}>
          Logout
        </Button>
      </Card.Footer>
    </Card>
  );
};
