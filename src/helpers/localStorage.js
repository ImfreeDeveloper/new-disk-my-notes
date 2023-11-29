import { NAME_KEY_LS } from '@/helpers/constants'

const setUser = currentUser => {
  let ls = getStorage()
  if (!ls) ls = {}
  ls.currentUser = currentUser
  setStorage(ls)
}

const getUser = () => {
  const ls = getStorage()
  return ls ? ls.currentUser : null
}

const clear = () => {
  localStorage.clear()
}

function getStorage() {
  return JSON.parse(localStorage.getItem(NAME_KEY_LS)) || null
}
function setStorage(store) {
  return localStorage.setItem(NAME_KEY_LS, JSON.stringify(store))
}

export default {
  setUser,
  getUser,
  clear
}
