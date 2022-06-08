<template>
  <div class="main-section">
    <div class="container">
      <div class="page-profile">
        <div class="page-profile__inline-menu inline-menu-wrap">
          <ul
            v-if="menu.length"
            class="inline-menu list"
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
                :disabled="item.url === 'my-indexes'"
                active-class="inline-menu__link--active"
                :class="['inline-menu__link', {'inline-menu__link--disabled': item.url === 'my-indexes'}]"
                @click.native="scrollTo($event)"
              >
                {{ $t(item.name) }}
              </nuxt-link>
            </li>
          </ul>
        </div>
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
                v-show="item.show"
                :key="i"
                class="menu__item"
              >
                <nuxt-link
                  :exact="!!localePath('my-profile')"
                  no-prefetch
                  :to="localePath(item.url)"
                  active-class="menu__link--active"
                  :class="['menu__link', {'menu__link--disabled': item.url === 'my-indexes'}]"
                >
                  {{ $t(item.name) }}
                  <span
                    v-if="item.url === 'my-indexes'"
                    style="font-size: .6em; color: var(--col-red); opacity: .7; display: block;"
                    v-text="$t('TEMPORARILY_UNAVAILABLE')"
                  />
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
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "My",
  data () {
    return {
      menu: [
        {
          name: "DASHBOARD",
          url: "my",
          show: true
        },
        {
          name: "OPERATIONS",
          url: "my-operations",
          show: true
        },
        {
          name: "PROFILE",
          url: "my-profile",
          show: true
        },
        {
          name: "BUY_INDEXES",
          url: "my-indexes",
          show: true
        }
      ]
    };
  },
  methods: {
    scrollTo (e) {
      // console.log(e.target.parentNode, e);
      e.target.parentNode.scrollLeft = e.target.offsetLeft;
    }
  }
};
</script>

<style lang="scss" scoped>
.main-section {
  max-height: none;
  min-height: auto;
  display: block;
  flex: 1 0 auto;

  .container {
    margin: 0 auto;
  }
}

.page-profile {
  @include respond-before("lg") {
    display: flex;
    flex-wrap: wrap;
    --sidebar-width: 220px;
  }

  &__inline-menu {
    margin-bottom: 30px;

    @include respond-before("lg") {
      display: none;
    }
  }

  &__sidebar {
    margin-top: 50px;
    display: none;

    @include respond-before("lg") {
      position: relative;
      display: block;
      margin-top: 0;
      order: 1;
      width: var(--sidebar-width);
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

    &:not(.menu__link--disabled):hover {
      color: #fff;
    }

    &--active {
      color: #fff;
      background-color: #1F2124;
    }

    &--disabled {
      cursor: default;
      pointer-events: none;
      opacity: .4;
    }
  }
}

.inline-menu {
  display: flex;

  &-wrap {
    overflow-x: scroll;
    background: #151618;

    @include respond-to("lg") {
      position: sticky;
      top: 90px;
      z-index: 10;
      box-shadow: 0 0 18px var(--col-black);
    }
    @include respond-to("md") {
      top: 74px;
    }
  }

  &__item {
    font-size: 16px;
    margin: 0;
    padding: 0;
    white-space: nowrap;

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
      background-color: #1F2124;
    }

    &--disabled {
      cursor: default;
      pointer-events: none;
      opacity: .4;
    }
  }
}

.sidebar {
  background: #151618;
  padding: 0;
  overflow: hidden;

  @include respond-before("lg") {
    position: sticky;
    top: 100px;
    z-index: 10;
  }
}
</style>
