import axios from '@/utils/axios'

export const getUsers = () =>
  axios.get('/user')
