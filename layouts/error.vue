<template>
  <main class="main">
    <div class="main-section">
      <div class="container">
        <h1 class="title animate__animated wow animate__fadeIn" v-text="`Error ${error.statusCode}`" />
        <p class="text animate__animated wow animate__fadeIn" data-wow-delay=".2s" v-text="error.message" />
        <nuxt-link :to="localePath('index')" class="btn btn-outline animate__animated wow animate__fadeIn" data-wow-delay=".5s">
          {{ $t("GO_HOME") }}
        </nuxt-link>
        <nuxt-link v-if="$store.getters.hasToken" :to="localePath('my')" class="btn btn-accent animate__animated wow animate__fadeIn" data-wow-delay=".5s">
          {{ $t("DASHBOARD") }}
        </nuxt-link>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Error",
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
