import http from '@/api/http'

const noteList = async () => {
  const { data } = await http.get('/notes')
  return data
}
const createNote = async (params) => {
  const { data } = await http.post('/notes', params)
  return data
}

const deleteNote = async (id) => {
  const { data } = await http.delete(`/notes/${id}`)
  return data
}

export default {
  noteList,
  createNote,
  deleteNote
}
