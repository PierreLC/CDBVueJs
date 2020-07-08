import { axios } from './index'

export default class CompanyApi {
    constructor(axiosInstance) {
        this.axios = axiosInstance
    }

    findAll(token) {
        return this.axios.get('/companies',{ headers: {"authorization": "Bearer "+ token}});
    }
}

export const companyApi = new CompanyApi(axios)