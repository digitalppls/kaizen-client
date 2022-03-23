<template>
  <div class="balance-info">
    <div
      v-if="!emailVerified"
      class="color-white m-b-20"
      style="background: #446ca9; padding: 20px;"
    >
      <div class="m-b-20">
        {{ $t("VERIFY_EMAIL_MSG") }}
      </div>

      <nuxt-link :to="localePath('/my/profile')" class="btn btn-yellow btn-small" style="padding: 10px 20px; font-size: 14px;">
        {{ $t("CONFIRM_EMAIL") }}
      </nuxt-link>
    </div>

    <section class="balance-info__top">
      <h3 class="color-white m-b-5">
        {{ $t("BALANCE_INFORMATION") }}
      </h3>

      <div class="m-l-a">
        <button
          :disabled="!emailVerified"
          class="btn btn-deposit"
          @click="openModal('deposit')"
        >
          {{ $t("DEPOSIT") }}
        </button>
        <button
          :disabled="!emailVerified"
          class="btn btn-dark btn_set-opacity"
          @click="openModal('withdraw')"
        >
          {{ $t("WITHDRAW") }}
        </button>
        <nuxt-link v-if="false" :to="localePath('my-buy')" class="btn btn-buy">
          {{ $t("BUY") }}
        </nuxt-link>
      </div>
    </section>

    <user-wallets :sales="sales" />

    <ui-modal
      v-if="showModal"
      :max-width="(modal === 'deposit' || modal === 'withdraw') ? '700px' : '580px'"
      @close="closeModal"
    >
      <h2 class="modal-title m-b-40">
        {{ $t(modal.toUpperCase()) }}
      </h2>
      <wallet33
        :method="modal === 'deposit' ? 0 : 1"
        only-types="bep20usdt,trc20usdt,bep20btc,bep20kzn,bep20vng,bep20srk"
      />
    </ui-modal>
  </div>
</template>

<script>
import UserWallets from "~/components/balance/user-wallets";
import Wallet33 from "~/components/wallet33";

export default {
  name: "BalanceInfo",
  components: { Wallet33, UserWallets },
  props: {
    sales: {
      type: Array,
      default: Array
    }
  },
  data () {
    return {
      showModal: false,
      modal: ""
    };
  },
  computed: {
    emailVerified () {
      return this.$store.getters.user?.emailVerified ?? false;
    }
  },
  methods: {
    /** Открыть модальное окно */
    openModal (modal) {
      this.showModal = true;
      this.modal = modal;
    },

    /** Закрыть модальное окно */
    closeModal () {
      this.showModal = false;
      this.modal = "";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/balance-info.scss";
</style>
