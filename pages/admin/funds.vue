<template>
  <div>
    <h2 class="color-white">
      Фонды
    </h2>

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
  beforeMount () {
    this.$nuxt.$on("update-fund", this.updateData);
  },
  beforeDestroy () {
    this.$nuxt.$off("update-fund", this.updateData);
  },
  mounted () {
    this.loadData();
  },
  methods: {
    /** Загружаем данные о сейлах/раундах/фондах */
    loadData () {
      this.$API.TokenSaleList("all", (sales) => {
        this.sales = sales?.list ?? [];
      });
    },
    /** Обновляем данные */
    updateData (list) {
      if (list.length) {
        this.sales = list;
      }
    }
  }
};
</script>

<style scoped>

</style>
