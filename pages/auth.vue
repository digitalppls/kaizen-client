<template>
  <div class="page-login">
    <div class="container">
      <auth :mode="mode" @change-tab="changeTab" />
    </div>
  </div>
</template>

<script>
import Auth from "~/components/auth";

export default {
  name: "PageLogin",
  components: { Auth },
  layout: "public",
  middleware: ["auth"],
  data () {
    return {
      mode: "sign_up"
    };
  },
  methods: {
    changeTab (tab) {
      this.mode = tab;
    }
  }
};
</script>

<style lang="scss" scoped>
.page-login {
  padding-top: 50px;
}
</style>

<style lang="scss">

</style>
