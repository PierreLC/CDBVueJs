import { axios } from './index'

export default class CompanyApi {
    constructor(axiosInstance) {
        this.axios = axiosInstance
    }

    findAll() {
        return this.axios.get('/companies',{ headers: {"authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJldGllbm5lIiwiZXhwIjoxNTk0MTcxMjk1LCJpYXQiOjE1OTQxMzUyOTV9.s-cdIZqydA7EYykNnwsrDfXxHEEBtJok7hr8Vud2kWqUwrlOwgK9kvip5CVi5g1CpGlLo74qAt8U7GHtysi7Cg"}});
    }
}

export const companyApi = new CompanyApi(axios)