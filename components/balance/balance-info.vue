<template>
  <div class="balance-info">
    <nuxt-link :to="localePath('/my/profile')">
      <div v-if="!emailVerified" class="w-100 text-center btn btn-outline--primary btn-small m-b-20">
        Please Verify your email address for access to deposit!
      </div>
    </nuxt-link>

    <section class="balance-info__top">
      <h2 class="color-white">
        {{ $t("BALANCE_INFORMATION") }}
      </h2>

      <div class="m-l-a">
        <button
          :disabled="!emailVerified"
          class="btn btn-blue"
          @click="openModal('deposit')"
        >
          {{ $t("DEPOSIT") }}
        </button>
        <button
          :disabled="!emailVerified"
          class="btn"
          @click="openModal('withdraw')"
        >
          {{ $t("WITHDRAW") }}
        </button>
        <nuxt-link v-if="false" :to="localePath('my-buy')" class="btn btn-yellow">
          {{ $t("BUY") }}
        </nuxt-link>
      </div>
    </section>

    <user-wallets />

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
