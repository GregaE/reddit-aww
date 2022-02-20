const BASE_URL = "https://www.reddit.com";

async function fetchNewPosts(after) {
  try {
    const postList = await fetch(
      `${BASE_URL}/r/aww/new.json?after=${after}&limit=25`
    );
    return postList.json();
  } catch (error) {
    console.log(error);
  }
}

export { fetchNewPosts };
