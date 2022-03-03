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
      </div>
      <div class="footer_social">
        <a
          v-for="(link, type, key) in socials"
          :key="key"
          :href="link"
          class="social"
          target="_blank"
        >
          <img :src="require(`~/assets/img/${type}.svg`)" alt="">
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
import { TERMS, SOCIALS } from "~/global";

export default {
  name: "SiteFooter",
  data () {
    return {
      TERMS,
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
    year () {
      const year = new Date().getFullYear().toString().slice(2);
      return `2k${year}`;
    },
    socials () {
      const list = [];
      for (const prop in SOCIALS) {
        if (Object.prototype.hasOwnProperty.call(SOCIALS, prop)) {
          list[prop] = SOCIALS[prop];
        }
      }
      return list;
    },
    isHomePage () {
      return this.$route.matched[0].path.replace("/", "") === "";
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
