<template>
  <main class="main">
    <div class="section-1">
      <div class="container">
        <h1 class="title animate__animated wow animate__fadeIn">
          {{ $t("ABOUT_KAIZENFUND") }}
        </h1>
      </div>
    </div>

    <div class="industry-data-section">
      <div class="container" style="display: block">
        <div class="story">
          <div class="story__text">
            <div class="m-b-80">
              <h2 class="title m-b-40">
                {{ $t("ABOUT_VALUE") }}
              </h2>
              <p v-html="$t('ABOUT_VALUE_DESC')" />
            </div>

            <div class="m-b-80">
              <h2 class="title m-b-40">
                {{ $t("ABOUT_VISION") }}
              </h2>
              <p v-html="$t('ABOUT_VISION_DESC')" />
            </div>

            <h2 class="title m-b-40">
              {{ $t("ABOUT_TEAM") }}
            </h2>
            <p class="m-b-20" v-html="$t('ABOUT_TEAM_DESC')" />
            <p class="m-b-20" v-html="$t('MANAGEMENT')" />
            <div v-if="team.length" class="team-members-list">
              <div
                v-for="(member, idx) in team"
                :key="idx"
                class="team-member"
              >
                <div class="team-member__name" style="color: #fff; font-size: 1.25em;">
                  {{ member.name }}
                </div>
                <div class="team-member__position">
                  {{ member.position }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
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
.hero-section {
  min-height: 1px;

  .title {
    text-align: center;
    margin: auto;
  }
}

.industry-data-section {
  padding-bottom: 0;
  text-align: center;
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
