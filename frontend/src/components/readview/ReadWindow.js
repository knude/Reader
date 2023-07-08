import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import seriesService from "../../services/series";
import NavigationBar from "./NavigationBar";
import DisplayWindow from "./DisplayWindow";

import "./ReadWindow.css";

const ReadWindow = () => {
  const {
    series: seriesParam,
    chapter: chapterParam,
    page: pageParam,
  } = useParams();
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
    const currentLastPage = currentChapter.images.length;

    if (!isForward && newPage > 1) {
      newPage--;
    } else if (!isForward && newChapter > chapters[0].number) {
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

    if (isForward && newPage < currentLastPage) {
      newPage++;
      if (currentLastPage > newPage + 2) {
        prefetchImages(chapter, newPage + 1, newPage + 2);
      }
    } else if (isForward && newChapter < chapters[chapters.length - 1].number) {
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
        prefetchImages(newChapter, newPage + 1, newPage + 2);
      }
    }

    if (newPage === page && newChapter === chapter) return;

    setImageURL("");
    navigate(`/${seriesParam}/chapter-${newChapter}/${newPage}`, {
      replace: true,
    });
    setPage(newPage);
    setChapter(newChapter);
  };

  const handleChapterChange = (event) => {
    const newChapter = parseInt(event.target.value);
    navigate(`/${seriesParam}/chapter-${newChapter}/1`, { replace: true });
    setChapter(newChapter);
    setPage(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await seriesService.getImage(seriesParam, chapter, page);
        setImageURL(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [seriesParam, chapterParam, pageParam, setImageURL]);

  useEffect(() => {
    const getSeriesObj = async () => {
      const seriesObj = await seriesService.getSeries(seriesParam);
      seriesObj.chapters = seriesObj.chapters.sort(
        (a, b) => a.number - b.number
      );
      setSeriesObj(seriesObj);
    };
    getSeriesObj();
  }, [seriesParam]);

  const prefetchImages = async (chapter, firstPage, lastPage) => {
    for (let i = firstPage; i <= lastPage; i++) {
      const img = new Image();
      const data = await seriesService.getImage(seriesParam, chapter, i);
      img.src = data;
    }
  };

  const title = seriesObj ? seriesObj.name : "";
  const metaTitle = `Chapter ${chapter} | ${title} | Reader`;
  const metaDescription = `Read ${title} Chapter ${chapter} Online`;

  const chapters = seriesObj ? seriesObj.chapters : [];

  return (
    <div className="read-window">
      <Helmet>
        <title>{metaTitle}</title>
        <meta property="og:title" content={<title>{metaTitle}</title>} />
        <meta name="description" content={metaDescription} />
        <meta property="og:description" content={metaDescription} />
      </Helmet>
      <NavigationBar
        title={title}
        titleLocation={`/${seriesParam}`}
        selectedChapter={chapter}
        chapters={chapters}
        handleChapterChange={handleChapterChange}
      />
      <DisplayWindow
        imageURL={imageURL}
        setImageURL={setImageURL}
        handleIncrement={handleIncrement}
      />
    </div>
  );
};

export default ReadWindow;
