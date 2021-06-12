import axios from 'axios'


export const cryptoFetcher = async (url: string, options = {}) => {
  const response = await axios.get(process.env.REACT_APP_API_URL + url, options)
  if(response.data.status.error_code) return Promise.reject('Fail to fetch symbol')
  return Promise.resolve(response.data.data)
}