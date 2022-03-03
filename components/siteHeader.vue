<template>
  <header
    :class="['header', {'header--fixed': scrollY > 100}]"
  >
    <div class="container">
      <div class="header_logo">
        <nuxt-link
          exact
          :to="localePath('index')"
        >
          <img src="~/assets/img/logo.svg" alt="">
        </nuxt-link>
      </div>

      <div class="header_menu">
        <nav class="menu">
          <ul class="menu_list">
            <li
              v-for="(item, key) in menuItems"
              :key="key"
            >
              <a
                v-if="$externalLink(item.url)"
                :class="['animate__animated', 'wow', 'animate__slideInDown']"
                :data-wow-delay="`${key / menuItems.length}s`"
                :href="item.url"
                v-text="item.title"
              />
              <nuxt-link
                v-else-if="item.url === 'indexes'"
                :to="localePath('index')"
                :class="['animate__animated', 'wow', 'animate__slideInDown']"
                :data-wow-delay="`${key / menuItems.length}s`"
                @click="goTo(item.url)"
                v-text="item.title"
              />
              <nuxt-link
                v-else
                :exact="!!localePath('index')"
                no-prefetch
                :to="item.url"
                :class="['animate__animated', 'wow', 'animate__slideInDown', {'active' : $route.matched[0].path.replace('/', '') === item.url}]"
                :data-wow-delay="`${key / menuItems.length}s`"
                active-class="active"
                v-text="item.title"
              />
            </li>
          </ul>
        </nav>
        <lang-switcher class="m-r-40" />
        <user-bar v-if="hasToken" />
        <button v-else class="btn btn-small btn-outline userbar-username">
          {{ $t("LOGIN") }}
        </button>
      </div>
      <button
        class="header_burger"
        @click="toggleMenu"
      >
        <span />
      </button>
    </div>
  </header>
</template>

<script>
import UserBar from "./userbar";
import langSwitcher from "~/components/langSwitcher.vue";

export default {
  name: "SiteHeader",
  components: { UserBar, langSwitcher },
  props: {
    user: {
      type: Object,
      default () {
        return {};
      }
    },
    isAuthPage: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scrollY: 0,
      menuVisible: false,
      changePasswordModal: false,
      menuItems: [
        {
          title: this.$t("HOME"),
          url: this.localePath("index")
        },
        {
          title: this.$t("INDEXES"),
          url: this.localePath("indexes")
        },
        {
          title: this.$t("MINING"),
          url: this.localePath("mining")
        },
        {
          title: this.$t("PRODUCTION"),
          url: this.localePath("production")
        },
        {
          title: this.$t("INDICATORS"),
          url: this.localePath("indicators")
        }
      ]
    };
  },
  computed: {
    hasToken () {
      return this.$store.getters.hasToken;
    },
    servicePage () {
      const pages = ["login", "verify", "new-password", "r-id"];
      return !!pages.find(i => this.$route.name.includes(i));
    },
    balance () {
      return this.$store.getters.wallets.map(x => x.amountUsd).reduce((a, b) => a + b, 0);
    },
    wallets () {
      return this.$store.getters.wallets || [];
    },
    isHomePage () {
      return this.$route.matched[0].path.replace("/", "") === "";
    },
    isMy () {
      return this.$route.matched[0].path.replace("/", "") === "my";
    }
  },
  beforeMount () {
    window.addEventListener("scroll", this.headerFixed);
  },
  beforeDestroy () {
    window.removeEventListener("scroll", this.headerFixed);
  },
  methods: {
    headerFixed () {
      this.scrollY = window.scrollY;
    },

    /** Переключение меню */
    toggleMenu () {
      this.menuVisible = !this.menuVisible;
      document.body.classList.toggle("menu");
    },

    /** Окно с изменением пароля */
    onchangePasswordModal () {
      this.changePasswordModal = !this.changePasswordModal;
      this.menuVisible = false;
    },

    /** Скроллинг к anchor */
    goTo (id) {
      const element = document.getElementById(id);
      const top = element.offsetTop;

      window.scrollTo(0, top);
    }
  }
};
</script>

<style lang="scss" scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0;
  z-index: 999;
  background-color: var(--body-bg);
  transition: padding $transition, background $transition;

  &--transparent {
    background-color: transparent;
  }

  .container {
    display: flex;
    align-items: center;
    min-height: 70px;
    border-bottom: 1px solid #e2e3e9;

    @include respond-before("lg") {
      min-height: 70px;
    }
  }

  &--sticky {
    top: 0;
    left: 0;
    right: 0;
    z-index: 90;
    position: fixed;
    padding: 15px 0;
    background: rgba(#100f0f, 0.8);
    //background: var(--body-bg);
  }

  &.site-header--sticky.site-header--default {
    padding-top: 25px;
    background: transparent;
  }

  &--default {
    @include respond-before("lg") {
      background: transparent;
    }
  }

  &-item {
    height: 100%;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
  }
}

.site-header-userbar-mobile {
  @include respond-before("md") {
    display: none;
  }
}

.site-header-logo {
  margin-right: 20px;
  margin-left: 0;
  position: relative;
  z-index: 25;

  @include respond-before("lg") {
    margin-right: 20px;
    margin-left: 0;
  }
  @include respond-before("xl") {
    margin-right: 30px;
  }

  svg {
    @include respond-to("xs") {
      width: 150px;
    }
  }
}

.site-header-space {
  margin-left: auto;
  margin-right: auto;
}

.site-header-right {
  display: flex;
  align-items: center;
  flex-flow: row wrap;

  @include respond-before("lg") {
    margin-left: auto;
  }
}

.site-header-lang {
  position: relative;
  z-index: 30;
  display: none;

  @include respond-before("md") {
    display: block;
  }

  &--visible {
    @include respond-to("md") {
      display: block;
    }
  }
}

.site-header-menu {
  $self: &;
  @include respond-to("lg") {
    display: none;
  }

  &__list {
    list-style-type: none;

    @include respond-before("lg") {
      display: flex;
      flex-wrap: wrap;
      //flex-direction: column;
      align-items: flex-start;
    }
    //@include respond-before("xl") {
    //  display: flex;
    //  flex-wrap: wrap;
    //  flex-direction: row;
    //  align-items: center;
    //}
    @include respond-to("lg") {
      text-align: center;
    }
  }

  &__item {
    margin: 15px auto;
    padding: 0;
    line-height: 1em;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;

    @include respond-before("lg") {
      margin: 0;

      &:last-child {
        margin-right: 0;
      }
    }
    @include respond-before("xl") {

    }
  }

  &__link {
    color: #555860;
    display: block;
    padding: 15px 20px; // 15px 26px
    border-radius: 12px;

    @include respond-before("lg") {
      padding: 15px;
    }
    @include respond-before("xl") {
      padding: 15px 20px;
    }

    &:hover {
      color: var(--color-dark);
    }

    &.active {
      color: var(--color-dark);
      font-weight: 600;
    }
  }

  &__top {
    text-align: center;
    margin-bottom: 50px;
  }

  &__bottom {
    margin-top: 50px;
    text-align: center;
  }

  &--mobile {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 20;
    height: 100vh;
    padding: 70px 15px 40px;
    overflow-y: auto;
    background: var(--body-bg);

    @include respond-before("lg") {
      display: none;
    }

    &-visible {
      display: block;
    }
  }

  &--desktop {
    @include respond-to("lg") {
      display: none;
    }
  }
}

.site-header-item--desktop {
  display: none;

  @include respond-before("md") {
    display: flex;
  }
}

.btn-burger {
  border-radius: 10px;
  width: 40px;
  height: 40px;
  padding: 0;
  background: rgba(167, 169, 183, 0.07);
  border: 1px solid #555860;
  position: relative;
  z-index: 30;
  margin-left: 30px;

  @include respond-before("lg") {
    display: none;
  }
}

.btn-logout {
  padding: 0;
  font-size: 14px;
}

.user-balance {
  font-weight: 500;

  &::v-deep .dropdown__toggle {
    text-align: right;
  }

  &::v-deep .dropdown__content {
    width: 250px;
  }

  &--mobile {
    @include respond-before("md") {
      display: none;
    }
  }

  &--desktop {
    margin-right: 20px;

    @include respond-to("md") {
      display: none;
    }
  }
}
</style>
