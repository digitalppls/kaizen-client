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
  },
  mounted () {
    console.log("_id");
  }
};
</script>
