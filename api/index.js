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

  UserWalletWithdraw (data, promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "post",
      "user/wallet/withdraw/",
      data,
      promiseFuncSuccess,
      promiseFuncFail,
      true
    );
  },

  /* Список токенов доступных для вывода через Wallet33 */
  UserWalletWithdrawalList (promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "get",
      "user/wallet/withdraw/list/",
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  /** Покупка токенов (обмен одной монеты на другую) */
  TokenSwap (data, promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "post",
      "token/swap/",
      data,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  /** В каких направлениях доступен swap монет. */
  TokenSwapList (promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "get",
      "token/swap/list/",
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  /** В каких направлениях доступен swap монет. */
  TokenSwapLimit (token, promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "get",
      `token/swap/${token}/limit/`,
      false,
      promiseFuncSuccess,
      promiseFuncFail,
      true
    );
  },

  /** Изменить баланс пользователя */
  TokenUpdateBalance (data, promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "post",
      "token/increment",
      data,
      promiseFuncSuccess,
      promiseFuncFail,
      true
    );
  },

  /** ОТЛОЖЕННЫЙ/ЛИМИТИРОВАННЫЙ ОРДЕР ================================= */

  /** Добавление/удаление/изменение ордера на продажу/покупку */
  TokenOrderSave (direction, data, promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "post",
      `token/limit-order/${direction}/save/`,
      data,
      promiseFuncSuccess,
      promiseFuncFail,
      true
    );
  },

  /** Получить список всех ордеров всех пользователей */
  TokenOrderListAll (data, promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "post",
      "token/limit-order/list/all/",
      data,
      promiseFuncSuccess,
      promiseFuncFail,
      true
    );
  },

  /** Получить список всех ордеров текущего пользователя */
  TokenOrderList (promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "get",
      "token/limit-order/list/",
      false,
      promiseFuncSuccess,
      promiseFuncFail,
      true
    );
  },

  RefList (data, promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "post",
      "ref/list/",
      data,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  /** Просмотр реферального дерева любого пользователя (ADMIN) */
  RefListAll (data, promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "post",
      "ref/list/all",
      data,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  TokenSaleList (symbol, promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "get",
      `token/${symbol}/sale/list/`,
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },
  // Сохранение/добавление/удаление настроек сейлов
  TokenSaleSave (data, promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "post",
      `token/sale/save/`,
      data,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  TokenBonusList (promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "get",
      "token/bonus/list/",
      false,
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

  getCurrency (promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "get",
      "currency/get/",
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  getCurrencyHistory (data, promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "get",
      "currency/history/",
      data,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  getCurrencyMarketCap (data, promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "get",
      "currency/cap/",
      data,
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

  /** Админские методы */
  // Список зарегистрированных пользователей
  adminUserList (data, promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "post",
      "user/list",
      data,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  // Список транзакций другого пользователя
  adminOperationList (data, promiseFuncSuccess, promiseFuncFail) {
    this.request(
      "post",
      "operation/list/other/",
      data,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },



  request (type, path, data, promiseFuncSuccess, promiseFuncFail, isAuth = false) {
    const config = {};

    if (type === "post") {
      config.headers = {
        Authorization: "Bearer " + store.getters.token
      };

      $axios.$post(`/api/${path}`, data, config).then((response) => {
        if (promiseFuncSuccess) {
          promiseFuncSuccess(response);
        }
      }).catch((exceptData) => {
        if (exceptData.response) {
          if (promiseFuncFail) {
            promiseFuncFail(exceptData.response.data);
          } else {
            console.error('[api-post]', exceptData.response.data);
          }
        }
      });
    } else if (type === "get") {
      if (data) {
        config.params = data;
      }
      if (isAuth) {
        config.headers = {
          Authorization: "Bearer " + store.getters.token
        };
      }

      $axios.$get(`/api/${path}`, config).then((response) => {
        if (promiseFuncSuccess) {
          promiseFuncSuccess(response);
        }
      }).catch((exceptData) => {
        if (exceptData) {
          if (promiseFuncFail) {
            promiseFuncFail(exceptData.response.data);
          } else {
            console.error('[api-get]', exceptData);
          }
        }
      });
    }
  }
});
