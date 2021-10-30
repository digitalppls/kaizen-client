<template>
  <div class="page-referral-home">
    <div class="container">
      <div class="scroll-menu">
        <ul
          v-if="menu.length"
          class="inline-menu m-b-20"
        >
          <li
            v-for="(item, i) in menu"
            :key="i"
            class="inline-menu__item"
          >
            <nuxt-link
              :exact="!!localePath('my-profile')"
              no-prefetch
              :to="localePath(item.url)"
              active-class="inline-menu__link--active"
              class="inline-menu__link"
            >
              {{ $t(item.name) }}
            </nuxt-link>
          </li>
        </ul>
      </div>
      <referral-link-bar class="m-t-20 m-b-60" />
      <nuxt-child />
    </div>
  </div>
</template>

<script>
import ReferralLinkBar from "~/components/referral-link-bar";

export default {
  name: "Referral",
  components: { ReferralLinkBar },
  data () {
    return {
      menu: [
        {
          name: "FINANCE",
          url: "referral"
        },
        {
          name: "STATUS",
          url: "referral-status"
        },
        {
          name: "PACKAGES",
          url: "referral-packages"
        },
        {
          name: "MY_STRUCTURE",
          url: "referral-structure"
        }
      ]
    };
  },
  computed: {},
  mounted () {}
};
</script>

<style lang="scss" scoped>
.scroll-menu {
  white-space: nowrap;
  overflow-y: hidden;
  position: sticky;
  top: 111px;
  z-index: 11;
  background: var(--body-bg);
}
.inline-menu {
  border-bottom: 1px solid var(--color-gray);

  &__item {
    margin: 10px 0 -1px;
    padding: 0 10px;
    display: inline-block;
    vertical-align: middle;
    border-bottom: 1px solid var(--color-gray);

    &:first-child {
      padding-left: 0;
    }

    &:last-child {
      padding-right: 0;
    }
  }

  &__link {
    display: block;
    padding: 10px;
    margin-bottom: -1px;
    color: var(--color-gray-light);
    border-bottom: 2px solid transparent;

    &--active {
      color: var(--color-primary);
      border-color: var(--color-primary);
    }
  }
}
</style>
