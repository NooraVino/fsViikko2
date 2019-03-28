import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = person => {
  return axios.post(baseUrl, person)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
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