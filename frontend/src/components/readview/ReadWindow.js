import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import imageService from "../../services/imageService";

import NavigationBar from "./NavigationBar";
import DisplayWindow from "./DisplayWindow";

import "./ReadWindow.css";

const ReadWindow = () => {
  const { series, chapter: chapterParam, page: pageParam } = useParams();
  const [chapter, setChapter] = useState(
    parseInt(chapterParam.split("-").pop())
  );
  const [page, setPage] = useState(parseInt(pageParam));
  const [imageURL, setImageURL] = useState("");
  const [seriesObj, setSeriesObj] = useState(null);

  const navigate = useNavigate();

  const handleIncrement = (increment) => {
    if (!seriesObj) return;

    let newPage = page;
    let newChapter = chapter;

    if (chapter === 1 && increment === -1 && page === 1) return;

    const lastChapter = seriesObj.chapters.length;
    const lastPage = seriesObj.chapters[chapter - 1].images.length;

    if (chapter === lastChapter && increment === 1 && page === lastPage) return;

    if (page === 1 && increment === -1 && chapter !== 1) {
      newPage = seriesObj.chapters[chapter - 2].images.length;
      newChapter = chapter - 1;
    } else if (page === lastPage && increment === 1) {
      newPage = 1;
      newChapter = chapter + 1;
    } else {
      newPage += increment;
    }

    navigate(`/${series}/chapter-${newChapter}/${newPage}`, {
      replace: true,
    });
    setPage(newPage);
    setChapter(newChapter);
  };

  const handleChapterChange = (event) => {
    const newChapter = parseInt(event.target.value);
    navigate(`/${series}/chapter-${newChapter}/1`, { replace: true });
    setChapter(newChapter);
    setPage(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await imageService.getImage(series, chapter, page);
        setImageURL(data);
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

  const chapters = seriesObj ? seriesObj.chapters : [];

  return (
    <div className="read-window">
      <NavigationBar
        title={title}
        titleLocation={`/${series}`}
        selectedChapter={chapter}
        chapters={chapters}
        handleChapterChange={handleChapterChange}
      />
      <DisplayWindow imageURL={imageURL} handleIncrement={handleIncrement} />
    </div>
  );
};

export default ReadWindow;
