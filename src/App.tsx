import { useState } from "react";

import "./App.css";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

function App() {
  const position = { lat: 53.54992, lng: 10.00678 };
  return (
    <main className="">
      <h1 className="mt-10 text-center font-semibold text-2xl">Locations</h1>

      <APIProvider apiKey={"YOUR API KEY HERE"}>
        <Map defaultCenter={position} defaultZoom={10}>
          <Marker position={position} />
        </Map>
      </APIProvider>
    </main>
  );
}

export default App;
