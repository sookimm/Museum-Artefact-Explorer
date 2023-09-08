import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { registerUser } from "@/lib/authenticate";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Register(props) {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [warning, setWarning] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== password2) {
      setWarning("Passwords do not match");
      return;
    }

    try {
      await registerUser(user, password, password2);
      router.push("/login");
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Register</h2>
          <p>Register for an account:</p>
          {warning && (
            <>
              <br />
              <Alert variant="danger">{warning}</Alert>
            </>
          )}
        </Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User:</Form.Label>
          <Form.Control
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </Form.Group>
        <br />
        <Button variant="dark" className="pull-right" type="submit">
          Register
        </Button>
        <br />
        <br />
        <p className="form-text">
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </Form>
    </>
  );
}
