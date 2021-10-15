<template>
  <div class="page-verify">
    <div class="container">
      <div class="page-verify__content">
        <h1 class="title">
          <template v-if="status === 'success'">
            {{ $t("EMAIL_VERIFIED_SUCCESS") }}
          </template>
          <template v-else>
            {{ $t("EMAIL_VERIFIED_FAIL") }}
          </template>
        </h1>
        <nuxt-link
          v-if="status === 'success'"
          :to="localePath('index')"
          class="btn btn-solid"
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
  name: "Verify",
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
