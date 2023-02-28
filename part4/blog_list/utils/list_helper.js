const { mapReduce } = require("../models/blog");

function dummy(blogs) {
  return 1;
};

function totalLikes(blogs) {
  let likeList = [];

  blogs.forEach(blog => {
    likeList.push(blog.likes);
  });

  return likeList.reduce((total, value) =>{
    return total + value;
  }, 0);
}

function favoriteBlog(blogs) {
  let favoriteBlog = null;
  blogs.forEach(blog => {
    if (favoriteBlog === null) {
      favoriteBlog = blog;
    } else if (blog.likes > favoriteBlog.likes) {
      favoriteBlog = blog;
    }
  });

  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes
  };
}

module.exports={
  dummy,
  totalLikes,
  favoriteBlog
};