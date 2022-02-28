<template>
  <main class="main">
    <div class="hero-section">
      <div class="container">
        <h1 class="title animate__animated wow animate__fadeIn" v-text="$t('404_TITLE')" />
        <p class="text animate__animated wow animate__fadeIn" data-wow-delay=".2s" v-text="error.message" />
        <nuxt-link :to="localePath('index')" class="btn btn-yellow animate__animated wow animate__fadeIn" data-wow-delay=".5s">
          {{ $t("GO_HOME") }}
        </nuxt-link>
        <nuxt-link :to="localePath('my')" class="btn btn-yellow animate__animated wow animate__fadeIn" data-wow-delay=".5s">
          {{ $t("DASHBOARD") }}
        </nuxt-link>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "PageError",
  props: {
    error: {
      type: Object,
      default () {
        return {};
      }
    }
  }
};
</script>

<style lang="scss"></style>
