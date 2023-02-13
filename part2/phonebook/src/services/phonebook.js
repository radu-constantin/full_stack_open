import axios from 'axios';

const baseURL = "http://localhost:3001/persons";

function getAll() {
  const request = axios.get(baseURL);
    return request.then(response => {
      return response.data;
    })
};

function create(personObject) {
  const request = axios.post(baseURL, personObject);
  return request.then(response => {
    return response.data;
  })
}

function remove(id) {
  return axios.delete(`${baseURL}/${id}`);
}

function updateNumber(personObject) {
  const request = axios.put(`${baseURL}/${personObject.id}`, personObject);
  return request.then(response => {
    return response.data;
  })
}

export { getAll, create, remove, updateNumber };