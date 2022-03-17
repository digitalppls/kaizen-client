<template>
  <div>
    <div class="ref-link-bar">
      <div v-if="label" class="ref-link-bar__label">
        {{ label }}:
      </div>

      <div class="ref-link-bar__group m-b-20">
        <div class="ref-link-bar__input">
          {{ ref }}
        </div>
        <button
          id="copy"
          class="ref-link-bar__btn"
          @click.prevent="copyText"
        >
          <svg
            v-if="!copied"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 7V17C18 17.2652 17.8946 17.5196 17.7071 17.7071C17.5196 17.8946 17.2652 18 17 18H7C6.73478 18 6.48043 17.8946 6.29289 17.7071C6.10536 17.5196 6 17.2652 6 17V7C6 6.73478 6.10536 6.48043 6.29289 6.29289C6.48043 6.10535 6.73478 6 7 6H17C17.2652 6 17.5196 6.10535 17.7071 6.29289C17.8946 6.48043 18 6.73478 18 7ZM3 11H2V2H11V3C11 3.26522 11.1054 3.51957 11.2929 3.70711C11.4804 3.89464 11.7348 4 12 4C12.2652 4 12.5196 3.89464 12.7071 3.70711C12.8946 3.51957 13 3.26522 13 3V1C13 0.734783 12.8946 0.480429 12.7071 0.292893C12.5196 0.105357 12.2652 0 12 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.480429 0 0.734783 0 1V12C0 12.2652 0.105357 12.5196 0.292893 12.7071C0.48043 12.8946 0.734784 13 1 13H3C3.26522 13 3.51957 12.8946 3.70711 12.7071C3.89464 12.5196 4 12.2652 4 12C4 11.7348 3.89464 11.4804 3.70711 11.2929C3.51957 11.1054 3.26522 11 3 11Z"
              fill="#898b8c"
            />
          </svg>
          <svg
            v-if="copied"
            width="18"
            height="13"
            viewBox="0 0 18 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.71681 10.2576L1.44839 6.21657L0 7.58776L5.71681 13L18 1.37123L16.5516 0L5.71681 10.2576Z"
              fill="var(--col-accent)"
            />
          </svg>
        </button>
      </div>

      <div class="ref-link-bar__group">
        <div class="font-300" style="margin-right: 10px;">
          {{ $t("YOUR_INVITE_CODE") }}:
        </div>
        <div class="ref-link-bar__input">
          {{ refCode }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const protocol = window ? window.location.protocol : "https:";
const host = window ? window.location.host : "";
const DOMAIN = `${protocol}//${host}`;

export default {
  name: "ReferralLinkBar",
  props: {
    domain: {
      type: String,
      default: DOMAIN
    },
    label: {
      type: String,
      default: ""
    }
  },
  data () {
    return {
      copied: false
    };
  },
  computed: {
    /* Реферальный код */
    refCode () {
      return this.$store.getters.user?.num_id ?? null;
    },
    /* Реферальная ссылка */
    ref () {
      return this.$store.getters.user && this.$store.getters.user._id
        ? `${this.domain}/r/${this.$store.getters.user._id}`
        : "user not found";
    },
    hasPayedMembershipFee () {
      return true; // !!this.$store.getters.userProducts.length;
    }
  },
  methods: {
    copyText () {
      const text = this.ref;
      const textArea = document.createElement("textarea");
      textArea.width = "1px";
      textArea.height = "1px";
      textArea.background = "transparent";
      textArea.value = text;
      document.body.append(textArea);
      textArea.select();
      textArea.setSelectionRange(0, 999999999);
      document.execCommand("copy");
      document.body.removeChild(textArea);

      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    }
  }
};
</script>

<style lang="scss" scoped>
.ref-link-bar {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 15px;
  background-color: #151618;

  @include respond-before("pre-md") {
    padding: 30px;
  }

  &__group {
    padding: 0;
    display: flex;
    //flex-wrap: wrap;
    align-items: center;
  }

  &__label {
    @include h3;
    color: #fff;
    margin-top: 0;
    margin-bottom: 20px;
  }

  &__input {
    font-size: 16px;
    word-break: break-all;
    color: var(--col-accent);

    @include respond-before("md") {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  &__btn {
    margin-left: auto;
    cursor: pointer;
    background: transparent;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;

    @include respond-before("md") {
      padding: 0;
    }
  }
}
</style>
