import React, { useEffect } from "react";
import "./BoxCss.css";

const Boxes = (props: any) => {
  const [data, setData] = React.useState<any>([]);
  const apiKey = "5ae2e3f221c38a28845f05b604dad024534557a8d3a1dc608f7f61af";
  function fetchImage(xid: string) {
    return new Promise(function (resolve, reject) {
      let otmAPI =
        `https://api.opentripmap.com/0.1/en/places/xid/${xid}?` +
        "&apikey=" +
        apiKey;

      fetch(otmAPI)
        .then((response) => response.json())
        .then((data) => setData(data.preview.source))
        .catch(function (err) {
          console.log("Fetch Error :-S", err);
        });
    });
  }
  useEffect(() => {
    fetchImage(props.xid.properties.xid);
  }, []);

  /* const imgUrl = data.length !== 0 ? data.preview.source : ""; */

  return (
    <div className="boxBody">
      <img className="boxImg" src={data} alt="" />
    </div>
  );
};

export default Boxes;
