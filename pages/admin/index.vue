<template>
  <div />
</template>

<script>
export default {
  name: "AdminIndex",
  beforeMount () {
    this.$router.push(this.localePath("admin-funds"));
  }
};
</script>

<style scoped>

</style>
