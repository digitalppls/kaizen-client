<template>
  <button
    class="btn btn-solid btn-small btn-solid--tertiary"
    @click="clearStorage"
  >
    Clear storage
  </button>
</template>

<script>
export default {
  name: "ClearStorage",
  methods: {
    clearStorage () {
      console.log("clear Storage");
    }
  }
};
</script>

<style lang="scss" scoped>
.btn {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 20;
}
</style>
