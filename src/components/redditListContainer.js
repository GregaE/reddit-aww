import React, { useEffect, useState } from 'react';

import RedditListItem from "./redditListItem";
import { getHotPosts } from "../services/redditApiService"

function RedditListContainer() {

  const [redditPostList, setRedditPostList] = useState([]);

  function renderPosts(list) {
    return list.map(post => {
      return <RedditListItem
          key={post.data.name}
          title={post.data.title}
          thumbnail={post.data.thumbnail}
          path={post.data.permalink}
          subreddit={post.data.subreddit_name_prefixed}
        />
      }
    )
  }

  useEffect(()=> {
    getHotPosts()
      .then(res => {
        setRedditPostList(res.data.children)
      })
      .catch(console.log('An error occurred when fetching Reddit posts'))
  },[setRedditPostList])

  console.log(redditPostList)

  return (
    <div className="RedditListContainer">
      {renderPosts(redditPostList)}
    </div>
  );
}

export default RedditListContainer;