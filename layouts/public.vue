<template>
  <div>
    <site-header />
    <Nuxt ref="nuxt" />
    <site-footer />
    <cookies-banner v-if="false" />
  </div>
</template>

<script>
import SiteHeader from "~/components/siteHeader.vue";
import SiteFooter from "~/components/siteFooter.vue";
import CookiesBanner from "~/components/cookies-banner";
import VGlobalMixin from "~/mixins";

export default {
  components: {
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
  mounted () {
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>

</style>
