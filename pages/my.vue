<template>
  <div>
    <all-currency />
    <div class="container">
      <div class="page-profile">
        <div class="page-profile__content">
          <nuxt-child />
        </div>
        <div class="page-profile__sidebar">
          <div class="sidebar">
            <ul
              v-if="menu.length"
              class="menu list"
            >
              <li
                v-for="(item, i) in menu"
                :key="i"
                class="menu__item"
              >
                <nuxt-link
                  :exact="!!localePath('profile')"
                  no-prefetch
                  :to="localePath(item.url)"
                  active-class="menu__link--active"
                  class="menu__link"
                >
                  {{ $t(item.name) }}
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AllCurrency from "~/components/all-currency";

export default {
  name: "My",
  components: { AllCurrency },
  data () {
    return {
      menu: [
        {
          name: "DASHBOARD",
          url: "my"
        },
        {
          name: "BUY_CRYPTO",
          url: "my-buycrypto"
        },
        {
          name: "PROFILE",
          url: "my-profile"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.page-profile {
  @include respond-before("lg") {
    display: flex;
    flex-wrap: wrap;
    --sidebar-width: 220px;
  }

  &__sidebar {
    margin-top: 50px;
    display: none;

    @include respond-before("md") {
      display: block;
    }
    @include respond-before("lg") {
      position: relative;
      margin-top: 0;
      order: 1;
      width: var(--sidebar-width);

      &-content {
        position: sticky;
        top: 115px; // 80px height of .header + 40px padding-top of .lk
      }
    }
  }

  &__content {
    @include respond-before("lg") {
      order: 2;
      margin-left: 50px;
      min-height: 350px;
      width: calc(100% - var(--sidebar-width) - 50px);
    }
  }
}

.menu {
  &__item {
    font-size: 16px;
    margin: 0;
    padding: 0;

    &:before {
      display: none;
    }
  }

  &__link {
    color: var(--color-gray);
    display: block;
    padding: 15px;
    transition: margin .2s ease-in-out;

    &--active {
      color: #fff;
      //background-color: var(--color-primary);
      background-color: #A7A9B7;
      //margin-left: 10px;
      @include fontTTNorms("bold");
    }
  }
}

.sidebar {
  background: #f9f9fa;
  //height: 100%;
  padding: 0;
  border-radius: 12px;
  overflow: hidden;
}
</style>
