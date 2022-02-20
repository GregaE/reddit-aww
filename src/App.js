import { useState } from "react";
import RedditListContainer from "./components/redditListContainer";

function App() {

  const [headerHeight, setHeaderHeight] = useState("expanded");

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  window.onscroll = function() {handleScroll()};

  function handleScroll() {
    if (document.body.scrollTop > 90 || document.documentElement.scrollTop > 90) {
      setHeaderHeight("shrunk")
    } else {
      setHeaderHeight("expanded")
    }
  }

  return (
    <div className="App">
      <header className={headerHeight}>
        <img src="/assets/aww.png" alt="logo"></img>
      </header>
      <RedditListContainer />
    </div>
  );
}

export default App;
