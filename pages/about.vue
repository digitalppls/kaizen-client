<template>
  <div class="page-about">
    <div class="page-about__cover m-b-80">
      <div class="container">
        <h1 class="page-about__cover-title">
          {{ $t("ABOUT_KAIZENFUND") }}
        </h1>
      </div>
    </div>
    <div class="container container--narrow">
      <div class="m-b-40">
        <h2 class="title">
          {{ $t("ABOUT_VALUE") }}
        </h2>
        <p class="lh-135" v-html="$t('ABOUT_VALUE_DESC')" />
      </div>

      <div class="m-b-80">
        <h2 class="title">
          {{ $t("ABOUT_VISION") }}
        </h2>
        <p class="lh-135" v-html="$t('ABOUT_VISION_DESC')" />
      </div>
    </div>

    <div class="team-section">
      <div class="container container--narrow">
        <h2 class="title text-center">
          {{ $t("ABOUT_TEAM") }}
        </h2>
        <p class="lh-135 m-b-20 text-center" v-html="$t('ABOUT_TEAM_DESC')" />

        <h3 class="sub-title text-center">
          {{ $t("MANAGEMENT") }}
        </h3>
        <div v-if="team.length" class="team-members-list">
          <div
            v-for="(member, idx) in team"
            :key="idx"
            class="team-member"
          >
            <div class="team-member__name font-bold font-size-20 text-center">
              {{ member.name }}
            </div>
            <div class="team-member__position font-size-16 text-center">
              {{ member.position }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "AboutUs",
  layout: "public",
  data () {
    return {
      team: [
        {
          name: this.$t("URAMAYEV_FARHAT"),
          position: `CEO, ${this.$t("MANAGING_PARTNER")}`,
          img: null
        },
        {
          name: this.$t("RYSKULOV_ALTAI"),
          position: `CFO, ${this.$t("MANAGING_PARTNER")}`,
          img: null
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.page-about {
  margin-top: -60px;

  &__cover {
    background: var(--color-gray-light) url("https://cdn.buttercms.com/l6MKg4Tzy2uvHxDvr1nA") no-repeat 50% 50%;
    background-size: cover;
    height: 250px;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;

    @include respond-before("md") {
      height: 512px;
    }

    &-title {

      @include respond-before("lg") {
        font-size: 60px;
      }
    }
  }
}

.team-members-list {
  margin-top: 24px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;

}

.team-member {
  margin: 0 8px 32px;
  width: 232px;

  &__name {
    text-align: center;
    padding: 8px 0;
  }
}

.team-section {
  background: #f8f8fb;
  padding: 50px 0;
}

.container--narrow {
  max-width: 900px;
}
</style>
