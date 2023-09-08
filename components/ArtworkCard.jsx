import React from "react";
import Link from "next/link";
import { Button, Card } from "react-bootstrap";
import useSWR from "swr";
import Error from "next/error";

export default function ArtworkCard({ objectID }) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  const { primaryImageSmall, title, objectDate, classification, medium } = data;

  return (
    <Card>
      <Card.Img
        variant="top"
        src={
          primaryImageSmall ||
          "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
        }
      />
      <Card.Body>
        <Card.Title>{title || "N/A"}</Card.Title>
        <Card.Text>
          <b>Date:</b> {objectDate || "N/A"}
          <br />
          <b>Classification:</b> {classification || "N/A"}
          <br />
          <b>Medium:</b> {medium || "N/A"}
        </Card.Text>
        <Link href={`/artwork/${objectID}`} passHref>
          <Button variant="primary">
            <b>ID: </b>
            {objectID}
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
