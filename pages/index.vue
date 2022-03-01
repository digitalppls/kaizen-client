<template>
  <main class="main">
    <div class="section-1">
      <div class="container">
        <h1 class="title animate__animated wow animate__fadeIn">
          {{ coverTitle }}
        </h1>
        <p class="text animate__animated wow animate__fadeIn" data-wow-delay=".2s">
          {{ coverDesc }}
        </p>
        <nuxt-link
          :to="localePath(hasToken ? 'my' : 'auth')"
          class="btn btn-accent animate__animated wow animate__fadeIn"
          data-wow-delay=".5s"
          v-text="$t(hasToken ? 'DASHBOARD' : 'START_INVESTING')"
        />
      </div>
    </div>

    <!-- Возможности платформы -->
    <div class="section-2">
      <div class="container">
        <div class="col-1">
          <h2
            v-if="Features.title"
            class="title animate__animated wow animate__fadeInUp"
            data-wow-delay=".2s"
          >
            {{ Features.title }}
          </h2>
          <p
            v-if="Features.desc"
            class="text animate__animated wow animate__fadeInUp"
            data-wow-delay=".2s"
          >
            {{ Features.desc }}
          </p>
        </div>
        <div class="col-2">
          <p
            v-if="Features.text"
            class="text animate__animated wow animate__fadeInUp"
            data-wow-delay=".2s"
          >
            {{ Features.text }}
          </p>
          <div v-if="Features.items.length" class="cards">
            <div
              v-for="(item, key) in Features.items"
              :key="key"
              class="card animate__animated wow animate__fadeIn"
              :data-wow-delay="`${key / Features.items.length}s`"
            >
              <div class="card_img">
                <img :src="item.img" alt="">
              </div>
              <div class="card_content">
                <h3 class="card_title" v-html="item.title" />
                <p class="card_text" v-html="item.desc" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Направления развития -->
    <div v-if="DirectionsForDevelopment.items.length" class="section-3">
      <div class="container">
        <div class="content animate__animated wow animate__fadeIn">
          <h2 class="title" v-html="DirectionsForDevelopment.title" />
          <p class="text" v-html="DirectionsForDevelopment.desc" />
        </div>

        <div
          v-for="(item, key) in DirectionsForDevelopment.items"
          :key="key"
          :class="['card', `card-${item.id}`, 'animate__animated', 'wow', 'animate__fadeInRight']"
          data-wow-delay=".2s"
        >
          <h3 class="card_title" v-html="item.title" />
          <p class="card_text" v-html="item.text" />
          <div class="card_btns">
            <nuxt-link
              v-for="(link, i) in item.buttons"
              :key="i"
              :to="link.url"
              :class="['btn', ...link.classes]"
              v-text="link.label"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Roadmap -->
    <div class="section-4">
      <div class="container">
        <h2 class="title card-3 animate__animated wow animate__fadeInLeft" data-wow-delay=".2s">
          {{ roadmap.title }}
        </h2>
        <p class="text card-3 animate__animated wow animate__fadeInDown" data-wow-delay=".2s">
          {{ roadmap.desc }}
        </p>
        <swiper class="roadmap" :options="swiperOptions">
          <swiper-slide
            v-for="(item, key) in roadmap.items"
            :key="key"
            :class="['roadmap_card', 'swiper-slide', `card-${key}`, 'animate__animated', 'wow', 'animate__fadeInLeft']"
            :data-wow-delay="`${key / roadmap.items.length}s`"
          >
            <div class="roadmap_img">
              <img :src="item.img" alt="">
            </div>
            <div class="roadmap_title" v-html="item.date" />
            <div class="roadmap_text" v-html="item.text" />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </main>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import { INDEXES, WHITEPAPER } from "~/global";

export default {
  name: "PageHome",
  components: { Swiper, SwiperSlide },
  layout: "public",
  data () {
    return {
      WHITEPAPER,
      disabled: true,
      Features: {
        title: "Возможности платформы",
        desc: "На сегодняшний день, Kaizen располагает широким выбором инструментов и имеет в распоряжении развитую инфраструктуру.",
        text: "Диверсификация рисков является приоритетом, и включает в себя три основных направления:",
        items: [
          {
            id: 1,
            img: require("~/assets/img/s2-card-1.svg"),
            title: "Риск менеджмент",
            desc: "Три проекта в одной платформе задействованы с целью минимизации рисков пользователей. В случае убыточности вкладов в один из проектов, представленных платформой, пользователю возмещается средства из деятельности двух других проектов, посредством выкупа его токенов компанией оператора."
          },
          {
            id: 2,
            img: require("~/assets/img/s2-card-2.svg"),
            title: "Выгодные условия",
            desc: "Чрезвычайно низкие тарифы на электроэнергию - всего $0.001 за кВт/ч в проекте Vanguard. Льготные условия налогового обложения и таможенных тарифов. Компания является участником индустриальных экономических зон на территории РК."
          },
          {
            id: 3,
            img: require("~/assets/img/s2-card-3.svg"),
            title: "Ликвидность",
            desc: "Продавайте и покупайте токены от Kaizen на мировых крипто биржах c высокой ликвидностью."
          }
        ]
      },
      roadmap: {
        title: "Roadmap",
        desc: "2022 - 2023",
        items: [
          {
            date: "Март 2022",
            img: require("~/assets/img/roadmap-1.svg"),
            text: "Pre-sale Индекс токена KZN и майнинг токена VNG"
          },
          {
            date: "Май 2022",
            img: require("~/assets/img/roadmap-2.svg"),
            text: "IDO Индекс токена KZN и майнинг токена VNG"
          },
          {
            date: "Июнь 2022",
            img: require("~/assets/img/roadmap-3.svg"),
            text: "Public sale Индекс токена KZN и майнинг токена VNG"
          },
          {
            date: "Июль 2022",
            img: require("~/assets/img/roadmap-4.svg"),
            text: "Pre-sale токена производственного предприятия SRK"
          },
          {
            date: "Август 2022",
            img: require("~/assets/img/roadmap-5.svg"),
            text: "IDO токена производственного предприятия SRK"
          },
          {
            date: "Август 2022",
            img: require("~/assets/img/roadmap-6.svg"),
            text: "Public sale токена производственного предприятия SRK"
          }
        ]
      },
      swiperOptions: {
        slidesPerView: "auto",
        spaceBetween: 50,

        breakpoints: {
          1140: {
            spaceBetween: 20
          }
        }
      }
    };
  },
  computed: {
    indexes () {
      return INDEXES;
    },
    coverTitle () {
      return "Современные блокчейн решения";
    },
    coverDesc () {
      return "Инвестируйте в токенизированные предприятия, майнинг, а также криптовалютные индексы вместе с Kaizen";
    },
    hasToken () {
      return this.$store.getters.hasToken;
    },
    DirectionsForDevelopment () {
      return {
        title: "Направления развития",
        desc: "На сегодняшний день, Kaizen располагает широким выбором инструментов и имеет в распоряжении развитую инфраструктуру.",
        items: [
          {
            id: 2,
            title: "Криптовалютные <span> ⸺ индексы</span>",
            text: "Четыре самых высокодоходных криптовалютных индекса из разных секторов.",
            buttons: [
              {
                label: `${this.$t("BUY")} KZN`,
                url: this.localePath(this.hasToken ? "my" : "auth"),
                classes: ["btn-blue", "action"]
              },
              {
                label: this.$t("MORE_DETAILS"),
                url: this.localePath("indexes"),
                classes: ["btn-outline details"]
              }
            ]
          },
          {
            id: 1,
            title: "Индустриальный <span> ⸺ майнинг</span>",
            text: "Участвуйте в индустриальном майнинге Биткоина.",
            buttons: [
              {
                label: `${this.$t("BUY")} VNG`,
                url: this.localePath(this.hasToken ? "my" : "auth"),
                classes: ["btn-yellow", "action"]
              },
              {
                label: this.$t("MORE_DETAILS"),
                url: this.localePath("mining"),
                classes: ["btn-outline details"]
              }
            ]
          },
          {
            id: 3,
            title: "Реальный сектор <span> ⸺ производства</span>",
            text: "Получайте прибыль от предприятий из реального сектора экономики.",
            buttons: [
              {
                label: `${this.$t("BUY")} SRK`,
                url: this.localePath(this.hasToken ? "my" : "auth"),
                classes: ["btn-red", "action"]
              },
              {
                label: this.$t("MORE_DETAILS"),
                url: this.localePath("production"),
                classes: ["btn-outline details"]
              }
            ]
          }
        ]
      };
    }
  },
  mounted () {
    // курсы валют
    this.getCurrency();
  },
  methods: {
    /** Получаем название символа без 'USDT' */
    getIndexName (index) {
      return index.split("USDT")[0];
    },

    /** Получаем курсы валют */
    getCurrency () {
      this.$API.getCurrency((r) => {
        this.cryptoIndexes = r.filter(e => e.index).map((x) => {
          return {
            index: x.index,
            price: x.price,
            symbol: this.getIndexName(x.symbol)
          };
        });
      });
    },

    /** Получить курс конкретного индекса */
    getIndexPrice (indexName) {
      const price = this.cryptoIndexes.find(e => e.symbol.toUpperCase() === indexName.toUpperCase())?.price ?? 0;
      return price.toLocaleString("en-US", this.$LOCALESTRING_USD(0, 0));
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
