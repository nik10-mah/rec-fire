import React from 'react';
// import "./App.css";
import { Container } from "react-bootstrap";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import { Dashbaord } from "./Dashbaord";
import { Login } from "./Login";
import { PrivateRoute } from "./PrivateRoute";
import {Register} from "./Register";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "550px" }}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path="/" element={<PrivateRoute>
                <Dashbaord/>
              </PrivateRoute>}>
              </Route>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register />}/>
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
