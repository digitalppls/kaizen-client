<template>
  <div v-if="$store.getters.hasToken" class="userbar">
    <ui-dropdown>
      <template #selected>
        <div class="userbar__dropdown-trigger btn-small">
          <span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.75 15.75H12V18H16.1595C16.6476 17.9994 17.1155 17.8052 17.4605 17.46C17.8056 17.1148 17.9996 16.6468 18 16.1588V12H15.75V15.75Z" fill="#555860" />
              <path d="M2.25 2.25H6V0H1.84125C1.35304 0.00039724 0.884944 0.194513 0.539728 0.539728C0.194513 0.884944 0.00039724 1.35304 0 1.84125L0 6H2.25V2.25Z" fill="#555860" />
              <path d="M2.25 12H0V16.1588C0.00039724 16.647 0.194513 17.1151 0.539728 17.4603C0.884944 17.8055 1.35304 17.9996 1.84125 18H6V15.75H2.25V12Z" fill="#555860" />
              <path d="M16.1595 0H12V2.25H15.75V6H18V1.84125C17.9996 1.35317 17.8056 0.885187 17.4605 0.539993C17.1155 0.194799 16.6476 0.000595783 16.1595 0V0Z" fill="#555860" />
              <path d="M9 8.25C10.4497 8.25 11.625 7.07475 11.625 5.625C11.625 4.17525 10.4497 3 9 3C7.55025 3 6.375 4.17525 6.375 5.625C6.375 7.07475 7.55025 8.25 9 8.25Z" fill="#555860" />
              <path d="M4.5 14.25H13.5C13.5 14.0833 13.5 13.9166 13.5 13.7498C13.5 11.5408 11.7093 9.74997 9.50022 9.74997C9.16681 9.74997 8.83341 9.74997 8.5 9.74997C6.29086 9.74999 4.5 11.5409 4.5 13.75C4.5 13.9167 4.5 14.0833 4.5 14.25Z" fill="#555860" />
            </svg>
          </span>
          <span class="user-id">{{ userId }}</span>
          <img :src="require(`~/assets/img/dropdown_arrow.svg`)" alt="">
        </div>
      </template>
      <div class="menu__item menu__item--email menu__item--wide">
        {{ userEmail }}
      </div>
      <nuxt-link
        v-for="(item, idx) in usermenu"
        :key="idx"
        :to="localePath(item.to)"
        class="menu__item"
        no-prefetch
        exact
      >
        {{ $t(item.title) }}
      </nuxt-link>
      <button
        class="menu__item menu__item--wide menu__item--logout"
        @click="logout"
      >
        {{ $t("LOGOUT") }}
      </button>
    </ui-dropdown>
  </div>
</template>

<script>
import UiDropdown from "~/components/ui/ui-dropdown";

export default {
  name: "UserBar",
  components: { UiDropdown },
  data () {
    return {
      userId: "0x56...aA9c"
    };
  },
  computed: {
    user () {
      return this.$store.getters.user;
    },
    userName () {
      return this.user.username.length > 6
        ? `${this.user.username.slice(0, 6)}..`
        : this.user.username;
    },
    userEmail () {
      const email = this.user?.email.split("@");
      const left = email?.[0].slice(0, 2);
      const right = email?.[1];
      return `${left}***@${right}`;
    },
    usermenu () {
      return [
        {
          title: "DASHBOARD",
          to: "my"
        },
        {
          title: "PROFILE",
          to: "my-profile"
        }
      ];
    }
  },
  methods: {
    logout () {
      this.$store.dispatch("logout");
      this.$router.push(this.localePath("auth"));
    }
  }
};
</script>

<style lang="scss" scoped>
.menu {
  $self: &;

  &__item {
    text-align: left;
    display: block;
    margin: 0 -20px;
    padding: 15px 20px;
    color: var(--color-gray);
    font-size: 16px;
    opacity: 1 !important;

    &:first-child {
      margin-top: -15px;
    }

    &:last-child {
      margin-bottom: -15px;
      background-color: #373b40;
    }

    &:not(#{$self}__item--email):hover {
      cursor: pointer;
      background-color: #373b40;
    }

    &:not(#{$self}__item--logout,#{$self}__item--email):hover {
      color: #FFFFFF;
    }

    //&.nuxt-link-active {
    //  background-color: darken(#E2E3E9, 10%);
    //  //background-color: var(--color-primary);
    //
    //  svg path {
    //    fill: var(--color-primary);
    //  }
    //}

    &--email {
      font-size: 16px;
    }

    &--wide {
      width: calc(100% + 40px);
    }

    &--logout {
    }
  }
}

.userbar {
  position: relative;
  z-index: 25;

  &::v-deep .dropdown__content {
    background: #1F2124;
    box-shadow: 0 4px 16px rgb(162 162 175 / 16%);
    overflow: hidden;
    border-radius: 0;

    @include respond-to("md") {
      position: relative;
      width: auto;
      left: 0;
    }
  }

  &-username {
    @include respond-to("md") {
      width: 100%;
    }
  }
}

.userbar__dropdown {
  display: none;
  @include respond-before("md") {
    display: block;
  }
  &-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #202125;
    width: 151px;
  }
}

.user-id {
  font-weight: normal;
  font-size: 14px;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  color: #FFFFFF;
}
</style>
