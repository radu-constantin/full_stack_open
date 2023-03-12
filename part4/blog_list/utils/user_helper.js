function validCredentials(username, password) {
  return username && password && username.length > 2 && password.length > 2;
}

module.exports = {
  validCredentials
};