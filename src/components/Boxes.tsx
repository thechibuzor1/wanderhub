import React, { useEffect, useState } from "react";
import "./BoxCss.css";
import Lottie from "lottie-react";
import loader from "../assets/95619-webpage-loading-animation.json";

const Boxes = (props: any) => {
  const [data, setData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const apiKey = "5ae2e3f221c38a28845f05b604dad024534557a8d3a1dc608f7f61af";
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    function fetchImage(xid: string) {
      return new Promise(function (resolve, reject) {
        setLoading(true);
        let otmAPI =
          `https://api.opentripmap.com/0.1/en/places/xid/${xid}?` +
          "&apikey=" +
          apiKey;

        fetch(otmAPI)
          .then((response) => response.json())
          .then((data) => {
            setData(data.preview.source);
            setModalData(data);
          })
          .then(() => setLoading(false))
          .catch(function (err) {
            setLoading(false);
            console.log("Fetch Error :-S", err);
          });
      });
    }
    fetchImage(props.xid.properties.xid);
  }, [props.xid.properties.xid]);

 
  /* const imgUrl = data.length !== 0 ? data.preview.source : ""; */

  return (
    <div
      className="boxesCon"
      onClick={() => {
        props.setModalData(modalData);
        props.setIsOpenModal(true);
      }}
    >
      {loading ? (
        <Lottie className="loader" animationData={loader} />
      ) : data !== "" ? (
        <div className="boxBody">
          <img className="boxImg" src={data} alt="" />
          <p>{props?.xid?.properties?.name}</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Boxes;
