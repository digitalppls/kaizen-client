// Provide nuxt-axios instance to use same configuration across the whole project
export default $axios => (proxy, store) => ({
  UserRegister (data, promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "post",
      "user/create/",
      data,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  UserLogin (data, promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "post",
      "user/login/",
      data,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  UserLoginDetect (data, promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "post",
      "user/login/detect/",
      data,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  UserPasswordRecovery (data, promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "post",
      "user/password/recovery/",
      data,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  UserPasswordRecoverySet (data, promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "post",
      "user/password/recovery/set/",
      data,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  User (promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "post",
      "user/get/",
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  UserEmailVerify (promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "post",
      "user/email/verify/",
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  UserWalletCreate (promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "post",
      "user/wallet/create/",
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  /** Deprecated */
  UserTokenBuy (data, promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "post",
      "user/token/buy/",
      data,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  UserProductList (data, promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "post",
      "product/list/my/",
      data,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  UserRefList (data, promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "post",
      "ref/list/",
      data,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  UserRefInfo (promiseFuncSuccess, promiseFuncFail) {
    return this.request(
      "post",
      "user/ref/info/",
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  // Статистика инвестиций: своих и партнеров
  UserStatInfo (promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "post",
      "user/stat/info/",
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  GetUsername (data, promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "get",
      "user/username/get/",
      data,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  OperationList (data, promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "post",
      "operation/list/",
      data,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  ProductList (data, promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "post",
      "product/list/",
      data,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  ProductBuy (data, promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "post",
      "product/buy/",
      data,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  getCurrency (promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "get",
      "currency/get/",
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  // Массив всех статусов маркетинга
  getStatusList (promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "get",
      "status/list/",
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  /** Список пакетов */
  getPackageList (promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "get",
      "package/list/",
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  /** Покупка пакета */
  BuyPackage (data, promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "post",
      "package/buy/",
      data,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  /** Список купленных пользователем пакетов */
  getUserPackageList (promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "post",
      "package/list/my/",
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  /** Вывести средства с бизнес-пакета */
  PackageWithdraw (data, promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "post",
      "package/withdraw/",
      data,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  request (type, path, data, promiseFuncSuccess, promiseFuncFail) {
    const config = {};
    config.headers = {
      Authorization: "Bearer " + store.getters.token
    };

    // console.log("API Request", type, path, data);

    if (type === "post") {
      $axios.$post(`${proxy}/api/${path}`, data, config).then((response) => {
        if (promiseFuncSuccess) {
          promiseFuncSuccess(response);
        }
      }).catch((exceptData) => {
        if (exceptData.response) {
          if (promiseFuncFail) {
            promiseFuncFail(exceptData.response.data);
          } else {
            console.log(exceptData.response.data);
          }
        }
      });
    } else if (type === "get") {
      if (data) {
        config.params = data;
      }
      $axios.$get(`${proxy}/api/${path}`, config).then((response) => {
        if (promiseFuncSuccess) {
          promiseFuncSuccess(response);
        }
      }).catch((exceptData) => {
        if (exceptData) {
          if (promiseFuncFail) {
            promiseFuncFail(exceptData.response.data);
          } else {
            console.log(exceptData);
          }
        }
      });
    }
  }
});
