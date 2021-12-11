<template>
  <div id="token-vng" class="balance-info">
    <div class="balance-info__top">
      <p class="font-bold">
        {{ $t("TOKENS") }} VNG
      </p>
      <div class="m-l-a">
        <button
          :disabled="!$store.getters.user.emailVerified"
          class="btn btn-solid btn-small"
          @click="openModal('buy')"
        >
          {{ $t("BUY") }}
        </button>
        <button
          :disabled="true"
          class="btn btn-solid--tertiary btn-small"
          @click="openModal('sell')"
        >
          <!--  && !$store.getters.user.emailVerified && !balance -->
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
        <span class="font-medium font-size-14">VNG</span>
      </span>
      <small class="color-gray">
        ≈ ${{ $toUsd("VNG", balance).toLocaleString("en-US", { maximumFractionDigits: 3 }) }}
      </small>
    </div>


    <ui-modal
      v-if="showModal"
      @close="closeModal"
    >
      <token-swap input-currency="VNG" type="token" :mode="modal" />
    </ui-modal>
  </div>
</template>

<script>
import TokenSwap from "~/components/token-swap";
export default {
  name: "BalanceInfoTokenVng",
  components: { TokenSwap },
  data () {
    return {
      showModal: false,
      modal: "",
      mode: ""
    };
  },
  computed: {
    balance () {
      return this.$store.getters.wallets.find(e => e.symbol === "vng")?.amount ?? 0;
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
