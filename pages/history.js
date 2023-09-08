import React from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { Button, Card, ListGroup } from "react-bootstrap";
import styles from "@/styles/History.module.css";
import { removeFromHistory } from "@/lib/userData";

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  if (!searchHistory) return null;

  const historyClicked = (e, index) => {
    e.stopPropagation();
    router.push(`/artwork?${searchHistory[index]}`);
  };

  async function removeHistoryClicked(e, index) {
    e.stopPropagation();
    setSearchHistory(await removeFromHistory(searchHistory[index]));
  }

  let parsedHistory = [];

  searchHistory.forEach((h) => {
    const params = new URLSearchParams(h);
    const entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  return (
    <>
      {parsedHistory.length === 0 ? (
        <Card>
          <Card.Body>
            <Card.Title>Nothing Here</Card.Title>
            <Card.Text>Try searching for some artwork</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <ListGroup>
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item
              onClick={(e) => historyClicked(e, index)}
              className={styles.historyListItem}
              key={index}
            >
              {Object.keys(historyItem).map((key) => (
                <React.Fragment key={key}>
                  {key}: <strong>{historyItem[key]}</strong>&nbsp;
                </React.Fragment>
              ))}
              <Button
                className="float-end"
                variant="danger"
                size="sm"
                onClick={(e) => removeHistoryClicked(e, index)}
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
}
