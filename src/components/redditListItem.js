function RedditListItem( { title, thumbnail, path, subreddit } ) {

  return (
    <div className="RedditListItem">
      <h3>{subreddit}</h3>
      <h2>
        <a href={`https://www.reddit.com${path}`}>{title}</a>
      </h2>
      <img src={thumbnail} alt="play-button" />
    </div>
  );
}

export default RedditListItem;