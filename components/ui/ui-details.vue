<template>
  <details>
    <summary>
      <slot name="summary" />
    </summary>
    <div>
      <slot />
    </div>
  </details>
</template>

<script>
export default {
  name: "UiDetails"
};
</script>

<style lang="scss" scoped>

/* А-ля спойлер */
details {
  border: 1px solid #55585f;

  summary {
    background: #242527;
    cursor: pointer;
    font-weight: 400;
    color: #fff;
    padding: .5rem 1rem;

    > * {
      display: inline;
    }
  }

  > div {
    margin-top: 0;
    padding: 1rem;
  }
}
</style>
