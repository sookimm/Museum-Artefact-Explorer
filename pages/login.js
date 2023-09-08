import React, { useState } from "react";
import { useAtom } from "jotai";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { authenticateUser } from "@/lib/authenticate";
import { useRouter } from "next/router";
import { favouritesAtom, searchHistoryAtom } from "@/store";
import { getHistory, getFavourites } from "@/lib/userData";
import Link from "next/link";

export default function Login(props) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [warning, setWarning] = useState("");

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const router = useRouter();

  async function updateAtoms() {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await authenticateUser(user, password);
      await updateAtoms();
      setWarning("");
      router.push("/favourites");
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Login</h2>
          <p>Enter your login information below:</p>
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
        <Button variant="dark" className="pull-right" type="submit">
          Login
        </Button>
        <br />
        <br />
        <p className="form-text">
          Don&lsquo;t have an account?{" "}
          <Link className="form-link" href="/register">
            Sign up
          </Link>
        </p>
      </Form>
    </>
  );
}
