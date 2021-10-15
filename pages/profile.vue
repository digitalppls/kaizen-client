<template>
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
</template>

<script>
export default {
  name: "Profile",
  data () {
    return {
      menu: [
        {
          name: "PROFILE",
          url: "profile"
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
      width: calc(100% - var(--sidebar-width) - 50px);
    }
  }
}

.menu {
  &__item {
    margin-bottom: 20px;
  }

  &__link {
    color: var(--color-gray-light);
    font-weight: 500;
    display: block;
    transition: margin .2s ease-in-out;

    &--active {
      color: #fff;
      margin-left: 10px;
    }
  }
}
</style>
