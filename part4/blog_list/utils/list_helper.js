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

module.exports={
  dummy,
  totalLikes
};