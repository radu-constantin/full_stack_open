function dummy(blogs) {
  return 1;
}

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

function mostBlogs(blogs) {
  let authorList = {};
  blogs.forEach(blog => {
    const author = blog.author;
    if (authorList[author]) {
      authorList[author] += 1;
    } else {
      authorList[author] = 1;
    }
  });

  let mostBlogsAuthor = null;
  Object.entries(authorList).forEach(pair => {
    if (mostBlogsAuthor === null) {
      mostBlogsAuthor = pair;
    } else if (pair[1] > mostBlogsAuthor[1]) {
      mostBlogsAuthor = pair;
    }
  });

  return {author: mostBlogsAuthor[0], blogs: mostBlogsAuthor[1]};
}

function mostLikes(blogs) {
  let authorList = {};
  blogs.forEach(blog => {
    const author = blog.author;
    if (authorList[author]) {
      authorList[author] += blog.likes;
    } else {
      authorList[author] = blog.likes;
    }
  });

  let mostLikesAuthor = null;
  Object.entries(authorList).forEach(pair => {
    if (mostLikesAuthor === null) {
      mostLikesAuthor = pair;
    } else if (pair[1] > mostLikesAuthor[1]) {
      mostLikesAuthor = pair;
    }
  });

  return {author: mostLikesAuthor[0], likes: mostLikesAuthor[1]};
}

module.exports={
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};