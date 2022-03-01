<template>
  <div v-if="$store.getters.hasToken" class="userbar">
    <ui-dropdown>
      <template #selected>
        <button class="btn btn-small btn-outline userbar-username">
          {{ userName }}
        </button>
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
    return {};
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
      const email = this.user.email.split("@");
      const left = email[0].slice(0, 2);
      const right = email[1];
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
    color: var(--base-text);

    &:first-child {
      margin-top: -15px;
    }

    &:last-child {
      margin-bottom: -15px;
    }

    &:not(#{$self}__item--email):hover {
      cursor: pointer;
      background-color: darken(#e2e3e9, 5%);
      //color: var(--color-primary);
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
      font-size: 20px;
    }

    &--wide {
      width: calc(100% + 40px);
    }

    &--logout {
      border-top: 1px solid darken(#e2e3e9, 5%);
    }
  }
}

.userbar {
  position: relative;
  z-index: 25;

  &::v-deep .dropdown__content {
    background: #e2e3e9;
    box-shadow: 0 4px 16px rgb(162 162 175 / 16%);
    border-radius: 0 0 12px 12px;
    overflow: hidden;

    @include respond-to("md") {
      position: relative;
      border-radius: 12px;
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
}
</style>
