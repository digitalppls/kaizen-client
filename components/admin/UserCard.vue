<template>
  <div v-if="userData">
    <h1 class="modal-title">{{ userData.username }}</h1>

    <pre v-html="userData" />
  </div>
  <div v-else>
    Нет данных
  </div>
</template>

<script>
export default {
  name: "UserCard",
  props: {
    userData: {
      type: Object,
      required: true,
      default () {
        return {};
      }
    }
  }
};
</script>

<style scoped>

</style>
