<template>
  <div
    v-if="walletId && userEmailVerified"
    class="w33"
  >
    <p class="accessed-value">
      {{ $t('W33_SELECT_NETWORK') }}:
    </p>
    <ui-select
      v-model="network"
      :options="networkList"
      class="m-b-20"
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

    <div v-if="!selectedAddress" style="min-height: 100px;" />

    <!-- Когда выбрана сеть и есть адрес кошелька -->
    <template v-if="selectedAddress">
      <p class="accessed-value">
        {{ $t('W33_ACCEPT_TOKENS') }}
        <strong class="color-main">{{ $networkName(network, true) }}</strong>:
      </p>
      <p>
        <span
          v-for="(token, idx) in $cryptoSupported[network]"
          :key="idx"
          class="color-main m-r-10"
          style="display: inline-flex; align-items: center;"
        >
          <img
            :src="require(`~/assets/img/tokens/${token.toLowerCase()}.svg`)"
            :alt="token"
            :title="token.toUpperCase()"
            style="margin-right: 4px; width: 20px;"
          >
          {{ token.toUpperCase() }}
        </span>
      </p>

      <p class="accessed-value color-yellow m-t-20 m-b-20">
        {{ $t('W33_DEPOSIT_WARNING') }} <strong>{{ $networkName(network) }}</strong>.
      </p>
      <p class="accessed-value">{{ $t('W33_TRANSFER_TO') }}:</p>

      <ui-text-field
        v-model="selectedAddress"
        type="text"
        disabled
      />

      <button
        class="btn btn-small m-t-10"
        @click="showQRCode = !showQRCode"
        v-text="'QR code'"
      />

      <div v-if="showQRCode">
        <img
          :src="qrLink"
          alt=""
        >
      </div>

      <div
        style="opacity: .5; font-size: 14px; font-weight: normal;"
        class="color-gray m-t-20"
        v-html="$t('W33_BLOCKCHAIN_FEE')"
      />
    </template>
  </div>
  <!-- Аккаунт не активирован: нужна верификация почты -->
  <div v-else-if="!userEmailVerified">
    <p>
      {{ $t('VERIFY_EMAIL_MSG_WALLET33') }}
    </p>
    <verify-email />
  </div>
  <!-- Нет кошелька Wallet33 и нужно создать -->
  <div v-else-if="!walletId">
    <p>
      To replenish the balance, you need to create a wallet
    </p>
    <button
      :loading="loading"
      @click="walletCreate"
    >
      Create wallet
    </button>
  </div>
</template>

<script>

import UiSelect from './ui/ui-select.global';
import UiTextField from './ui/ui-text-field.global';
import VerifyEmail from './verify-email';

export default {
  name: 'W33Deposit',
  components: { VerifyEmail, UiTextField, UiSelect },
  props: {
    amount: {
      type: [String, Number],
      default: 0
    },
    sale: {
      type: Object,
      default () {
        return null;
      }
    }
  },
  data () {
    return {
      token: null,
      wallet: null,
      showQRCode: false,
      loading: false,
      network: this.$t('SELECT'),
      addressInputMsg: ''
    };
  },
  computed: {
    user () {
      return this.$store.getters.user;
    },
    w33Assets () {
      return this.user?.wallet33Assets ?? [];
    },
    networkList () {
      /*let list = []

      if (this.sale) {
        list = Object.keys(this.$cryptoSupported)
      } else {
        Object.keys(this.$cryptoSupported).forEach((coinsArray, networkIndex) => {
          console.log(coinsArray, networkIndex);
          if (this.$cryptoSupported[coinsArray].find(x => x === this.token)) {
            list.push(Object.keys(this.$cryptoSupported)[networkIndex])
          }
        })
      }*/
      return Object.keys(this.$cryptoSupported);
    },
    selectedAddress () {
      return this.w33Assets.find(x => x.network === this.network)?.address ?? '';
    },
    qrLink () {
      return `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${this.selectedAddress}&choe=UTF-8`;
    },
    walletId () {
      return this.user?.wallet33Id ?? null;
    },
    userEmailVerified () {
      return this.user?.emailVerified;
    }
  },
  methods: {
    /** Создание кошелька */
    walletCreate () {
      this.loading = true;
      this.$API.UserWalletCreate((r) => {
        this.$store.commit('user/updateUser', r.user);
        this.$store.commit('push/addMessage', {
          type: 'success',
          text: 'Wallet created'
        });
        this.loading = false;
      }, (error) => {
        this.loading = false;
        this.$store.commit('push/addMessage', {
          type: 'error',
          text: error?.message ?? error
        });
      });
    },

    /** Скопировать текст */
    copyText () {
      navigator.clipboard.writeText(this.selectedAddress);
      this.addressInputMsg = 'Copied to clipboard!';
      setTimeout(() => (this.addressInputMsg = ''), 1000);
    }
  }
};
</script>

<style
  lang="scss"
  scoped
>
.btn {
  display: inline-flex;
  align-items: center;
}

.address-wallet {
  font-size: 20px;
  font-weight: 500;
  word-break: break-all;
}

.w33-address.v-text-field--enclosed .v-input__append-inner {
  margin-top: 0;
}
</style>
