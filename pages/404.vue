<template>
  <div class="container text-center">
    <h1 class="m-b-40">
      {{ $t("404_TITLE") }}
    </h1>
    <div class="lh-135 m-b-50">
      {{ error.message }}
    </div>
    <nuxt-link :to="localePath('index')" class="btn btn-solid">
      {{ $t("GO_HOME") }}
    </nuxt-link>
    <nuxt-link :to="localePath('my')" class="btn btn-outline">
      {{ $t("DASHBOARD") }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
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
