<template>
  <header class="header">
    <div class="container">
      <div class="header_logo">
        <img src="~/assets/img/logo.svg" alt="">
      </div>

      <div class="header_menu">
        <nav
          id="menu"
          class="menu"
        >
          <ul class="menu_list">
            <li
              v-for="(item, idx) in menuItems"
              :key="idx"
            >
              <a
                v-if="$externalLink(item.url)"
                :class="['animate__animated', 'wow', 'animate__slideInDown']"
                :data-wow-delay="`${1 / menuItems.length}s`"
                :href="item.url"
                v-text="$t(item.title)"
              />
              <nuxt-link
                v-else-if="item.url === 'indexes'"
                :to="`${localePath('index')}#${item.url}`"
                :class="['animate__animated', 'wow', 'animate__slideInDown']"
                :data-wow-delay="`${1 / menuItems.length}s`"
                @click="goTo(item.url)"
                v-text="$t(item.title)"
              />
              <nuxt-link
                v-else
                :exact="!!localePath('index')"
                no-prefetch
                :to="localePath(item.url)"
                :class="['animate__animated', 'wow', 'animate__slideInDown', {'active' : $route.matched[0].path.replace('/', '') === item.url}]"
                :data-wow-delay="`${1 / menuItems.length}s`"
                active-class="active"
                v-text="$t(item.title)"
              />
            </li>
          </ul>
        </nav>
        <lang-switcher />
      </div>
      <button
        class="header_burger"
        @click="toggleMenu"
      >
        <span />
      </button>
    </div>
  </header>

  <!-- <header :class="['site-header']">
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
  <div class="site-header-userbar-mobile">
  <userbar v-if="hasToken" />
  <nuxt-link
  v-else
  :to="localePath('auth')"
  class="btn btn-small btn-outline btn-full"
  >
  {{ $t("PARTICIPATE_IN_PROJECT") }}
  </nuxt-link>
  </div>
  </div>
  </div>

  <div class="site-header-item site-header-item--desktop site-header-right">
  <userbar v-if="hasToken" />
  <nuxt-link
  v-else :to="localePath('auth')" class="btn btn-small btn-outline" style="position: relative; z-index: 25;"
  >
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
  </header> -->
</template>

<script>
import langSwitcher from "~/components/langSwitcher.vue";

export default {
  name: "SiteHeader",
  components: { langSwitcher },
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
  methods: {
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
</style>
