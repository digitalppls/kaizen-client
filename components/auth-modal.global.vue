<template>
  <modal
    v-if="showModal"
    @close="showModal = false"
  >
    <auth :mode="mode" @change-tab="changeTab" />
  </modal>
</template>

<script>
import Auth from "~/components/auth";
export default {
  name: "AuthModal",
  components: { Auth },
  data () {
    return {
      showModal: true,
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

</style>
