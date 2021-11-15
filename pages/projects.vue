<template>
  <div class="container">
    <h1 class="m-b-30">
      {{ $t("PROJECTS") }}
    </h1>
    <div class="projects-list">
      <article
        v-for="(project, idx) in projects"
        :key="idx"
        class="project"
      >
        <div class="project__img">
          <img :src="require(`~/assets/images/${project.image}`)" alt="">
        </div>
        <div class="project__content">
          <h2 class="project__title">
            {{ project.title }}
          </h2>
          <div class="m-b-20">
            <a
              v-if="project.website"
              :href="project.website"
              target="_blank"
              class="project__website"
            >
              {{ project.website.replace("https://", "") }}
            </a>
            <span v-else class="project__website">
              {{ $t("SOON") }}
            </span>
          </div>
          <div class="project__desc" v-html="project.desc" />
        </div>
      </article>
    </div>
  </div>
</template>

<script>

export default {
  name: "Projects",
  layout: "public",
  data () {
    return {
      projects: [
        {
          title: "VANGUARD MINING",
          website: "https://vanguardmining.io",
          image: "vanguardmining.jpeg",
          desc: this.$t("VANGUARD_MINING_DESC")
        },
        {
          title: "KokskhimProm",
          website: null,
          image: "kokskhimprom.jpg",
          desc: this.$t("KOKSKHIMPROM_DESC")
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.projects-list {

}
.project {
  margin-bottom: 30px;

  @include respond-before("md") {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  &__img {
    margin-bottom: 20px;

    @include respond-before("md") {
      width: 300px;
      margin-bottom: 0;
    }

    img {
      border-radius: 12px;
    }
  }

  &__content {

    @include respond-before("md") {
      width: calc(100% - 300px);
      padding-left: 40px;
    }
  }

  &__title {
    margin-bottom: 20px;
  }

  &__website {
    color: var(--color-primary);
  }
}
</style>
