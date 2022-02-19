import RedditListContainer from './components/redditListContainer';

function App() {

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src="/assets/aww.png" alt="logo"></img>
      </header>
      <RedditListContainer/>
    </div>
  );
}

export default App;
