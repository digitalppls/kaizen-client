<template>
  <div class="currency-item">
    <div class="currency-item__icon">
      <slot name="icon" />
    </div>
    <div class="currency-item__content">
      <div class="currency-item__value1">
        <slot name="value1" />
      </div>
      <div v-if="hasSlotValue2" class="currency-item__value2">
        <slot name="value2" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CurrencyItem",
  computed: {
    hasSlotValue2 () {
      return !!this.$slots.value2;
    }
  }
};
</script>

<style lang="scss" scoped>
.currency-item {
  //display: flex;
  //align-items: center;

  &__icon {
    font-size: 11px;
    margin-bottom: 5px;
    color: var(--color-primary);
    @include fontTTNorms("bold");

    @include respond-before("xs") {
      font-size: 13px;
    }
    @include respond-before("sm") {
      font-size: 14px;
    }
  }

  &__value1 {
    white-space: nowrap;
    color: var(--color-gray);
    font-size: 16px;

    @include fontTTNorms("medium");
  }

  &__value2 {
    color: var(--color-gray);
    font-size: 13px;
  }

  &__content {
    //width: calc(100% - 30px);
    //padding-left: 10px;
  }
}
</style>
