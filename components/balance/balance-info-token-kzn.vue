<template>
  <div class="balance-info">
    <div class="balance-info__top">
      <p class="font-bold">
        {{ $t("TOKENS") }} KZN
      </p>
      <div class="m-l-a">
        <button
          :disabled="!balance"
          class="btn btn-solid btn-small"
          @click="openModal('buy')"
        >
          {{ $t("BUY") }}
        </button>
        <button
          :disabled="!balance"
          class="btn btn-solid--tertiary btn-small"
          @click="openModal('sell')"
        >
          {{ $t("WITHDRAW") }}
        </button>
      </div>
    </div>
    <div>
      {{ $t("BALANCE") }}:
    </div>
    <div>
      <span class="font-size-30 font-bold">
        {{ balance.toLocaleString($i18n.locale, $LOCALESTRING_CRYPTO()) }}
        <span class="font-medium font-size-14">KZN</span>
      </span>
      <small class="color-gray">
        ≈ ${{ $toUsd("KZN", balance).toLocaleString("en-US", { maximumFractionDigits: 3 }) }}
      </small>
    </div>


    <ui-modal
      v-if="showModal"
      @close="closeModal"
    >
      <h2 class="modal-title m-b-40">
        {{ $t(modal.toUpperCase()) }} KZN
      </h2>
      <p>
        In developing...
      </p>
    </ui-modal>
  </div>
</template>

<script>
export default {
  name: "BalanceInfoTokenKzn",
  data () {
    return {
      showModal: false,
      modal: ""
    };
  },
  computed: {
    balance () {
      return this.$store.getters.wallets.find(e => e.symbol === "kzn")?.amount ?? 0;
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
@import "~/assets/scss/layouts/balance-info.scss";
</style>
