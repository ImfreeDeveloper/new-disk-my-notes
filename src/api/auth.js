import http from '@/api/http'

const register = async (params) => {
  const { data } = await http.post('/reg', params)
  return data
}

const login = async (params) => {
  const { data } = await http.post('/auth', params)
  return data
}

const deleteAccount = async (params) => {
  const { data } = await http.delete('/auth', params)
  return data
}

export default {
  login,
  register,
  deleteAccount
}
