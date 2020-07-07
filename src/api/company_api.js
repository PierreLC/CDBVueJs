import { axios } from './index'

export default class CompanyApi {
    constructor(axiosInstance) {
        this.axios = axiosInstance
    }

    findAll() {
        return this.axios.get('/companies',{ headers: {"authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJldGllbm5lIiwiZXhwIjoxNTk0MTQ0MzYyLCJpYXQiOjE1OTQxMDgzNjJ9.cLukJIOupcFC6vmiVldBRZVjdw8vnziaxaae82OCvUEgbKulFzwlAkSiCFmaCIqDl62LQVgASvdX6yWC726IEw"}});
    }
}

export const companyApi = new CompanyApi(axios)