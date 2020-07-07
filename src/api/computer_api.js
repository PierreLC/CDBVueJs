import { axios } from './index'

export default class ComputerApi {
    constructor(axiosInstance) {
        this.axios = axiosInstance
    }

    findAll() {
        return this.axios.get('/computers',{ headers: {"authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJldGllbm5lIiwiZXhwIjoxNTk0MDgzOTEyLCJpYXQiOjE1OTQwNDc5MTJ9.wclKZpSS63w4nKG8kDMVPaiv3nFIll9caumIcVGVEwW28luaQgYDhiUZlkKS7zOJoD9rjquld8o355qaQXseKA"}})
    }

    create(computerLabel) {
        return this.axios.post('/computers', computerLabel, { headers: {"Content-Type": "application/json"}})
    }
    
    delete(id) {
        return this.axios.delete('/computers/' + id)
    }
}

export const computerApi = new ComputerApi(axios)