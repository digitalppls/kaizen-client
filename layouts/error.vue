<template>
  <div class="site-content">
    <div class="cover">
      <div class="container text-center">
        <h1 class="title">
          {{ error.statusCode }}
        </h1>
        <p style="margin-bottom: 50px;">
          {{ error.message }}
        </p>
        <nuxt-link to="/" class="btn btn-solid">
          {{ $t("GO_HOME") }}
        </nuxt-link>
      </div>
    </div>
  </div>
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
