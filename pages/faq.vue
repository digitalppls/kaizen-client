<template>
  <div class="container">
    <h1 class="m-b-30">
      {{ $t("FAQ_TITLE") }}
    </h1>

    <details v-for="(item, idx) in faqItems" :key="idx">
      <summary>
        {{ $t(item.q) }}
      </summary>
      <div>
        {{ $t(item.a) }}
      </div>
    </details>
  </div>
</template>

<script>

export default {
  name: "FAQ",
  layout: "public",
  data () {
    return {
      faqItems: [
        {
          q: "FAQ_Q_1",
          a: "FAQ_A_1"
        },
        {
          q: "FAQ_Q_2",
          a: "FAQ_A_2"
        },
        {
          q: "FAQ_Q_3",
          a: "FAQ_A_3"
        },
        {
          q: "FAQ_Q_4",
          a: "FAQ_A_4"
        },
        {
          q: "FAQ_Q_5",
          a: "FAQ_A_5"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
details {
  margin: 0 auto 30px;
  background-color: #f8f8fb;
  //box-shadow: 0 4px 16px rgb(162 162 175 / 16%);
  border-radius: 12px;
  overflow: hidden;

  &[open] > summary:before {
    transform: rotate(90deg);
  }

  summary::-webkit-details-marker {
    display: none;
  }
}

summary {
  display: block;
  background-color: rgba(#A7A9B7, 0.07);
  padding: 1rem 1rem 1rem 2.2rem;
  position: relative;
  cursor: pointer;

  & + div {
    padding: 20px;
  }

  &:before {
    content: '';
    border-width: .4rem;
    border-style: solid;
    border-color: transparent transparent transparent var(--base-text);
    position: absolute;
    top: 1.3rem;
    left: 1rem;
    transform: rotate(0);
    transform-origin: .2rem 50%;
    transition: .25s transform ease;
  }
}
</style>
