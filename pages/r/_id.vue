<template>
  <div />
</template>
<script>

export default {
  name: "Id",
  computed: {
    userId () {
      return this.$route.params;
    }
  }
};
</script>
