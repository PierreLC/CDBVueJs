import { axios } from './index'

export default class CompanyApi {
    constructor(axiosInstance) {
        this.axios = axiosInstance
    }

    findAll() {
        return this.axios.get('/companies',{ headers: {"authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJldGllbm5lIiwiZXhwIjoxNTk0MDgzOTEyLCJpYXQiOjE1OTQwNDc5MTJ9.wclKZpSS63w4nKG8kDMVPaiv3nFIll9caumIcVGVEwW28luaQgYDhiUZlkKS7zOJoD9rjquld8o355qaQXseKA"}});
    }
    
}

export const companyApi = new CompanyApi(axios)