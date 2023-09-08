import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Button, Card } from "react-bootstrap";
import Error from "next/error";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";

export default function ArtworkCardDetail({ objectID }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);
  const { data, error } = useSWR(
    objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null
  );

  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList]);

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  const {
    primaryImage,
    primaryImageSmall,
    title,
    objectDate,
    classification,
    medium,
    artistDisplayName,
    creditLine,
    dimensions,
    artistWikidata_URL,
  } = data;

  async function handleFavouritesClick() {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(objectID));
    } else {
      setFavouritesList(await addToFavourites(objectID));
    }
  }
  return (
    <Card>
      {primaryImageSmall && <Card.Img variant="top" src={primaryImage} />}
      <Card.Body>
        <Card.Title>{title || "N/A"}</Card.Title>
        <Card.Text>
          <b>Date:</b> {objectDate || "N/A"}
          <br />
          <b>Classification:</b> {classification || "N/A"}
          <br />
          <b>Medium:</b> {medium || "N/A"}
          <br />
          <br />
          <b>Artist:</b> {artistDisplayName || "N/A"} ({" "}
          {artistDisplayName && (
            <a href={artistWikidata_URL} target="_blank" rel="noreferrer">
              wiki
            </a>
          )}{" "}
          )
          <br />
          <b>Credit Line:</b> {creditLine || "N/A"}
          <br />
          <b>Dimensions:</b> {dimensions || "N/A"}
          <br />
        </Card.Text>
        <Button
          variant={showAdded ? "primary" : "outline-primary"}
          onClick={handleFavouritesClick}
        >
          {showAdded ? "+ Favourite (added)" : "+ Favourite"}
        </Button>
      </Card.Body>
    </Card>
  );
}
