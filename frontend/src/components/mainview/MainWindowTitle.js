import "./MainWindowTitle.css";

const MainWindowTitle = ({ title }) => {
  const titleWords = title.split(" ");
  return (
    <div className="main-window-title">
      {titleWords.map((word, index) => (
        <span key={index}>
          <span className="first-letter">{word.charAt(0)}</span>
          {word.slice(1)}{" "}
        </span>
      ))}
    </div>
  );
};

export default MainWindowTitle;
