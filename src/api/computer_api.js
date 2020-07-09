import { axios } from "./index";

export default class ComputerApi {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  findAll(computerSreach) {
    return this.axios.get(
      "/computers?pageIterator=" +
        (computerSreach.pageIterator -1)+
        "&taillePage=" +
        computerSreach.taillePage +
        "&search=" +
        computerSreach.search +
        "&order=" +
        computerSreach.order,
      {
        headers: {
          authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  create(computerDTO) {
    return this.axios.post("/computers", computerDTO, {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  delete(id) {
    return this.axios.delete("/computers/" + id, {
      headers: { authorization: "Bearer " + sessionStorage.getItem("token") },
    });
  }

  deleteMulti(multiDeleteString) {
    console.log(multiDeleteString)
    return this.axios.delete("/computers?ids=" + multiDeleteString +"", {
      headers: { authorization: "Bearer " + sessionStorage.getItem("token") },
    });
  }
}

export const computerApi = new ComputerApi(axios);
