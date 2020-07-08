import { axios } from './index'

export default class CompanyApi {
    constructor(axiosInstance) {
        this.axios = axiosInstance
    }

    findAll() {
        return this.axios.get('/companies',{ headers: {"authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJldGllbm5lIiwiZXhwIjoxNTk0MTQ0MzYyLCJpYXQiOjE1OTQxMDgzNjJ9.cLukJIOupcFC6vmiVldBRZVjdw8vnziaxaae82OCvUEgbKulFzwlAkSiCFmaCIqDl62LQVgASvdX6yWC726IEw"}});
    }

    create(company) {
        return this.axios.post('/companies', company, { headers: {"Content-Type": "application/json", "authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJldGllbm5lIiwiZXhwIjoxNTk0MTc3MDIxLCJpYXQiOjE1OTQxNDEwMjF9.ry-bV3lRFNDiT890awuCTuWhODedkQ2mtKDbAim4uPuOH-D-g8A2j1eYK5Qda09tOklvLy-b2OlIDhXiIw1UiQ"}})
    }
}

export const companyApi = new CompanyApi(axios)