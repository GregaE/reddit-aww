import React from "react";

const RedditListItem = React.forwardRef((props, ref) => (
  <div className="RedditListItem" ref={ref}>
    <h3>{props.subreddit}</h3>
    <h2>
      <a href={`https://www.reddit.com${props.path}`}>{props.title}</a>
    </h2>
    <img
      src={props.thumbnail || "./assets/img-placeholder.jpg"}
      alt="play-button"
    />
  </div>
));

export default RedditListItem;
