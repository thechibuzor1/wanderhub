import React, { useEffect, useState } from "react";
import { throttle } from "lodash";
import Modal from "react-modal";
import Boxes from "./Boxes";
import loader from "../assets/95619-webpage-loading-animation.json";
import Lottie from "lottie-react";
import InfiniteScroll from "react-infinite-scroll-component";
const Test = () => {
  const [locations, setLocations] = useState<any[]>([]);
  const apiKey = "5ae2e3f221c38a28845f05b604dad024534557a8d3a1dc608f7f61af";
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 50; // Adjust the page size as per your requirement
  const uniqueXids = new Set<string>();

  const apiGet = async () => {
    setLoading(true);
    let lonMin, lonMax, latMin, latMax;
    let response = [];
    while (response.length === 0) {
      lonMin = getRandomCoordinate(-180, 180);
      lonMax = getRandomCoordinate(-180, 180);
      latMin = getRandomCoordinate(-90, 90);
      latMax = getRandomCoordinate(-90, 90);

      const requestUrl = `https://api.opentripmap.com/0.1/en/places/bbox?lon_min=${lonMin}&lon_max=${lonMax}&lat_min=${latMin}&lat_max=${latMax}&apikey=${apiKey}`;

      try {
        const res = await fetch(requestUrl);
        const data = await res.json();
        response = data.features || [];

        // Pagination
        const itemsPerPage = 10; // Adjust this value as per your requirement
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const newLocations = response
          .slice(startIndex, endIndex)
          .filter((location: any) => !uniqueXids.has(location.properties.xid));

        setLocations((prevLocations) => [...prevLocations, ...newLocations]);
        newLocations.forEach((location: any) =>
          uniqueXids.add(location.properties.xid)
        );
        setCurrentPage((prevPage) => prevPage + 1);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    apiGet();
  }, []);

  // Rest of the code...

  const getRandomCoordinate = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  interface ImageModalProps {
    isOpen: boolean;
    data: any;
    closeModal: () => void;
  }
  type ModalStyles = {
    content: React.CSSProperties;
    image: React.CSSProperties;
    country: React.CSSProperties;
  };

  const customModalStyles: ModalStyles = {
    content: {
      width: "80%",
      height: "80%",
      margin: "auto",
      borderRadius: "16px",
      boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
      background: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
    },
    image: {
      maxWidth: "100%",
      maxHeight: "100%",
      marginTop: "1rem",
    },
    country: {
      fontWeight: "bold",
      marginTop: "1rem",
    },
  };
  if (window.innerWidth < 768) {
    customModalStyles.content.left = "50%";
    customModalStyles.content.top = "50%";
    customModalStyles.content.transform = "translate(-50%, -50%)";
    customModalStyles.content.marginTop = 30;
  }

  const ImageModal: React.FC<ImageModalProps> = ({
    isOpen,
    data,
    closeModal,
  }) => (
    <Modal
      style={customModalStyles}
      isOpen={isOpen}
      onRequestClose={closeModal}
    >
      <p
        onClick={closeModal}
        className="modalClose"
        style={customModalStyles.country}
      >
        close
      </p>
      {data?.preview?.source && (
        <img
          className="modalImage"
          style={customModalStyles.image}
          src={data.preview.source}
          alt="Image"
        />
      )}

      {data?.address?.country && (
        <p className="modalTextHeader" style={customModalStyles.country}>
          {data.name}( {data.address.country} )
        </p>
      )}
      {data?.address?.country_code && (
        <div className="flexHor">
          <p className="modalText" style={customModalStyles.country}>
            Country Code:
          </p>
          <p
            className="modalText"
            style={{ ...customModalStyles.country, marginLeft: "0.5rem" }}
          >
            {data.address.country_code}
          </p>
        </div>
      )}
      {data?.address?.state && (
        <div className="flexHor">
          <p className="modalText" style={customModalStyles.country}>
            state:
          </p>
          <p
            className="modalText"
            style={{ ...customModalStyles.country, marginLeft: "0.5rem" }}
          >
            {data.address.state}
          </p>
        </div>
      )}
      {data?.address?.village && (
        <div className="flexHor">
          <p className="modalText" style={customModalStyles.country}>
            village:
          </p>
          <p
            className="modalText"
            style={{ ...customModalStyles.country, marginLeft: "0.5rem" }}
          >
            {data.address.village}
          </p>
        </div>
      )}
      {data?.wikipedia && (
        <a href={data?.wikipedia} target="_blank">
          <p className="modalText" style={customModalStyles.country}>
            Go to wikipedia
          </p>
        </a>
      )}
    </Modal>
  );
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const closeModal = () => {
    setIsOpenModal(false);
    setModalData([]);
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={locations.length}
        next={apiGet}
        hasMore={!loading}
        loader={<Lottie className="loader" animationData={loader} />}
        endMessage={<p className="modalText">©2023</p>}
        className="scroll-container"
      >
        <div className="row">
          {locations.map((location) => (
            <Boxes
              setModalData={setModalData}
              key={location.properties.xid}
              xid={location}
              setIsOpenModal={setIsOpenModal}
            />
          ))}
        </div>
      </InfiniteScroll>
      <ImageModal
        isOpen={isOpenModal}
        data={modalData}
        closeModal={closeModal}
      />
    </div>
  );
};

export default Test;
