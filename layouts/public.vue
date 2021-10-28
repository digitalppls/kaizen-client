<template>
  <div>
    <site-header />
    <div class="site-content">
      <Nuxt ref="nuxt" />
    </div>
    <site-footer />
    <cookies-banner />
    <clear-storage v-if="isDev" />
  </div>
</template>

<script>
import SiteHeader from "~/components/siteHeader.vue";
import SiteFooter from "~/components/siteFooter.vue";
import CookiesBanner from "~/components/cookies-banner";
import VGlobalMixin from "~/mixins";
import ClearStorage from "~/components/dev/clear-storage";

export default {
  components: {
    ClearStorage,
    CookiesBanner,
    SiteHeader,
    SiteFooter
  },
  mixins: [VGlobalMixin],
  computed: {
    isDev () {
      return process.env.isDev;
    }
  },
  watch: {
    $route () {
      setTimeout(this.FooterToBottom, 100);
    }
  },
  mounted () {
    this.FooterToBottom();
  },
  methods: {
    FooterToBottom () {
      const bodyHeight = document.querySelector("body").offsetHeight;
      const siteContentHeight = document.querySelector(".site-content").offsetHeight;
      if (siteContentHeight <= bodyHeight) {
        document.querySelector("body").classList.add("footer-to-bottom");
      } else {
        document.querySelector("body").classList.remove("footer-to-bottom");
      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
