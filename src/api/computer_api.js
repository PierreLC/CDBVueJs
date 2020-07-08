import { axios } from "./index";

export default class ComputerApi {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  findAll(token, computerSreach) {
    return this.axios.get(
      "/computers?pageIterator=" +
        computerSreach.pageIterator +
        "&taillePage=" +
        computerSreach.taillePage +
        "&search=" +
        computerSreach.search +
        "&order=" +
        computerSreach.order,
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
  }

  create(computerDTO) {
    return this.axios.post("/computers", computerDTO, {
      headers: {
        "Content-Type": "application/json",
        authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJldGllbm5lIiwiZXhwIjoxNTk0MTQ0MzYyLCJpYXQiOjE1OTQxMDgzNjJ9.cLukJIOupcFC6vmiVldBRZVjdw8vnziaxaae82OCvUEgbKulFzwlAkSiCFmaCIqDl62LQVgASvdX6yWC726IEw",
      },
    });
  }

  delete(id) {
    return this.axios.delete("/computers/" + id);
  }
}

export const computerApi = new ComputerApi(axios);
