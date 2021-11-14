<template>
  <header :class="['site-header']">
    <div class="site-header-container container">
      <nuxt-link
        exact
        :to="localePath('index')"
        class="site-header-item site-header-logo"
        :style="!menuItems.length ? 'margin-left: 0': null"
      >
        <logo />
      </nuxt-link>

      <lang-switcher :class="['site-header-lang', { 'site-header-lang--visible': true }]" />

      <div class="site-header-space" />

      <nav
        v-if="!servicePage"
        ref="desktopmenu"
        class="site-header-item site-header-menu site-header-menu--desktop"
      >
        <ul class="site-header-menu__list">
          <li
            v-for="(item, idx) in menuItems"
            :key="idx"
            class="site-header-menu__item"
          >
            <a
              v-if="item.url === 'indexes' && isHomePage"
              :href="`#${item.url}`"
              :class="['site-header-menu__link']"
              @click="goTo(item.url)"
              v-text="$t(item.title)"
            />
            <nuxt-link
              v-else-if="item.url === 'indexes'"
              :to="`${localePath('index')}#${item.url}`"
              :class="['site-header-menu__link']"
              v-text="$t(item.title)"
            />
            <nuxt-link
              v-else
              :exact="!!localePath('index')"
              no-prefetch
              :to="localePath(item.url)"
              :class="['site-header-menu__link', {'active' : $route.matched[0].path.replace('/', '') === item.url}]"
              active-class="active"
              v-text="$t(item.title)"
            />
          </li>
        </ul>
      </nav>

      <div class="site-header-space" />

      <div
        v-if="!servicePage"
        ref="mobilemenu"
        :class="[
          'site-header-menu',
          'site-header-menu--mobile',
          { 'site-header-menu--mobile-visible': menuVisible }
        ]"
      >
        <div class="site-header-menu__container">
          <!-- <div class="site-header-menu__top" /> -->
          <ul class="site-header-menu__list m-b-40">
            <li
              v-for="(item, idx) in menuItems"
              :key="idx"
              class="site-header-menu__item"
            >
              <a
                v-if="item.url === 'indexes' && isHomePage"
                :href="`#${item.url}`"
                :class="['site-header-menu__link']"
                @click="goTo(item.url)"
                v-text="$t(item.title)"
              />
              <nuxt-link
                v-else-if="item.url === 'indexes'"
                :to="`${localePath('index')}#${item.url}`"
                :class="['site-header-menu__link']"
                @click.native="toggleMenu()"
                v-text="$t(item.title)"
              />
              <nuxt-link
                v-else
                :exact="!!localePath('index')"
                no-prefetch
                :to="localePath(item.url)"
                active-class="active"
                :class="['site-header-menu__link', {'active' : $route.matched[0].path.replace('/', '') === item.url}]"
                @click.native="toggleMenu()"
                v-text="$t(item.title)"
              />
            </li>
          </ul>

          <nuxt-link
            v-if="!$store.getters.hasToken"
            :to="localePath('auth')"
            class="btn btn-small btn-outline btn-full"
          >
            {{ $t("PARTICIPATE_IN_PROJECT") }}
          </nuxt-link>
        </div>
      </div>

      <div class="site-header-item site-header-item--desktop site-header-right">
        <userbar v-if="hasToken" />
        <nuxt-link v-else :to="localePath('auth')" class="btn btn-small btn-outline">
          {{ $t("PARTICIPATE_IN_PROJECT") }}
        </nuxt-link>
      </div>

      <button
        v-if="menuItems.length && !servicePage"
        class="btn btn-burger"
        @click="toggleMenu"
      >
        <svg
          v-if="!menuVisible"
          width="20"
          height="14"
          viewBox="0 0 20 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.866194 6H7.46714C8.62163 6.05235 8.6225 7.9472 7.46714 8H0.866194C-0.288296 7.94765 -0.289167 6.0528 0.866194 6Z"
            fill="#555860"
          />
          <path
            d="M0.889273 6.40154e-05H19.1107C20.296 0.0524139 20.2969 1.94726 19.1107 2.00006H0.889273C-0.296075 1.94771 -0.296969 0.052864 0.889273 6.40154e-05Z"
            fill="#555860"
          />
          <path
            d="M0.882407 12H13.2843C14.4604 12.0524 14.4612 13.9472 13.2843 14H0.882407C-0.293692 13.9477 -0.294579 12.0528 0.882407 12Z"
            fill="#555860"
          />
        </svg>
        <svg
          v-if="menuVisible"
          width="29"
          height="29"
          viewBox="0 0 29 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.99282 19.8772L19.8773 6.99279C20.7525 6.19164 22.093 7.53086 21.2915 8.407L8.40704 21.2915C7.53185 22.0926 6.19136 20.7534 6.99282 19.8772Z"
            fill="#555860"
          />
          <path
            d="M19.8773 21.2915L6.99288 8.407C6.19173 7.53182 7.53095 6.19132 8.40709 6.99279L21.2915 19.8773C22.0927 20.7524 20.7535 22.0929 19.8773 21.2915Z"
            fill="#555860"
          />
        </svg>
      </button>
    </div>
  </header>
</template>

<script>
import langSwitcher from "~/components/langSwitcher.vue";
import Userbar from "~/components/userbar";

export default {
  name: "SiteHeader",
  components: { Userbar, langSwitcher },
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
      menuVisible: false,
      changePasswordModal: false,
      menuItems: [
        {
          title: "HOME",
          url: "index"
        },
        {
          title: "INDEXES",
          url: "indexes"
        },
        {
          title: "PROJECTS",
          url: "projects"
        },
        {
          title: "COMPANY",
          url: "about"
        },
        {
          title: "FAQ",
          url: "faq"
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
    }
  },
  watch: {
    menuVisible (newValue) {
      if (newValue) {
        document.querySelector("body").classList.add("overflow");
      } else {
        document.querySelector("body").classList.remove("overflow");
      }
    }
  },
  methods: {
    toggleMenu () {
      this.menuVisible = !this.menuVisible;
    },
    onchangePasswordModal () {
      this.changePasswordModal = !this.changePasswordModal;
      this.menuVisible = false;
    },
    /** Скроллинг к div */
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
