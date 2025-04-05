import axios from "axios";
class BourseakBase {
  constructor() {
    this.apiUrl = "https://bourseak.liara.run/api";
    // this.apiUrl = "http://127.0.0.1:8000/api";
    this.watchApiUrl = this.apiUrl + "/onwatch";
    this.stockApiUrl = this.apiUrl + "/stock";
    this.userApiUrl = this.apiUrl + "/user";
    this.priceApiUrl = this.apiUrl + "/price";
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

  editWatch(id, title, cond, cond_variable, condition, stock_id, enable) {
    return axios
      .patch(
        this.watchApiUrl + `/${id}/`,
        {
          title: title,
          cond: cond,
          cond_variable: cond_variable,
          condition: condition,
          stock: stock_id,
          enable: enable,
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

  deleteWatch(id) {
    return axios
      .delete(this.watchApiUrl + `/${id}/`, this.config)
      .then((watch) => {
        return watch;
      })
      .then((err) => {
        return err;
      });
  }
}

export class Stock extends BourseakBase {
  constructor() {
    super();
  }

  getStock(id) {
    return axios
      .get(this.stockApiUrl + `/${id}/`)
      .then((stock) => {
        return stock.data;
      })
      .catch((err) => {
        return err;
      });
  }

  getStockPrice(id) {
    return axios
      .get(this.priceApiUrl + `/${id}/`)
      .then((price) => {
        return price.data;
      })
      .catch((err) => {
        return err;
      });
  }
}

export class User extends BourseakBase {
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

  getUser() {
    return axios
      .get(this.userApiUrl + "/", this.config)
      .then((user) => {
        return user.data;
      })
      .catch((err) => {
        return err;
      });
  }
}

export class TSETMC {
  constructor(id) {
    this.id = id;
  }

  getMonthlyVolume() {
    return axios
      .get(`https://cdn.tsetmc.com/api/Instrument/GetInstrumentInfo/${this.id}`)
      .then((data) => {
        return data.data["instrumentInfo"]["qTotTran5JAvg"];
      })
      .catch((err) => {
        return err.message;
      });
  }
}
