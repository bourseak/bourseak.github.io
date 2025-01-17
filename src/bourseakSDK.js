import axios from "axios";
class BourseakBase {
  constructor() {
    this.apiUrl = "http://127.0.0.1:8000/api";
    this.watchApiUrl = this.apiUrl + "/onwatch";
  }
}

export class Watch extends BourseakBase {
  constructor(token) {
    super();
    this.token = token;
    this.headers = {
      Authorization: `Bearer ${token}`,
    };
    this.config = {
      headers: this.headers,
    };
  }

  getWatch(id) {
    return axios
      .get(this.watchApiUrl + `/${id}/`, this.config)
      .then((watch) => {
        return watch.data;
      })
      .catch((err) => {
        return err;
      });
  }

  editWatch(id, title, cond, cond_variable, condition, stock_id) {
    return axios
      .patch(
        this.watchApiUrl + `/${id}/`,
        {
          title: title,
          cond: cond,
          cond_variable: cond_variable,
          condition: condition,
          stock: stock_id,
        },
        this.config
      )
      .then((watch) => {
        return watch.data;
      })
      .catch((err) => {
        return err;
      });
  }
}
