import SeriesBubble from "./SeriesBubble";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSearch, setTag } from "../../reducers/search";
import "./SeriesBubblesContainer.css";

const SeriesBubblesContainer = () => {
  const { shownSeries } = useSelector((state) => state.shownSeries);
  const dispatch = useDispatch();

  const handleTag = (tag) => {
    dispatch(setTag(tag));
    dispatch(setSearch(""));
  };

  return (
    <div className="series-bubbles-container">
      {shownSeries.map((series) => (
        <SeriesBubble {...series} handleTag={handleTag} />
      ))}
    </div>
  );
};

export default SeriesBubblesContainer;
