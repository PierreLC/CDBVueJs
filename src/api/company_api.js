import { axios } from './index'

export default class CompanyApi {
    constructor(axiosInstance) {
        this.axios = axiosInstance
    }

    findAll() {
        return this.axios.get('/companies',{ headers: {"authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJldGllbm5lIiwiZXhwIjoxNTk0MTcxMjk1LCJpYXQiOjE1OTQxMzUyOTV9.s-cdIZqydA7EYykNnwsrDfXxHEEBtJok7hr8Vud2kWqUwrlOwgK9kvip5CVi5g1CpGlLo74qAt8U7GHtysi7Cg"}});
    }

    create(company) {
        return this.axios.post('/companies', company, { headers: {"Content-Type": "application/json", "authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJldGllbm5lIiwiZXhwIjoxNTk0MTc3MDIxLCJpYXQiOjE1OTQxNDEwMjF9.ry-bV3lRFNDiT890awuCTuWhODedkQ2mtKDbAim4uPuOH-D-g8A2j1eYK5Qda09tOklvLy-b2OlIDhXiIw1UiQ"}})
    }
}

export const companyApi = new CompanyApi(axios)