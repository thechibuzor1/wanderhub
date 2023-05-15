import React, { useEffect, useState } from "react";
import axios from "axios";
import Boxes from "./Boxes";
import NavBar from "./NavBar";

const Test = () => {
  const [locations, setLocations] = useState([]);
  const [photodata, setPhotodata] = useState("");
  const apiKey = "5ae2e3f221c38a28845f05b604dad024534557a8d3a1dc608f7f61af";
  const xid = "N1410597963";

  useEffect(() => {
    function apiGet() {
      return new Promise(function (resolve, reject) {
        let lon_min = "-10";
        let lon_max = "10";
        let lat_min = "40";
        let lat_max = "50";
        let limit = 100;
        let otmAPI =
          "https://api.opentripmap.com/0.1/en/places/bbox?" +
          `lon_min=${lon_min}&lat_min=${lat_min}&lon_max=${lon_max}&lat_max=${lat_max}&limit=${limit}&format=geojson` +
          "&apikey=" +
          apiKey;

        fetch(otmAPI)
          .then((response) => response.json())
          .then((data) => setLocations(data.features))
          .catch(function (err) {
            console.log("Fetch Error :-S", err);
          });
      });
    }
    apiGet();
  }, []);

  /*  function fetchImage(xid: string) {
    return new Promise(function (resolve, reject) {
      let otmAPI =
        `https://api.opentripmap.com/0.1/en/places/xid/${xid}?` +
        "&apikey=" +
        apiKey;

      fetch(otmAPI)
        .then((response) => response.json())
        .then((data) => console.log(data.preview.source))
        .catch(function (err) {
          console.log("Fetch Error :-S", err);
        });
    });
  }

  fetchImage(xid); */

  return (
    <div>
      <>
        <div className="row">
          {locations.map((location) => (
            <Boxes key={location} xid={location} />
          ))}
        </div>
      </>
    </div>
  );
};

export default Test;
