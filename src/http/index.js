import axios from 'axios'

const base_api_url = 'http://127.0.0.1:3000/'

export function lista() {
  return axios.get(`${base_api_url}v1/fotos`).then(res => res.data)
}

export function cadastra(foto) {
  if (foto._id) {
    return axios.put(`${base_api_url}v1/fotos/${foto._id}`, foto)
      .then(res => res.data)
      .catch(err => console.log(err))
  } else {
    return axios.post(`${base_api_url}v1/fotos`, foto).then(res => res.data)
  }

}

export function apaga(id) {
  return axios.delete(`${base_api_url}v1/fotos/${id}`)
    .then(null)
    .catch(err => {
      console.log(err)
      throw new Error('Não foi possível remover a foto');
    })
}

export function busca(id) {
  return axios.get(`${base_api_url}v1/fotos/${id}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}