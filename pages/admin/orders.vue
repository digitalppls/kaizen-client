<template>
  <div>
    <h2 class="color-white">
      {{ $t("LIMIT_ORDERS") }}
    </h2>

    <list-orders is-admin />
  </div>
</template>

<script>
import ListOrders from "../../components/ListOrders";

export default {
  name: "AdminOrders",
  components: { ListOrders },
  data () {
    return {};
  },
  mounted () {},
  methods: {}
};
</script>

<style scoped>

</style>
