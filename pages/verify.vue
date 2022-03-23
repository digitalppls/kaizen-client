<template>
  <div class="page-verify main-section">
    <div class="container">
      <div class="page-verify__content">
        <h1
          class="title"
          v-html="$t(status === 'success' ? 'EMAIL_VERIFIED_SUCCESS' : 'EMAIL_VERIFIED_FAIL' )"
        />
        <nuxt-link
          v-if="status === 'success'"
          :to="localePath('index')"
          class="btn btn-outline"
        >
          {{ $t("GO_HOME") }}
        </nuxt-link>
        <verify-email v-else btn-label="ACTIVATE_AGAIN" />
      </div>
    </div>
  </div>
</template>

<script>
import VerifyEmail from "~/components/verify-email";

export default {
  name: "PageVerify",
  components: { VerifyEmail },
  layout: "public",
  computed: {
    status () {
      return this.$route.query?.status ?? null;
    }
  },
  created () {
    if (!this.status) {
      this.$router.push(this.localePath("index"));
    }
  }
};
</script>

<style lang="scss" scoped>
.page-verify {
  &__content {
    text-align: center;
  }
}
</style>
