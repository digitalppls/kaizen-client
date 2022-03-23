<template>
  <div v-if="walletId && userVerified">
    <div v-if="showIframe">
      <iframe
        id="iframe"
        ref="iframe"
        :src="url"
        style="width:100%; height: 100%; min-height: 600px;"
        width="100%"
        height="100%"
        frameBorder="0"
      />
    </div>

    <div
      class="w100p"
      @click="showIframe=true"
    >
      <slot />
    </div>
  </div>
  <div v-else-if="!userVerified">
    <p class="m-b-30">
      {{ $t("VERIFY_EMAIL_MSG_WALLET33") }}
    </p>

    <verify-email />
  </div>
  <button
    v-else
    class="btn btn-solid"
    @click="walletCreate"
  >
    {{ $t("WALLET_CREATE") }}
  </button>
</template>

<script>
import VerifyEmail from "~/components/verify-email";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Wallet33",
  components: { VerifyEmail },
  props: {
    onlyTypes: {
      type: String,
      default: ""
    },
    method: {
      type: [String, Boolean, Number],
      default: ""
    }
  },
  data () {
    return {
      wallet: null,
      theme: "dark",
      showIframe: true
    };
  },
  computed: {
    tester () {
      return this.$store.getters.user?.permissions?.includes("tester");
    },
    testnet () {
      return this.$store.getters.config?.network === "testnet";
    },
    origin () {
      return "https://" + (this.testnet ? "test." : "") + "api.wallet33.com";
    },
    url () {
      return `${this.origin}/v1/wallet/form?theme=${this.theme}&walletId=${this.walletId}&method=${this.method}&onlyTypes=${this.onlyTypes}&lang=${this.$i18n.locale}`;
    },
    walletId () {
      return this.$store.getters.user?.wallet33Id ?? null;
    },
    userVerified () {
      return this.$store.getters.user?.emailVerified ?? null;
    }
  },
  methods: {
    walletCreate () {
      this.$API.UserWalletCreate((response) => {
        console.log(response);
        this.$store.dispatch("updateUser", response.data);
      }, (error) => {
        console.log("Wallet33", error);
      });
    }
  }
};
</script>
