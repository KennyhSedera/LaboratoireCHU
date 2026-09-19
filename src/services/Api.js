import axios from 'axios'

export default ()=> {
    return axios.create({ baseURL:'https://backend-chu.vercel.app' })
}
