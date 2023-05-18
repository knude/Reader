import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import imageService from "../services/imageService";

import "./DisplayWindow.css";
import Image from "./Image";
import DisplayMargin from "./DisplayMargin";

const DisplayWindow = () => {
  const [imageURL, setImageURL] = useState("");
  const { series, chapter } = useParams();
  const [page, setPage] = useState(parseInt(useParams().page));

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await imageService.get(`${series}/${chapter}/${page}`);
        const reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onloadend = () => {
          setImageURL(reader.result);
        };
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [series, chapter, page]);

  const handleIncrement = (increment) => {
    const newPage = page + increment;
    navigate(`/${series}/${chapter}/${newPage}`);
    setPage(newPage);
  };

  return (
    <div className="display-window">
      <DisplayMargin
        arrowType="left-arrow"
        handleIncrement={() => handleIncrement(-1)}
      />
      <Image class="item" alt="Alt" url={imageURL} />
      <DisplayMargin
        arrowType="right-arrow"
        handleIncrement={() => handleIncrement(1)}
      />
    </div>
  );
};

export default DisplayWindow;
