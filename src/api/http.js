import axios from 'axios'
import LS from '@/helpers/localStorage'

const baseURL = 'https://dist.nd.ru/api/'

axios.defaults.baseURL = baseURL
axios.interceptors.request.use(config => {
  const token = getToken()

  if (token && ((config.method === 'post') ||
      config.method === 'delete' ||
      config.url === '/auth' ||
      config.url === '/notes'
  )
  ) {
    config.headers.Authorization = token
  }

  return config
})
export default axios

function getToken() {
  const userCurrent = LS.getUser()
  const token = userCurrent ? userCurrent.accessToken || '' : ''
  return token ? `Bearer ${token}` : ''
}
