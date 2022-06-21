<template>
  <div class="stats-info">
    <div
      class="stats-info__circle"
      :style="symbol ? { borderColor: $TokenColors[symbol] } : {}"
    >
      <div class="stats-info__value">
        <slot name="value" />
      </div>
    </div>
    <div class="stats-info__label">
      <slot name="label" />
    </div>
  </div>
</template>

<script>
export default {
  name: "CircleData",
  props: {
    symbol: {
      type: String,
      default: ""
    }
  }
};
</script>

<style
  lang="scss"
  scoped
>
.stats-info {
  $self: &;
  margin: auto;
  text-align: center;

  @include respond-before("md") {
    margin-bottom: 0;
  }

  //&[data-token="kzn"] #{$self}__circle {
  //  border-color: var(--col-blue);
  //}
  //
  //&[data-token="vng"] #{$self}__circle {
  //  border-color: var(--col-yellow);
  //}
  //
  //&[data-token="srk"] #{$self}__circle {
  //  border-color: var(--col-red);
  //}

  &__circle {
    border-radius: 50%;
    border: 5px solid var(--col-accent);
    position: relative;

    &:before {
      content: "";
      display: block;
      padding-bottom: 100%;
    }
  }

  &__value {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: 22px;
    color: #fff;
  }

  &__label {
    font-weight: 300;
    margin-top: 10px;
    font-size: 14px;

    @include respond-before("sm") {
      @include respond-to("md") {
        font-size: 11px;
      }
    }
  }
}
</style>
