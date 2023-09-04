import axios from 'axios'

export default () => {
    return axios.create({ baseURL: 'http://192.168.88.37:3000' })
}