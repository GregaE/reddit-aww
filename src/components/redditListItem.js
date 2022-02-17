function RedditListItem( { title, thumbnail, path, subreddit } ) {
  return (
    <div className="RedditListItem">
      <h2>
        <a href={`www.reddit.com${path}`}>{title}</a>
      </h2>
      <img src={thumbnail} alt="play-button" />
      <div>{subreddit}</div>
    </div>
  );
}

export default RedditListItem;