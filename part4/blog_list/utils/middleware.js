const jwt = require('jsonwebtoken');
const User = require('../models/user');

function tokenExtractor(request, response, next) {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '');
  }

  next();
}

async function userExtractor(request, response, next) {
  if (!request.token) {
    return response.status(401).json({ error: 'no token given'});
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid'});
  }

  request.user = await User.findById(decodedToken.id);
  next();
}





module.exports = {
  tokenExtractor,
  userExtractor
};