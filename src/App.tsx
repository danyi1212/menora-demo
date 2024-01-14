import React from "react";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useEffect, useState } from "react";
import "./App.css";
import { db } from "./services/firestore";

function App() {
  const [value, loading, error] = useCollection(collection(db, "candles"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const turnOnCandle = async () => {
    const myDoc = doc(db, "candles", "menora");
    await setDoc(myDoc, {
      number: increment(1),
    });
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error {error.message}</h1>;

  return (
    <div className="App">
      <header
        className="App-header"
        onClick={turnOnCandle}
        style={value?.size ? {
          background: "url(./candle_on.webp) no-repeat center fixed",
          width: "70%",
          height: "70%",
        } : {
          background: "url(./candle.webp) no-repeat center fixed",
          width: "70%",
          height: "70%",
        }}
      >
        <h3 style={{ color: "red" }}>{error}</h3>
      </header>
    </div>
  );
}

export default App;
