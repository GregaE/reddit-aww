import React, { useEffect, useState, useRef, useCallback } from "react";
import RedditListItem from "./redditListItem";
import RedditListItemSkeleton from "./redditListItemSkeleton";
import { fetchNewPosts } from "../services/redditApiService";

function RedditListContainer() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [redditPostList, setRedditPostList] = useState([]);
  const [nextPost, setNextPost] = useState("");

  const observer = useRef();
  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setNextPost(redditPostList[redditPostList.length - 1].data.name);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, redditPostList]
  );

  function renderPosts(list) {
    return list.map((post, index) => {
      if (list.length === index + 1) {
        return (
          <RedditListItem
            ref={lastPostRef}
            key={post.data.name}
            title={post.data.title}
            thumbnail={post.data.thumbnail}
            path={post.data.permalink}
            subreddit={post.data.subreddit_name_prefixed}
          />
        );
      } else {
        return (
          <RedditListItem
            key={post.data.name}
            title={post.data.title}
            thumbnail={post.data.thumbnail}
            path={post.data.permalink}
            subreddit={post.data.subreddit_name_prefixed}
          />
        );
      }
    });
  }

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetchNewPosts(nextPost)
      .then((res) => {
        if (res.data) {
          setRedditPostList((prevPosts) => [
            ...prevPosts,
            ...res.data.children,
          ]);
        }
        setLoading(false);
      })
      .catch((e) => setError(true));
  }, [nextPost]);

  return (
    <div className="RedditListContainer">
      {renderPosts(redditPostList)}
      {loading && [1, 2, 3].map((item, index) => <RedditListItemSkeleton key={`skele${index}`} />)}
      <div className="error">{error && "Error loading posts"}</div>
    </div>
  );
}

export default RedditListContainer;
