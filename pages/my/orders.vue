<template>
  <div class="orders">
    <h2 class="color-white">
      {{ $t("LIMIT_ORDERS") }}
    </h2>

    <list-orders />
  </div>
</template>

<script>
import ListOrders from "../../components/ListOrders";

export default {
  name: "MyOrders",
  components: { ListOrders },
  data () {
    return {};
  },
  mounted () {
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
</style>
