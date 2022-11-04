<template>
  <ul class="header_lang">
    <li
      v-for="(locale, index) in $i18n.locales"
      :key="index"
    >
      <nuxt-link
        :to="switchLocalePath(locale.code)"
        :class="{'active': locale.code === $i18n.locale}"
        @click="onChange(locale.code)"
      >
        {{ locale.code }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "LangSwitcher",
  data () {
    return {
      show: false,
      selectedLanguage: ""
    };
  },
  computed: {
    listLocales () {
      return this.$i18n.locales.filter(l => l.code !== this.$i18n.locale);
    }
  },
  created () {
    this.selectedLanguage = this.$i18n.locale;
  },
  methods: {
    close () {
      this.show = false;
    },
    onChange (event) {
      // this.switchLocalePath(event);
      // this.$router.replace(this.switchLocalePath(event));
      window.location.reload();
    }
  }
};
</script>

<style lang="scss" scoped>
.header_lang {
  display: flex;
  margin-top: 20px;
  margin-bottom: auto;
  text-transform: uppercase;

  @include min($burger) {
    margin-top: 0;
    margin-bottom: 0;

    li:last-child {
      a {
        padding-right: 0;
      }
    }
  }

  a {
    padding: 5px 14px;
    font-size: 16px;
    line-height: 20px;

    @include min($burger) {
      font-size: 12px;
      line-height: 14px;
      padding: 5px 7px;
    }
    @include min(1200px) {
      padding: 5px 14px;
    }
  }
}
</style>
