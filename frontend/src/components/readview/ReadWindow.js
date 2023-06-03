import "./ReadWindow.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import imageService from "../../services/imageService";

import NavigationBar from "./NavigationBar";
import DisplayWindow from "./DisplayWindow";

const ReadWindow = () => {
  const { series } = useParams();
  const [chapter, setChapter] = useState(useParams().chapter.split("-").pop());
  const [page, setPage] = useState(parseInt(useParams().page));
  const [imageURL, setImageURL] = useState("");
  const [seriesObj, setSeriesObj] = useState(null);

  const navigate = useNavigate();

  const handleIncrement = (increment) => {
    let newPage = page;
    let newChapter = chapter;

    if (parseInt(chapter) === 1 && increment === -1 && page === 1) return; // if on first page of first chapter, do nothing
    if (
      parseInt(chapter) === seriesObj.chapters.length &&
      increment === 1 &&
      page === seriesObj.chapters[chapter - 1].images.length
    )
      return; // if on last page of last chapter, do nothing

    if (page === 1 && increment === -1 && parseInt(chapter) !== 1) {
      newPage = seriesObj.chapters[chapter - 2].images.length;
      newChapter = parseInt(chapter) - 1;
    } else if (
      page === seriesObj.chapters[chapter - 1].images.length &&
      increment === 1
    ) {
      newPage = 1;
      newChapter = parseInt(chapter) + 1;
    } else {
      newPage += increment;
    }

    navigate(`/${series}/chapter-${newChapter}/${newPage}`, {
      replace: true,
    });
    setPage(newPage);
    setChapter(newChapter);
  };

  const handleTitleClick = () => {
    navigate(`/${series}`);
  };

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

  useEffect(() => {
    const getSeriesObj = async () => {
      const seriesObj = await imageService.getSeries(series);
      seriesObj.chapters = seriesObj.chapters.sort(
        (a, b) => a.number - b.number
      );
      setSeriesObj(seriesObj);
    };
    getSeriesObj();
  }, [series]);

  const title = seriesObj ? seriesObj.name : "";

  return (
    <div className="read-window">
      <NavigationBar title={title} handleTitleClick={handleTitleClick} />
      <DisplayWindow imageURL={imageURL} handleIncrement={handleIncrement} />
    </div>
  );
};

export default ReadWindow;
