<template>
  <header class="header">
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
        <nav
          id="menu"
          class="menu"
        >
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
                :to="`${localePath('index')}#${item.url}`"
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
        },
        {
          title: this.$t("COMPANY"),
          url: this.localePath("about")
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
