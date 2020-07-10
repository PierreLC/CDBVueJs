import { axios } from "./index";

export default class CompanyApi {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  findAll() {
    return this.axios.get("/companies", {
      headers: { authorization: "Bearer " + sessionStorage.getItem("token") },
    });
  }

  create(company) {
    return this.axios.post("/companies", company, {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  delete(id) {
    return this.axios.delete("/companies/" + id, {
      headers: { authorization: "Bearer " + sessionStorage.getItem("token") },
    });
  }
}

export const companyApi = new CompanyApi(axios);
