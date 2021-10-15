<template>
  <div />
</template>
<script>
export default {
  name: "R",
  computed: {
    userId () {
      return this.$store.getters.user?.id ?? "";
    },
    refId () {
      return this.$route.params?.id ?? "";
    }
  },
  mounted () {
    if (this.refId && this.refId !== this.userId) {
      this.$store.dispatch("setRef", this.refId);
      console.log("set referral", `${this.$store.getters.ref.split(0, 5)}...`);
    }
    this.$router.push(this.localeLocation("index"));
  }
};
</script>
