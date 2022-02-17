const BASE_URL = "https://www.reddit.com";

async function getHotPosts() {
  try {
    const postList = await fetch(`${BASE_URL}/r/aww/hot.json?limit=25`);
    return postList.json();
  } catch (error) {
    console.log(error);
  }
}

export { getHotPosts };