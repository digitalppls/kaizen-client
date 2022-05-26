<template>
  <header
    :class="['header', {'header--fixed': scrollY > 10}]"
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
                v-else
                :exact="!!localePath('index')"
                no-prefetch
                :to="item.url"
                :class="['animate__animated', 'wow', 'animate__slideInDown', {'active' : ($route.matched.length && $route.matched[0].path.replace('/', '') === item.url)}]"
                :data-wow-delay="`${key / menuItems.length}s`"
                active-class="active"
                v-text="item.title"
              />
            </li>
          </ul>
        </nav>
        <lang-switcher class="m-r-40" />
        <user-bar />
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
          title: this.$t("POWER_PLANT"),
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

</style>
