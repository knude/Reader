import { useState } from "react";

import NavigationBar from "./NavigationBar";
import DisplayWindow from "./DisplayWindow";

const Page = () => {
  const [imageURL, setImageURL] = useState("");

  return (
    <div className="page">
      <NavigationBar setImageURL={setImageURL} />
      <DisplayWindow imageURL={imageURL} />
    </div>
  );
};

export default Page;
