import axios from 'axios'
import LS from '@/helpers/localStorage'
// import { errorAccess } from '@/helpers/utils'

const baseURL = 'https://dist.nd.ru/api/'

axios.defaults.baseURL = baseURL

axios.interceptors.request.use(config => {
  const token = getToken()
  if (token && (config.method === 'post')) {
    config.headers.Authorization = token
  }
  return config
})

// axios.interceptors.response.use(
//   res => {
//     errorAccess(res.data)
//     return res
//   },
//   error => {
//     errorAccess(error.response.data)
//     return Promise.reject(error)
//   }
// )

export default axios

function getToken() {
  const userCurrent = LS.getUser()
  const token = userCurrent ? userCurrent.api_token || '' : ''
  return token ? `Bearer ${token}` : ''
}
