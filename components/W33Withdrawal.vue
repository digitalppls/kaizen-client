<template>
  <div v-if="walletId && userEmailVerified">
    <p class="accessed-value">
      {{ $t('W33_SELECT_NETWORK') }}:
    </p>
    <ui-select
      v-model="network"
      :options="networkList"
      class="m-b-20"
      @input="token = withdrawAddress = amount = errorAddress = errorAmount = null; messages = []"
    >
      <template #selected="{ option }">
        <template v-if="option === 'bnb'">
          Binance Smart Chain (BEP20)
        </template>
        <template v-else-if="option === 'trx'">
          Tron (TRC20)
        </template>
        <template v-else-if="option === 'eth'">
          Ethereum (ERC20)
        </template>
        <template v-else>
          {{ option }}
        </template>
      </template>
      <template #default="{ option }">
        <template v-if="option === 'bnb'">
          Binance Smart Chain (BEP20)
        </template>
        <template v-else-if="option === 'trx'">
          Tron (TRC20)
        </template>
        <template v-else-if="option === 'eth'">
          Ethereum (ERC20)
        </template>
        <template v-else>
          {{ option }}
        </template>
      </template>
    </ui-select>

    <div
      v-if="!selectedAddress"
      style="min-height: 100px;"
    />

    <template v-if="selectedAddress">
      <p class="accessed-value">
        {{ $t('W33_SELECT_TOKEN') }}:
      </p>
      <button
        v-for="(symbol, idx) in tokenList"
        :key="idx"
        :class="['btn', 'btn-outline', 'btn-small', 'm-r-5', 'm-b-5', {'btn-accent': token && token === symbol}]"
        @click="token = symbol; amount = errorAddress = errorAmount = null; messages = []"
      >
        <img
          :src="require(`~/assets/img/tokens/${symbol.toLowerCase()}.svg`)"
          :alt="symbol"
          :title="symbol.toUpperCase()"
          style="height: 16px; vertical-align: middle; margin-right: 5px;"
        >
        {{ symbol }}
      </button>

      <div
        v-if="token"
        class="m-t-20"
      >
        <div class="m-b-20">
          <ui-text-field
            v-model="withdrawAddress"
            :label="addressLabel"
            outlined
            required
            @input="inputAddress"
          />
          <p
            v-if="errorAddress"
            class="color-red m-t-5 font-300 font-size-14"
          >
            {{ errorAddress }}
          </p>
        </div>

        <div class="m-b-20">
          <p class="m-b-5">{{ $t('BALANCE') }}:
            <span class="color-main">{{ selectedWallet && selectedWallet.amount ? selectedWallet.amount.toLocaleString($i18n.locale) : 0 }}</span>
            {{ token.toUpperCase() }}
          </p>
          <ui-text-field
            v-model.number="amount"
            type="number"
            step="0.01"
            :max="selectedWallet && selectedWallet.amount ? selectedWallet.amount : 0"
            inputmode="decimal"
            :label="$t('AMOUNT')"
            outlined
            required
            @input="inputAmount"
          />
          <p
            v-if="errorAmount"
            class="color-red m-t-5 font-300 font-size-14"
          >
            {{ errorAmount }}
          </p>
        </div>

        <button
          class="btn btn-accent btn-medium btn-full"
          :disabled="!!errorAddress || !!errorAmount || !withdrawAddress || !amount"
          @click="withdrawalHandle"
        >
          <ui-preloader v-if="loading" size="small" color="white" />
          <ui-icon-done v-else-if="done" fill="#141517" />
          <template v-else>
            {{ $t('WITHDRAW') }}
          </template>
        </button>

        <template v-if="messages.length">
          <div
            v-for="(msg, key) in messages"
            :key="'msg-'+key"
            :class="['m-t-20', {'color-red': msg.type === 'error'}, {'color-success': msg.type === 'success'}]"
          >
            <template v-if="Array.isArray(msg.text)">
              <div
                v-for="(text, index) in msg.text"
                :key="'text-'+index"
                v-html="text"
              />
            </template>
            <template v-else>
              {{ msg.text }}
            </template>
          </div>
        </template>
      </div>
    </template>
  </div>
  <div v-else-if="!userEmailVerified">
    <p>
      {{ $t('VERIFY_EMAIL_MSG_WALLET33') }}
    </p>

    <verify-email />
  </div>
</template>

<script>
import UiSelect from './ui/ui-select.global';
import UiTextField from './ui/ui-text-field.global';
import VerifyEmail from './verify-email';

export default {
  name: 'W33Withdraw',
  components: { VerifyEmail, UiTextField, UiSelect },
  /*props: {
    token: {
      type: String,
      default: ''
    }
  },*/
  data () {
    return {
      loading: false,
      done: false,
      token: null,
      network: this.$t('SELECT'),
      errorAddress: null,
      errorAmount: null,
      withdrawAddress: '',
      messages: [],
      amount: '',
      walletIsValid: false
    };
  },
  computed: {
    user () {
      return this.$store.getters.user;
    },
    networkList () {
      /* let result = []
       Object.keys(this.$cryptoSupported).forEach((coinsArray, networkIndex) => {
         if (this.$cryptoSupported[coinsArray].find(x => x === this.token)) {
           result.push(Object.keys(this.$cryptoSupported)[networkIndex])
         }
       })*/

      return Object.keys(this.$cryptoSupported);
    },
    tokenList () {
      return this.selectedAddress
        ? this.$cryptoSupported[this.network].filter(token => this.withdrawalList.includes(token))
        : [];
    },
    selectedAddress () {
      return (this.user?.wallet33Assets ?? []).find(x => x.network === this.network)?.address ?? '';
    },
    walletId () {
      return this.user?.wallet33Id ?? null;
    },
    wallets () {
      return this.$store.getters.wallets;
    },
    selectedWallet () {
      return this.wallets.find(w => w.symbol === this.token) || null;
    },
    userEmailVerified () {
      return this.user?.emailVerified ?? null;
    },
    withdrawalList () {
      return this.$store.getters.withdrawalList || [];
    },
    addressLabel () {
      switch (this.network) {
        case 'trx':
          return `${this.$t('ADDRESS')} TRC20`;
        case 'eth':
          return `${this.$t('ADDRESS')} ERC20`;
        case 'bnb':
          return `${this.$t('ADDRESS')} BEP20`;
        default:
          return '';
      }
    }
  },
  methods: {
    walletCreate () {
      this.$API.UserWalletCreate((response) => {
        this.$store.dispatch('updateUser', response.data);
        this.$store.commit('push/addMessage', {
          type: 'success',
          text: 'Wallet created'
        });
      }, (error) => {
        this.$store.commit('push/addMessage', {
          type: 'error',
          text: error?.message ?? error
        });
      });
    },

    inputAddress () {
      const value = this.withdrawAddress;
      if (!value) {
        this.errorAddress = 'Address is required';
      } else if (!this.$isAddress(value, this.network)) {
        this.errorAddress = 'Incorrect address';
      } else {
        this.errorAddress = null;
      }
    },

    inputAmount (value) {
      this.amount = this.amount.length ? parseFloat(this.amount) : value;

      if (!this.amount || this.amount <= 0) {
        this.errorAmount = 'Amount is required';
      } else if (!this.selectedWallet) {
        this.errorAmount = 'Insufficient funds';
      } else if (this.selectedWallet && this.amount > this.selectedWallet.amount) {
        this.errorAmount = `Max ${this.selectedWallet.amount}`;
      } else {
        this.errorAmount = null;
      }
    },

    withdrawalHandle () {
      let coinType = this.token;
      if (!['eth', 'trx', 'bnb'].includes(coinType)) {
        coinType = { bnb: 'bep20', trx: 'trc20', eth: 'erc20' }[this.network] + coinType;
      }

      if (confirm(`${this.$t('CONFIRM_WITHDRAWAL')}`)) {
        this.loading = true;
        this.$API.UserWalletWithdraw({
          coinType,
          toAddress: this.withdrawAddress,
          amount: parseFloat(this.amount)
        }, (r) => {
          this.messages.push({
            type: 'success',
            text: `Funds have been sent. ${r?.operation?.hash ? 'Transaction ID: ' + r.operation.hash : ''}`
          });
          this.loading = false;
          this.done = true;
          setTimeout(() => {
            this.done = false;
          }, 2000);
        }, (e) => {
          this.loading = false;
          this.messages.push({
            type: 'error',
            text: Array.isArray(e?.message) ? e?.message : [this.$t(e.message.toUpperCase())]
          });
        });
      }
    }
  }
};
</script>

<style
  lang="scss"
  scoped
>
.btn-send {
  padding: 15px 20px;
  font-size: 18px;
  width: 100%;
  max-width: 160px;
}
</style>
