import SeriesBubble from "./SeriesBubble";
import Popup from "./Popup";
import "./SeriesBubblesContainer.css";

const SeriesBubblesContainer = () => {
  return (
    <div className="series-bubbles-container">
      <SeriesBubble
        title="Super Long Series Name That Will Probably Break The Layout"
        backgroundImage="https://i.imgur.com/4xQ99WS.jpg"
      />
      <SeriesBubble
        title="Comic"
        backgroundImage="https://i.imgur.com/ejPzebr.jpg"
      />
      <Popup />
    </div>
  );
};

export default SeriesBubblesContainer;
