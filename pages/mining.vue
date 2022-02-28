<template>
  <main class="main">
    <div class="mining-hero-section hero-section">
      <div class="container">
        <h1 class="title animate__animated wow animate__fadeIn" v-text="coverTitle" />
        <p class="text animate__animated wow animate__fadeIn" data-wow-delay=".2s" v-text="coverDesc" />
        <button class="btn btn-yellow animate__animated wow animate__fadeIn" data-wow-delay=".5s">
          {{ $t("BUY") }} VNG
        </button>
      </div>
    </div>
    <!-- Схема -->
    <div class="mining-scheme-section">
      <div class="container">
        <div class="scheme">
          <div class="scheme__text">
            <span class="accent">
              Платформа Kaizen выкупает токены VNG
            </span>
            на бирже для поддержания цены и ликвидности
          </div>
          <div class="scheme__body">
            <div class="scheme__body-right-line">
              <div class="custom-arrow" />
            </div>
            <div class="scheme__body-left-line">
              <div class="custom-arrow" />
            </div>
            <div class="scheme__blocks">
              <div class="scheme__block scheme__block-1">
                <div class="scheme__card">
                  <div class="scheme__card-content">
                    <h3 class="scheme__card-title">
                      Биржа, где
                      <span class="accent">
                        торгуется токен VNG
                      </span>
                    </h3>
                    <div class="scheme__card-text">
                      Пользователь по своему усмотрению отправляет токены на биржу.
                    </div>
                  </div>
                </div>
              </div>
              <div class="scheme__block scheme__block-2">
                <div class="scheme__card">
                  <div class="scheme__card-content">
                    <h3 class="scheme__card-title">
                      Майнинг BTC
                      <span class="accent">
                        и других криптовалют
                      </span>
                    </h3>
                    <div class="scheme__card-text">
                      в дата-центрах Vanguard
                    </div>
                  </div>
                </div>
              </div>
              <div class="scheme__block scheme__block-3">
                <div class="custom-arrow">
                  <span class="custom-arrow__item" />
                </div>
                <span class="accent">
                  VNG
                </span>
              </div>
              <div class="scheme__block scheme__block-4">
                <div class="custom-arrow" />
                <div class="scheme__card">
                  <div class="scheme__card-content">
                    <h3 class="scheme__card-title">
                      Конвертация
                      <span class="accent">
                        BTC в USDC на бирже
                      </span>
                    </h3>
                  </div>
                </div>
                <div class="custom-arrow" />
              </div>
              <div class="scheme__block scheme__block-5">
                <div class="scheme__card">
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
              <div class="scheme__block scheme__block-6">
                <div class="usdc">
                  <span>
                    USDC
                  </span>
                  <div class="custom-arrow">
                    <div class="custom-arrow__item" />
                  </div>
                </div>
                <div class="vng">
                  <div class="custom-arrow">
                    <div class="custom-arrow__item" />
                  </div>

                  <span class="accent">
                    VNG
                  </span>
                </div>
              </div>
              <div class="scheme__block scheme__block-7">
                <div class="scheme__card">
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
            </div>
            <div class="scheme__diagrams">
              <div class="scheme__diagram">
                <div class="scheme__diagram-img">
                  <div class="progress">
                    <img src="~/assets/img/mining-scheme-diagram-yellow.svg" alt="">
                  </div>
                  <span class="number accent">
                    70%
                  </span>
                </div>
                <div class="scheme__diagram-content">
                  <div class="scheme__diagram-title">
                    Пул ликвидности
                  </div>
                  <div class="scheme__diagram-text">
                    Пул ликвидности для Dex бирж и обратный выкуп токенов VNG для сжигания через Smart-контракт
                  </div>
                </div>
              </div>
              <div class="scheme__diagram">
                <div class="scheme__diagram-img">
                  <div class="progress">
                    <img src="~/assets/img/mining-scheme-diagram-green.svg" alt="">
                  </div>
                  <span class="number">
                    30%
                  </span>
                </div>
                <div class="scheme__diagram-content">
                  <div class="scheme__diagram-title">
                    Операционные расходы
                  </div>
                  <div class="scheme__diagram-text">
                    Операционные расходы компании и покупка майнинг-оборудования для
                    развития дата-центров
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Контент -->
    <div class="mining-data-section">
      <div class="container">
        <div class="content">
          <h2 class="title" v-html="content.title" />
          <div class="text">
            <p v-html="content.text_1" />
            <p v-html="content.text_2" />
          </div>
          <div class="text-white" v-html="content.text_3" />
        </div>
        <div class="img">
          <img src="~/assets/img/mining-data.jpg" alt="">
        </div>
      </div>
    </div>

    <!-- Токеномика -->
    <div class="mining-tokenomic-section tokenomic-section">
      <div class="container">
        <div class="diagram-box">
          <div class="diagram-box__diagram">
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
                stroke-dasharray="41.79889 236.860378"
                stroke-dashoffset="69.664817"
              />
              <circle
                class="svg-diagram__segment"
                cx="50"
                cy="50"
                r="44.35"
                fill="transparent"
                stroke="#F0C149"
                stroke-width="11.3"
                stroke-dasharray="9.359778 269.29949"
                stroke-dashoffset="27.865927"
              />
              <circle
                class="svg-diagram__segment"
                cx="50"
                cy="50"
                r="44.35"
                fill="transparent"
                stroke="#51ECA1"
                stroke-width="11.3"
                stroke-dasharray="42.7989 236.8604"
                stroke-dashoffset="19.5061"
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
                stroke-dashoffset="-22.2927"
              />
            </svg>
            <div class="number" v-text="'10 000 000 VNG'" />
          </div>
          <div class="diagram-box__legend">
            <ul>
              <li>
                Pre-sale
                <span class="number" v-text="'15%'" />
              </li>
              <li>
                IDO
                <span class="number" v-text="'3%'" />
              </li>
              <li>
                Company Wallet
                <span class="number" v-text="'15%'" />
              </li>
              <li>
                Compensation fund
                <span class="number" v-text="'5%'" />
              </li>
              <li>
                Public sale
                <span class="number" v-text="'62%'" />
              </li>
            </ul>
          </div>
        </div>
        <div class="content">
          <h2 class="title">
            Токеномика
          </h2>
          <div class="amount">
            <span>Общая сумма токенов:</span>
            <span class="accent">10 000 000 VNG</span>
          </div>
          <div class="text">
            Эмиссия в интересах пользователей является ограниченой и дополнительная эмиссия не предполагается. Все
            токены которые не будут проданы
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
      content: {
        title: "Бизнес-процесс инсталляции и управления дата-центрами",
        text_1: "Компания оператор проекта «Индустриальный майнинг» размещает майнинговое оборудование на нефтяном месторождении, с компанией владельцем месторождения заключено соглашение о использовании попутного газа. Электроэнергия вырабатывается электростанцией гпг (газопоршневой генератор) использующий в качестве топлива попутный газ месторождения. Опытный генератор ГПГ мощностью 2 мВт уже задействован на месторождении, и показывает стабильную безотказную работу. Также есть возможность развития потенциала мощности до 8 мВт. Из опыта эксплуатации электростанции ГПГ выявлена себестоимость 1 кВт/ч и составляет 0.007$, что значительно ниже стоимости электроэнергии у поставщиков на рынке. 70% от добытых биткойнов отправляется в пул ликвидности на децентрализованные биржи, 30% отправляется в счет операционных расходов включая электроэнергию, менеджмент компании и покупку нового майнинг оборудования.",
        text_2: "Автономное электроснабжение действует вне сетей общего пользования и не создает дефицит в энергобалансе региона. Автономное электроснабжение не может быть отключено какими-либо административными предписаниями в связи с возможным дефицитом электроэнергии в регионе.",
        text_3: "Низкая стоимость электроэнергии и автономностьявляется фактором высокой рентабельности проекта «Индустриальный майнинг» платформы Kaizenfund"
      }
    };
  },
  computed: {
    coverTitle () {
      return "Участвуйте в индустриальном майнинге с токеном VNG";
    },
    coverDesc () {
      return "Kaizen предоставляет доступ к майнингу биткойна с самыми выгодными условиями.";
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

</style>
