<template>
  <div>
    <h3 class="color-white">
      Фонды
    </h3>

    <fund-item :sale="sales.filter(x => x.symbol === 'kzn')" class="m-b-20" />
    <fund-item :sale="sales.filter(x => x.symbol === 'vng')" class="m-b-20" />
    <fund-item :sale="sales.filter(x => x.symbol === 'srk')" class="m-b-20" />
  </div>
</template>

<script>
import FundItem from "../../components/admin/FundItem";
export default {
  name: "AdminFunds",
  components: { FundItem },
  data () {
    return {
      sales: []
    };
  },
  mounted () {
    this.$API.TokenSaleList("all", (sales) => {
      this.sales = sales?.list ?? [];
    });
  }
};
</script>

<style scoped>

</style>
