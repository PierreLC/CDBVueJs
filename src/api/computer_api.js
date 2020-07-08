import { axios } from './index'

export default class ComputerApi {
    constructor(axiosInstance) {
        this.axios = axiosInstance
    }

    findAll() {
        return this.axios.get('/computers',{ headers: {"authorization": "Bearer "+sessionStorage.getItem('token')}})
    }

    create(computerDTO) {
        return this.axios.post('/computers', computerDTO, { headers: {"Content-Type": "application/json", "authorization": "Bearer "+sessionStorage.getItem('token')}})
    }
    
    delete(id) {
        return this.axios.delete('/computers/' + id, {headers: {"authorization": "Bearer "+sessionStorage.getItem('token')}})

    }
}

export const computerApi = new ComputerApi(axios)