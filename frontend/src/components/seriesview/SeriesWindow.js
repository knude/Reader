import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSeriesViewSeries } from "../../reducers/seriesViewSeries";
import { useParams } from "react-router-dom";
import SeriesDetails from "./SeriesDetails";
import seriesService from "../../services/series";
import LoadingAnimation from "../common/LoadingAnimation";
import "./SeriesWindow.css";

const SeriesWindow = () => {
  const { series } = useParams();
  const seriesObj = useSelector((state) => state.seriesViewSeries.series);
  const dispatch = useDispatch();

  document.title = seriesObj ? `${seriesObj.name} | Reader` : "Reader";

  useEffect(() => {
    const fetchSeries = async () => {
      const newSeriesObj = await seriesService.getSeries(series);
      dispatch(setSeriesViewSeries(newSeriesObj));
    };
    fetchSeries();
  }, []);

  return (
    <div className="series-window">
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
