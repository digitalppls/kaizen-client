<template>
  <footer class="footer">
    <div class="container">
      <div class="footer_logo">
        <img src="~/assets/img/logo.svg" alt="">
      </div>
      <div class="footer_menu">
        <nav class="menu">
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
      </div>
      <div class="footer_social">
        <a href="#" class="social">
          <img src="~/assets/img/youtube.svg" alt="">
        </a>
        <a href="#" class="social">
          <img src="~/assets/img/telegram.svg" alt="">
        </a>
        <a href="#" class="social">
          <img src="~/assets/img/twitter.svg" alt="">
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
import { TERMS } from "~/global";

export default {
  name: "SiteFooter",
  data () {
    return {
      menuVisible: false,
      phone: "+1 (345) 769-4099",
      email: "info@invictuscapital.com",
      TERMS,
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
    year () {
      const year = new Date().getFullYear().toString().slice(2);
      return `2k${year}`;
    },
    isHomePage () {
      return this.$route.matched[0].path.replace("/", "") === "";
    }
  },
  methods: {
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

</style>
