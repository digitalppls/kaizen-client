<template>
  <div>
    <div class="ref-link-bar">
      <button
        v-if="hasPayedMembershipFee"
        id="copy"
        class="ref-link-bar__btn"
        @click.prevent="copyText"
      >
        <svg
          v-if="!copied"
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="44" height="44" rx="22" fill="black" />
          <path
            d="M17.7497 33H23.7498C25.8176 33 27.4999 31.3327 27.4999 29.2833V18.5263C27.4999 16.4769 25.8176 14.8096 23.7498 14.8096H17.7497C15.6819 14.8096 13.9996 16.4769 13.9996 18.5263V29.2833C13.9996 31.3327 15.6819 33 17.7497 33ZM23.7498 16.0485C25.1284 16.0485 26.2499 17.16 26.2499 18.5263V29.2833C26.2499 30.6495 25.1284 31.7611 23.7498 31.7611H17.7497C16.3712 31.7611 15.2496 30.6495 15.2496 29.2833V18.5263C15.2496 17.16 16.3712 16.0485 17.7497 16.0485H23.7498ZM28.75 27.0517V14.7167C28.75 13.3504 27.6285 12.2389 26.2499 12.2389H20.2498C19.4314 12.2389 18.6633 12.6374 18.1952 13.3048C17.9982 13.5857 17.6087 13.6551 17.3253 13.4599C17.0419 13.2647 16.9718 12.8786 17.1688 12.5977C17.8703 11.5973 19.0221 11 20.2498 11H26.2499C28.3177 11 30 12.6673 30 14.7167V27.0517C30 27.3938 29.7202 27.6712 29.375 27.6712C29.0298 27.6712 28.75 27.3938 28.75 27.0517Z"
            fill="#ffffff"
          />
        </svg>
        <svg
          v-if="copied"
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="44" height="44" rx="22" fill="black" />
          <path
            d="M15 25L19.5 29.5L28.5 15"
            stroke="#ffffff"
            stroke-width="2"
            stroke-linecap="square"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <div class="ref-link-bar__group">
        <div class="ref-link-bar__label">
          {{ $t(label) }}:
        </div>
        <div class="ref-link-bar__input">
          <template v-if="hasPayedMembershipFee">
            {{ ref }}
          </template>
          <template v-else>
            {{ $t("REFERRAL_LINK_AVAILABLE") }}
          </template>
        </div>
      </div>
    </div>
    <p v-if="false" class="color-gray-light m-t-20 lh-15 small" v-html="$t('REFERRAL_LINK_DESC')" />
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
      default: "YOU_LINK"
    }
  },
  data () {
    return {
      copied: false
    };
  },
  computed: {
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
  padding: 15px 30px;
  background: var(--color-primary);
  border-radius: var(--border-radius);

  @include respond-before("md") {
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
  }

  &__group {
    padding: 0;

    @include respond-before("md") {
      margin-right: 30px;
    }
    @include respond-before("lg") {
      margin-right: 50px;
    }
  }

  &__label {
    color: var(--color-dark);
    margin-bottom: 12px;

    @include respond-before("md") {
      margin-bottom: 8px;
    }
  }

  &__input {
    font-size: 16px;
    color: var(--color-dark);
    word-break: break-all;
    @include fontTTNorms("bold");

    @include respond-before("md") {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      //margin: auto 30px;
    }

    //@include respond-before("xl") {
    //  margin: auto 50px;
    //}
  }

  &__btn {
    margin-left: auto;
    cursor: pointer;

    @include respond-before("md") {
      order: 3;
    }
  }
}
</style>
