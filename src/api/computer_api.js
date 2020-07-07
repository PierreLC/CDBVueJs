import { axios } from './index'

export default class ComputerApi {
    constructor(axiosInstance) {
        this.axios = axiosInstance
    }

    findAll() {
        return this.axios.get('/computers',{ headers: {"authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJldGllbm5lIiwiZXhwIjoxNTk0MTcxMjk1LCJpYXQiOjE1OTQxMzUyOTV9.s-cdIZqydA7EYykNnwsrDfXxHEEBtJok7hr8Vud2kWqUwrlOwgK9kvip5CVi5g1CpGlLo74qAt8U7GHtysi7Cg"}})
    }

    create(computerDTO) {
        return this.axios.post('/computers', computerDTO, { headers: {"Content-Type": "application/json", "authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJldGllbm5lIiwiZXhwIjoxNTk0MTcxMjk1LCJpYXQiOjE1OTQxMzUyOTV9.s-cdIZqydA7EYykNnwsrDfXxHEEBtJok7hr8Vud2kWqUwrlOwgK9kvip5CVi5g1CpGlLo74qAt8U7GHtysi7Cg"}})
    }
    
    deleteComputer(id) {
        return this.axios.delete('/computers/' + id, { headers: {"Content-Type": "application/json", "authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJldGllbm5lIiwiZXhwIjoxNTk0MTcxMjk1LCJpYXQiOjE1OTQxMzUyOTV9.s-cdIZqydA7EYykNnwsrDfXxHEEBtJok7hr8Vud2kWqUwrlOwgK9kvip5CVi5g1CpGlLo74qAt8U7GHtysi7Cg"}})
    }
}

export const computerApi = new ComputerApi(axios)