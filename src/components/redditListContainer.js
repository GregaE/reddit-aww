import React, { useEffect, useState, useRef, useCallback } from 'react';
import RedditListItem from "./redditListItem";
import { fetchNewPosts } from "../services/redditApiService"

function RedditListContainer() {

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(true)
  const [redditPostList, setRedditPostList] = useState([]);
  const [nextPost, setNextPost] = useState("");

  const observer = useRef();
  const lastPostRef = useCallback(node => {
    const options = {
      rootMargin: '80%',
    }
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting) {
        setNextPost(redditPostList[redditPostList.length-1].data.name)
      }
    }, options)
    if (node) observer.current.observe(node)
  }, [loading, redditPostList])

  function renderPosts(list) {
    return list.map((post, index) => {
      if (list.length === index + 1) {
        return <RedditListItem
            ref={lastPostRef}
            key={post.data.name}
            title={post.data.title}
            thumbnail={post.data.thumbnail}
            path={post.data.permalink}
            subreddit={post.data.subreddit_name_prefixed}
          />
      } else {
        return <RedditListItem
            key={post.data.name}
            title={post.data.title}
            thumbnail={post.data.thumbnail}
            path={post.data.permalink}
            subreddit={post.data.subreddit_name_prefixed}
          />
      }
    })
  }

  useEffect(()=> {
    setLoading(true)
    // setError(false)
    fetchNewPosts(nextPost)
      .then(res => {
        if(res.data) {
          setRedditPostList(prevPosts => [...prevPosts, ...res.data.children])
        }
        setLoading(false)
      })
      .catch(e => setError(true))
  },[nextPost])

  return (
    <div className="RedditListContainer">
      {/* {renderPosts(redditPostList)} */}
      {loading ?
        (<div className="spinner-container">
          <div className="spinner" />
        </div>
        ) : ""
      }
      <div class='error'>{error && 'Error loading posts'}</div>
    </div>
  );
}

export default RedditListContainer;