import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import seriesService from "../../services/series";

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

    const isForward = increment === 1;
    let newPage = page;
    let newChapter = chapter;
    const currentChapter = seriesObj.chapters.find(
      (chapterObj) => chapterObj.number === chapter
    );
    const chapters = seriesObj.chapters;

    if (!isForward) {
      if (newPage > 1) newPage--;
      else if (newChapter > chapters[0].number) {
        let previousChapter = null;
        for (let i = 0; i < chapters.length; i++) {
          if (
            chapters[i].number < newChapter &&
            (!previousChapter || chapters[i].number > previousChapter.number)
          ) {
            previousChapter = chapters[i];
          }
        }

        if (previousChapter) {
          newChapter = previousChapter.number;
          newPage = previousChapter.images.length;
        }
      }
    } else if (isForward) {
      if (newPage < currentChapter.images.length) newPage++;
      else if (newChapter < chapters[chapters.length - 1].number) {
        let nextChapter = null;
        for (let i = 0; i < chapters.length; i++) {
          if (
            chapters[i].number > newChapter &&
            (!nextChapter || chapters[i].number < nextChapter.number)
          ) {
            nextChapter = chapters[i];
          }
        }

        if (nextChapter) {
          newChapter = nextChapter.number;
          newPage = 1;
        }
      }
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
        const data = await seriesService.getImage(series, chapter, page);
        setImageURL(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [series, chapter, page]);

  useEffect(() => {
    const getSeriesObj = async () => {
      const seriesObj = await seriesService.getSeries(series);
      seriesObj.chapters = seriesObj.chapters.sort(
        (a, b) => a.number - b.number
      );
      setSeriesObj(seriesObj);
    };
    getSeriesObj();
  }, [series]);

  const title = seriesObj ? seriesObj.name : "";

  document.title = `Chapter ${chapter} | ${title} | Reader`;

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
