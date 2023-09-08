import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Container,
  Nav,
  Navbar,
  Form,
  NavDropdown,
} from "react-bootstrap";
import Link from "next/link";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from "@/lib/userData";
import { readToken, removeToken } from "@/lib/authenticate";

export default function MainNav() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  let token = readToken();

  function logout() {
    setIsExpanded(false);
    removeToken();
    router.push("/");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsExpanded(false);
    let queryString = `title=true&q=${searchValue}`;
    setSearchHistory(await addToHistory(queryString));
    router.push(`/artwork?${queryString}`);
  }

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLinkClick = () => {
    setIsExpanded(false);
  };

  return (
    <>
      <Navbar
        expand="lg"
        expanded={isExpanded}
        className="fixed-top navbar-dark bg-primary"
      >
        <Container>
          <Navbar.Brand>Sooyeon Kim</Navbar.Brand>
          <Navbar.Toggle
            onClick={handleToggle}
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link href="/" passHref legacyBehavior>
                <Nav.Link
                  active={router.pathname === "/"}
                  onClick={handleLinkClick}
                >
                  Home
                </Nav.Link>
              </Link>
              {token && (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === "/search"}
                    onClick={handleLinkClick}
                  >
                    Advanced Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>
            &nbsp;
            {token && (
              <Form className="d-flex" onSubmit={handleSubmit}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={searchValue}
                  onChange={handleSearchChange}
                />
                <Button variant="success" type="submit">
                  Search
                </Button>
              </Form>
            )}
            &nbsp;
            <Nav>
              {token ? (
                <NavDropdown title={token.userName} id="basic-nav-dropdown">
                  <Link href="/favourites" passHref legacyBehavior>
                    <NavDropdown.Item onClick={handleLinkClick}>
                      Favourites
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/history" passHref legacyBehavior>
                    <NavDropdown.Item onClick={handleLinkClick}>
                      Search History
                    </NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav>
                  <Link href="/login" passHref legacyBehavior>
                    <Nav.Link
                      onClick={handleLinkClick}
                      active={router.pathname === "/login"}
                    >
                      Login
                    </Nav.Link>
                  </Link>
                  <Link href="/register" passHref legacyBehavior>
                    <Nav.Link
                      onClick={handleLinkClick}
                      active={router.pathname === "/register"}
                    >
                      Register
                    </Nav.Link>
                  </Link>
                </Nav>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br /> <br />
    </>
  );
}
