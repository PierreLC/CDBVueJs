import { axios } from './index'

export default class UserApi {

    constructor(axiosInstance) {
        this.axios = axiosInstance
    }

    toto(user, password) {
        return this.axios.post('/login',{
            name: user,
            password: password
            }
         );
    }

}

export const userApi = new UserApi(axios)