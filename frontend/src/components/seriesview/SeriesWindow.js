import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSeriesViewSeries } from "../../reducers/seriesViewSeries";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import SeriesDetails from "./SeriesDetails";
import seriesService from "../../services/series";
import LoadingAnimation from "../common/LoadingAnimation";
import "./SeriesWindow.css";

const SeriesWindow = () => {
  const { series } = useParams();
  const seriesObj = useSelector((state) => state.seriesViewSeries.series);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSeries = async () => {
      const newSeriesObj = await seriesService.getSeries(series);
      dispatch(setSeriesViewSeries(newSeriesObj));
    };
    fetchSeries();
  }, []);

  const title = seriesObj ? `${seriesObj.name} | Reader` : "Reader";
  const description = seriesObj ? `Read ${seriesObj.name} on Reader` : "";

  return (
    <div className="series-window">
      <Helmet>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
      </Helmet>
      {seriesObj ? (
        <>
          <SeriesDetails />
        </>
      ) : (
        <div className="series-window-loading">
          <LoadingAnimation />
        </div>
      )}
    </div>
  );
};

export default SeriesWindow;
