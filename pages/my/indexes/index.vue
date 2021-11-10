<template>
  <div class="indexes">
    <h1 class="title">
      {{ $t("BUY_INDEXES") }}
    </h1>

    <nuxt-child />

    <all-indexes />
  </div>
</template>

<script>
import AllIndexes from "~/components/all-indexes";
export default {
  name: "Indexes",
  components: { AllIndexes }
};
</script>

<style scoped>

</style>
