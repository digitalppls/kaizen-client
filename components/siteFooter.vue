<template>
  <footer class="site-footer">
    <div class="site-footer__container container">
      <logo class="site-footer__logo" />

      <ul class="site-footer__menu footer-menu">
        <li
          v-for="(item, idx) in menuItems"
          :key="idx"
          class="footer-menu__item"
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
        &copy; KaizenFund. {{ year }}
      </div>
    </div>

    <div v-if="hideFooterText" class="site-footer__textblock container m-t-50">
      <p class="lh-135 m-b-5" v-html="$t('FOOTER_CONTACTS').replaceAll('%{PHONE}', phone).replaceAll('%{EMAIL}', email)" />
      <p class="lh-135 m-b-20" v-html="$t('FOOTER_TXT_1')" />
      <p class="lh-135 m-b-20" v-html="$t('FOOTER_TXT_2')" />
      <p class="lh-135" v-html="$t('DENIAL_OF_RESPONSIBILITY')" />
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
      phone: "+1 (345) 769-4099",
      email: "info@invictuscapital.com",
      menuItems: [
        {
          title: "HOME",
          url: "index"
        },
        {
          title: "FUNDS",
          url: "funds"
        },
        {
          title: "INCUBATION",
          url: "incubation"
        },
        {
          title: "ABOUT_US",
          url: "about"
        },
        {
          title: "NEWS",
          url: "news"
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
    },
    hideFooterText () {
      return this.$nuxt.$data.layoutName === "public";
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.site-footer {
  padding: 50px 0;
  background-color: var(--color-gray-light);

  &__container {
    @include respond-before("lg") {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
  }

  &__logo {
    @include respond-before("lg") {
      margin-right: 20px;
    }
  }

  &__copyrights {
    @include fontGothamPro("regular", true);
    margin-top: 20px;
    font-size: 14px;

    @include respond-before("lg") {
      margin-top: 0;
    }
  }

  &__textblock {
    @include fontGothamPro("regular", true);
    font-size: 14px;
    color: #a7a9b7;

    &::v-deep a {
      color: #a7a9b7;
    }
  }
}

.footer-menu {
  list-style-type: none;
  margin: 30px -10px 0;

  @include respond-before("md") {
    display: flex;
    margin: 30px -20px 0;
    align-items: center;
  }
  @include respond-before("lg") {
    margin: 0 auto;
  }

  &__item {
    margin: auto;
    padding: 0;
    line-height: 1em;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    display: inline-block;

    @include respond-before("md") {
      display: block;
      margin: 0;

      &:last-child {
        margin-right: 0;
      }
    }
    @include respond-before("lg") {
    }

    a {
      color: #555860;
      display: block;
      padding: 15px 10px;
      border-radius: 12px;

      @include respond-before("md") {
        padding: 15px 20px;
      }
      @include respond-before("lg") {
        padding: 15px;
      }
      @include respond-before("xl") {
        padding: 15px 20px;
      }

      &:hover {
        color: var(--color-dark);
      }

      &.nuxt-link-exact-active {
        color: var(--color-dark);
        font-weight: 600;
      }
    }
  }
}
</style>
