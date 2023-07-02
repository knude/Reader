import SeriesBubble from "./SeriesBubble";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setSearch, setTag } from "../../reducers/search";
import { setFilteredSeries } from "../../reducers/filteredSeries";
import "./SeriesBubblesContainer.css";
import { useEffect } from "react";

const SeriesBubblesContainer = () => {
  const { shownSeries } = useSelector((state) => state.shownSeries);
  const { series } = useSelector((state) => state.series);
  const searchParams = new URLSearchParams(useLocation().search);
  const dispatch = useDispatch();

  const handleTag = (tag) => {
    searchParams.set("tag", tag);
    dispatch(setTag(tag));
    dispatch(setSearch(""));
    if (series) {
      const filteredSeries = series.filter((seriesItem) =>
        seriesItem.tags.includes(tag)
      );
      dispatch(setFilteredSeries(filteredSeries));
    }
  };

  useEffect(() => {
    const tag = searchParams.get("tag");
    if (tag) handleTag(tag);
  }, [searchParams.get("tag")]);

  return (
    <div className="series-bubbles-container">
      {shownSeries.map((series) => (
        <SeriesBubble {...series} handleTag={handleTag} />
      ))}
    </div>
  );
};

export default SeriesBubblesContainer;
