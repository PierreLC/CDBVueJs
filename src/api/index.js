import Axios from 'axios'

export const axios = Axios.create({
    baseURL: 'http://10.0.1.84:8080/webapp/api/v1'
})