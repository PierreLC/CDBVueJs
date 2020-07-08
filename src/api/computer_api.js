import { axios } from './index'

export default class ComputerApi {
    constructor(axiosInstance) {
        this.axios = axiosInstance
    }

    findAll() {
        return this.axios.get('/computers',{ headers: {"authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJldGllbm5lIiwiZXhwIjoxNTk0MjMzMTUyLCJpYXQiOjE1OTQxOTcxNTJ9.3m1H9-Y1WWOekvCVNYy5fr9KmhcTJ27AA7cKn1Qb-pIb2CClmXGvIdIme0R0gjNxh1ekbn8PZei4by7C_mcWBw"}})
    }

    create(computerDTO) {
        return this.axios.post('/computers', computerDTO, { headers: {"Content-Type": "application/json", "authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJldGllbm5lIiwiZXhwIjoxNTk0MjMzMTUyLCJpYXQiOjE1OTQxOTcxNTJ9.3m1H9-Y1WWOekvCVNYy5fr9KmhcTJ27AA7cKn1Qb-pIb2CClmXGvIdIme0R0gjNxh1ekbn8PZei4by7C_mcWBw"}})
    }
    
    delete(id) {
        return this.axios.delete('/computers/' + id)
    }
}

export const computerApi = new ComputerApi(axios)