<template>
  <div>
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
                active-class="inline-menu__link--active"
                class="inline-menu__link"
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
                :key="i"
                class="menu__item"
              >
                <nuxt-link
                  :exact="!!localePath('my-profile')"
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

export default {
  name: "My",
  data () {
    return {
      menu: [
        {
          name: "DASHBOARD",
          url: "my"
        },
        {
          name: "BUY_INDEXES",
          url: "my-indexes"
        },
        {
          name: "PROFILE",
          url: "my-profile"
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

.inline-menu {
  display: flex;

  &-wrap {
    overflow-x: scroll;
    border-radius: 12px;
    background-color: #f8f8fb;
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
    border-radius: 12px;
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
