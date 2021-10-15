<template>
  <footer class="site-footer">
    <div v-if="false" class="site-footer__container container">
      <div class="site-footer__left">
        <div class="site-footer__top-row">
          {{ $t("FOOTER_ROW_1") }}
        </div>
        <div class="site-footer__bottom-row">
          {{ $t("FOOTER_ROW_2") }}
          <a :href="terms" class="link">
            {{ $t("TERMSUSESERVICE") }}
          </a>
        </div>
      </div>
      <div class="site-footer__right">
        <ul class="site-footer__menu footer-menu">
          <li
            v-for="(item, idx) in menuItems"
            :key="idx"
            class="footer-menu__item link"
          >
            <a v-if="item.url.startsWith('http')" :href="item.url" :target="item.target">
              {{ $t(item.title) }}
            </a>
            <nuxt-link v-else :to="localePath(item.url)">
              {{ $t(item.title) }}
            </nuxt-link>
          </li>
        </ul>

        <div class="site-footer__copyrights">
          &copy; AllWin. {{ year }}
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { TERMS } from "~/global";

export default {
  name: "SiteFooter",
  data () {
    return {
      menuVisible: false,
      menuItems: [
        // {
        //   title: "menu.contacts",
        //   url: this.localePath("contacts")
        // },
        {
          title: "WRITE_TO_SUPPORT",
          url: "https://t.me/romcybe",
          target: "_blank"
        }
      ]
    };
  },
  computed: {
    year () {
      const year = new Date().getFullYear().toString().slice(2);
      return `2k${year}`;
    },
    terms () {
      return TERMS;
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.site-footer {
  padding: 40px 0 20px;

  @include respond-before("md") {
    padding: 76px 0 30px;
  }

  &__container {
    @include respond-before("lg") {
      display: flex;
      align-items: center;
    }
  }

  &__left {
    margin-bottom: 60px;

    @include respond-before("lg") {
      margin-bottom: 0;
      max-width: 665px;
      margin-right: 50px;
    }
  }

  &__right {
    @include respond-before("lg") {
      margin-left: auto;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }

    @include respond-before("lg") {
      justify-content: flex-end;
    }
  }

  &__copyrights {
    margin-top: 30px;
    padding-bottom: 0.35em;
    color: var(--color-gray-light);

    @include respond-before("lg") {
      margin-top: 0;
      margin-left: 50px;
    }
  }

  &__top-row {
    font-size: 16px;
    margin-bottom: 10px;
  }

  &__bottom-row {
    font-size: 14px;
    color: var(--color-gray-light);
  }
}

.footer-menu {
  list-style-type: none;
  display: flex;
  align-items: center;

  &__item {
    margin-bottom: 0;
    margin-left: 40px;
    color: $color-link;

    @include respond-before("lg") {
      margin-left: 50px;
      margin-bottom: 0;
    }
    @include respond-before("xl") {
      margin-left: 70px;
    }
    @include respond-before("xxl") {
      margin-left: 50px;
    }

    &:first-child {
      margin-left: 0;
    }
  }
}
</style>
