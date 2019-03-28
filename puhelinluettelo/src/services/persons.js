import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (person) => {
  return axios.post(baseUrl, person)
}

const update = (person) => {
  return axios.put(`${baseUrl}/${person.id}`, person)
}
const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default {
  getAll: getAll,
  create: create,
  update: update,
  deletePerson: deletePerson
}