import "./NavigationBar.css";
import CreateChapterForm from "./CreateChapterForm";

const NavigationBar = () => {
  return (
    <>
      <div className="navigation-bar">
        <h1>Reader</h1>
        <CreateChapterForm />
      </div>
    </>
  );
};

export default NavigationBar;
