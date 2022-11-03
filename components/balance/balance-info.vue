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

      <nuxt-link :to="localePath('/my/profile') + '#verifyemail'" class="btn btn-yellow btn-small" style="padding: 10px 20px; font-size: 14px;">
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
      max-width="580px"
      @close="closeModal"
    >
      <h2 class="modal-title m-b-40">
        {{ $t(modal.toUpperCase()) }}
      </h2>
      <w33-deposit v-if="modal === 'deposit'" />
      <w33-withdraw v-else />
    </ui-modal>
  </div>
</template>

<script>
import UserWallets from "~/components/balance/user-wallets";
import W33Deposit from '../W33Deposit';
import W33Withdraw from '../W33Withdrawal';

export default {
  name: "BalanceInfo",
  components: { W33Withdraw, W33Deposit, UserWallets },
  props: {
    sales: {
      type: Array,
      default: Array
    }
  },
  data () {
    return {
      showModal: false,
      modal: "",
    };
  },
  computed: {
    withdrawalList () {
      return this.$store.getters.withdrawalList;
    },
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
