<template>
  <main class="main">
    <div class="industry-hero-section hero-section section-1">
      <div class="container">
        <h1 class="title animate__animated wow animate__fadeIn" v-text="coverTitle" />
        <p class="text animate__animated wow animate__fadeIn" data-wow-delay=".2s" v-text="coverDesc" />
        <nuxt-link
          :to="localePath(hasToken ? 'my' : 'auth')"
          class="btn btn-yellow animate__animated wow animate__fadeIn"
          data-wow-delay=".5s"
          v-text="`${$t('BUY')} SRK`"
        />
      </div>
    </div>
    <!-- Схема -->
    <div class="industry-scheme-section">
      <div class="container">
        <div class="scheme">
          <div class="scheme__body">
            <div class="scheme__blocks">
              <div class="scheme__block scheme__block-1">
                <div class="scheme__text">
                  Выкуп SRK на бирже для сжигания и удержания курса
                </div>
                <div class="arrows">
                  <div class="custom-arrow white" />
                  <div class="red-line">
                    <div class="custom-arrow" />
                  </div>
                </div>
              </div>
              <div class="scheme__block scheme__block-2">
                <div class="scheme__card animate__animated wow animate__fadeIn">
                  <div class="scheme__card-content">
                    <h3 class="scheme__card-title">
                      Биржа, где
                      <span class="accent">
                        торгуется токен SRK
                      </span>
                    </h3>
                    <div class="scheme__card-text">
                      Пользователь по своему усмотрению отправляет токены на биржу.
                    </div>
                  </div>
                </div>
                <div class="arrows">
                  <div class="custom-arrow white" />
                  <div class="custom-arrow" />
                </div>
              </div>
              <div class="scheme__block scheme__block-3">
                <div class="scheme__card animate__animated wow animate__fadeIn">
                  <div class="scheme__card-content">
                    <h3 class="scheme__card-title">
                      Личный кабинет
                      <span class="accent">
                        инвестора
                      </span>
                    </h3>
                  </div>
                  <img src="~/assets/img/logo.svg" alt="">
                </div>
              </div>
              <div class="scheme__block scheme__block-4">
                <div class="arrows">
                  <div class="usdc">
                    <span>
                      USDC
                    </span>
                    <div class="custom-arrow white">
                      <div class="custom-arrow__item" />
                    </div>
                  </div>

                  <div class="vng">
                    <div class="custom-arrow">
                      <div class="custom-arrow__item" />
                    </div>
                    <span class="accent">
                      SRK
                    </span>
                  </div>
                </div>
              </div>
              <div class="scheme__block scheme__block-5">
                <div class="scheme__card animate__animated wow animate__fadeIn">
                  <div class="scheme__card-content">
                    <h3 class="scheme__card-title">
                      Платформа
                      <span class="accent">
                        KAIZEN
                      </span>
                    </h3>
                  </div>
                  <img src="~/assets/img/logo.svg" alt="">
                </div>
              </div>
              <div class="scheme__block scheme__block-6">
                <div class="scheme__text">
                  Альтернативный вклад от участника в услугах, стройматериалы, машино-механизмы, трудочасы, подрядные
                  работы и прочие. За
                  альтернативный вклад участнику начисляются токены SRK
                </div>
                <div class="custom-arrow" />
              </div>
              <div class="scheme__block scheme__block-7">
                <div class="arrows">
                  <div class="custom-arrow" />
                  <div class="custom-arrow white" />
                </div>
                <div class="scheme__card animate__animated wow animate__fadeIn">
                  <div class="scheme__card-content">
                    <h3 class="scheme__card-title">
                      Конвертация USDT
                      <span class="accent">
                        в фиатную валюту
                      </span>
                    </h3>
                  </div>
                </div>
              </div>
              <div class="scheme__block scheme__block-8">
                <div class="custom-arrow" />
                <div class="scheme__card animate__animated wow animate__fadeIn">
                  <div class="scheme__card-content">
                    <h3 class="scheme__card-title">
                      Производственное
                      <span class="accent">
                        предприятие
                      </span>
                    </h3>
                  </div>
                </div>
                <div class="custom-arrow" />
              </div>
              <div class="scheme__block scheme__block-9">
                <div class="scheme__card animate__animated wow animate__fadeIn">
                  <div class="scheme__card-content">
                    <h3 class="scheme__card-title">
                      Накопление
                      <span class="accent">
                        в фиатной валюте
                      </span>
                    </h3>
                  </div>
                </div>
              </div>
              <div class="scheme__block scheme__block-10">
                <div class="red-line">
                  <div class="custom-arrow" />
                </div>
                <div class="scheme__text">
                  Часть средств,
                  <span class="accent">
                    направленных на конвертацию
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Контент -->
    <div class="industry-data-section">
      <div class="container">
        <div :class="['story', {'hidden': storyHidden}]" id="story">
          <div class="story__text">
            <p class="animate__animated wow animate__fadeIn">
              KAIZENFUND создает Блокчейн платформу Коллективного инвестирования, для применения ее в инвестировании
              Проектов в специальных
              Экономических Зонах (СЭЗ) с рядом льгот и преференций. Где компания Оператор Проекта одновременно и
              Оператор блокчейн платформы
              KAIZENFUND.
            </p>
            <p class="animate__animated wow animate__fadeIn">
              В платформе произведена эмиссия Токенов SRK, в количестве 100 млн.единиц для распределения Участникам.
              <br>
              Данные Токены будут долями создаваемого производственного предприятия в рамках Проекта. Участником проекта
              может стать любое лицо
              посредством покупки токена. На первом этапе покупка токена будет возможна только у оператора платформы на
              сайте платформы KAIZENFUND,
              на следующем этапе после процедуры листинга и вывода токена SRK на цифровую биржу можно осуществлять как
              покупку, так и продажу
              токенов на бирже (на которой представлен токен).
            </p>
            <p class="animate__animated wow animate__fadeIn">
              Платформа и токен создаётся ради строительства и обслуживания производственного предприятия, таким образом
              средства от продажи токенов
              идут на первом этапе на проектные и строительные работы. При строительных работах требуется как материалы
              и конструкции так и машины,
              механизмы и квалифицированные работники в различных сферах.
            </p>
            <div class="story__hidden">
              <p class="animate__animated wow animate__fadeIn">
                Участник проекта может осуществить покупку токенов и альтернативным платежам. Альтернативным платежам за
                Токены мы называем услуги
                для строительства , например: машино-механизмы; подрядные работы, которые участник должен выполнить
                получив до выполнения работ
                токены предприятия; также стройматериалы; поставка оборудования и прочее непосредственно используемое
                при строительстве
                Производственного предприятия.
              </p>
              <p class="animate__animated wow animate__fadeIn">
                Расчет стоимости услуг участника для начисления ему соответствующего количества токенов производит
                Компания Оператор проекта
                используя для расчёта государственные сборники и нормативы, данные сборники и нормативы актуализируются
                уполномоченными органами
                ежегодно и стоимость работ и материалов зачастую даже превышают рыночные.
              </p>
            </div>
            <div class="story__new">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem officia, atque soluta in minima qui vero explicabo labore
                adipisci est! Tempora quas, sit commodi in odit mollitia! Officiis sit obcaecati vel quos totam id eveniet porro hic deserunt in
                repudiandae vero aperiam voluptate doloremque dicta animi, earum, similique corporis? Optio.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis maxime iusto, sint iure perferendis illum quod nihil deserunt
                fugiat porro laborum voluptatibus alias, consectetur quae explicabo debitis numquam beatae earum ea possimus! Quasi, ipsum
                temporibus?
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero facere delectus dignissimos officia quaerat repudiandae dolorum
                eveniet dolores non quod?
              </p>
            </div>
          </div>
          <button
            v-if="storyHidden"
            class="btn story__btn"
            id="show_story"
            @click="storyHidden = false"
          >
            Читать все
          </button>
        </div>
        <div class="text animate__animated wow animate__fadeIn">
          Осуществляя деятельность, реализуя проведённую продукцию на рынке Производственное предприятие получает
          прибыль. Часть прибыли
          направляется на конвертацию в расчетные единицы децентрализованных рынков через Оператора Платформы
          KAIZENFUND. В свою очередь Оператор
          Платформы KAIZENFUND направляет полученные активы на биржи, где торгуется токен SRK, для выкупа токена SRK,
          тем самым удерживая котировку
          токена от падения. Таким образом покупателем значительной части токенов, посредством биржи, выступает Оператор
          платформы KAIZENFUND.
        </div>
      </div>
    </div>

    <!-- Токеномика -->
    <div class="industry-tokenomic-section tokenomic-section">
      <div class="container">
        <div class="diagram-box">
          <div class="diagram-box__diagram animate__animated wow animate__slideInLeft">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              class="svg-diagram"
            >
              <circle
                class="svg-diagram__ring"
                cx="50"
                cy="50"
                r="44.35"
                fill="transparent"
                stroke="#fff"
                stroke-width="11.3"
              />
              <circle
                class="svg-diagram__segment"
                cx="50"
                cy="50"
                r="44.35"
                fill="transparent"
                stroke="#BFEA44"
                stroke-width="11.3"
                stroke-dasharray="2.7866 275.8727"
                stroke-dashoffset="69.6648"
              />
              <circle
                class="svg-diagram__segment"
                cx="50"
                cy="50"
                r="44.35"
                fill="transparent"
                stroke="#F0C149"
                stroke-width="11.3"
                stroke-dasharray="0.836 277.8233"
                stroke-dashoffset="66.8782"
              />
              <circle
                class="svg-diagram__segment"
                cx="50"
                cy="50"
                r="44.35"
                fill="transparent"
                stroke="#51ECA1"
                stroke-width="11.3"
                stroke-dasharray="41.7989 236.8604"
                stroke-dashoffset="66.022"
              />
              <circle
                class="svg-diagram__segment"
                cx="50"
                cy="50"
                r="44.35"
                fill="transparent"
                stroke="#629CF2"
                stroke-width="11.3"
                stroke-dasharray="13.933 264.7263"
                stroke-dashoffset="24.2434"
              />
            </svg>
            <div class="number" v-text="'100 000 000 SRK'" />
          </div>
          <div class="diagram-box__legend">
            <ul>
              <li class="animate__animated wow animate__slideInUp" data-wow-delay=".1s">
                Pre-sale
                <span class="number" v-text="'1%'" />
              </li>
              <li class="animate__animated wow animate__slideInUp" data-wow-delay=".2s">
                IDO
                <span class="number" v-text="'0.3%'" />
              </li>
              <li class="animate__animated wow animate__slideInUp" data-wow-delay=".3s">
                Company Wallet
                <span class="number" v-text="'15%'" />
              </li>
              <li class="animate__animated wow animate__slideInUp" data-wow-delay=".4s">
                Compensation fund
                <span class="number" v-text="'5%'" />
              </li>
              <li class="animate__animated wow animate__slideInUp" data-wow-delay=".5s">
                Public sale
                <span class="number" v-text="'78.3%'" />
              </li>
            </ul>
          </div>
        </div>
        <div class="content animate__animated wow animate__slideInUp">
          <h2 class="title">
            Токеномика
          </h2>
          <div class="amount">
            <span>Общая сумма токенов:</span>
            <span class="accent">100 000 000 SRK</span>
          </div>
          <div class="text">
            Эмиссия в интересах пользователей является ограниченой и дополнительная эмиссия не предполагается. Все токены которые не будут проданы
            на этапах Pre-Sale и IDO будут направлены в фонд Public Sale.
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "PageMining",
  layout: "public",
  data () {
    return {
      storyHidden: true
    };
  },
  computed: {
    coverTitle () {
      return "SARY-ARKA INDUSTRY";
    },
    coverDesc () {
      return "Участвуйте в токенизированном производственном предприятии с токеном SRK";
    },
    hasToken () {
      return this.$store.getters.hasToken;
    }
  },
  mounted () {
  },
  methods: {}
};
</script>

<style lang="scss" scoped>

.story_show {
  -webkit-text-fill-color: unset;
}

</style>
