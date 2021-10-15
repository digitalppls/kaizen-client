<template>
  <div v-if="$store.getters.hasToken" class="userbar">
    <ui-dropdown>
      <template #selected>
        {{ userName }}
      </template>
      <nuxt-link
        v-for="(item, idx) in usermenu"
        :key="idx"
        :to="localePath(item.to)"
        class="menu__item"
        no-prefetch
        exact
        @click.native="menuShow = false"
      >
        {{ $t(item.title) }}
      </nuxt-link>
      <button
        class="menu__item menu__item--wide text-left"
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
  name: "Userbar",
  components: { UiDropdown },
  data () {
    return {
      menuShow: false
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
    usermenu () {
      return [
        {
          title: "PROFILE",
          to: "profile"
        }
      ];
    }
  },
  mounted () {
    document.addEventListener("click", this.close);
  },
  beforeDestroy () {
    document.removeEventListener("click", this.close);
  },
  methods: {
    logout () {
      this.$store.dispatch("logout");
      this.$router.push(this.localePath("login"));
    },
    toggleUserBarMenu () {
      this.menuShow = !this.menuShow;
    },
    close (e) {
      if (!this.$el.contains(e.target)) {
        this.menuShow = false;
      }
    },
    changePasswordModal () {
      this.menuShow = false;
      this.$emit("password-modal");
    }
  }
};
</script>

<style lang="scss" scoped>
.menu {
  &__item {
    cursor: pointer;
    margin-bottom: 20px;
    display: block;
    color: #fff;
    font-size: 14px;
    @include fontTTNorms("medium");

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      color: var(--color-gray-light);
    }

    &.nuxt-link-active {
      color: var(--color-primary);

      svg path {
        fill: var(--color-primary);
      }
    }

    &--wide {
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
