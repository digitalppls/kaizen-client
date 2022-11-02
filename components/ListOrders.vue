<template>
  <div>
    <ul
      v-if="errors.length"
      class="list list--none m-b-20"
    >
      <li
        v-for="(error, idx) in errors"
        :key="idx"
        class="error-text"
        v-html="error"
      />
    </ul>

    <vue-good-table
      :columns="columns"
      :rows="rowsFiltered"
      :total-rows="totalRecords"
      :line-numbers="true"
      :isLoading.sync="loading"
      :pagination-options="{
          enabled: totalRecords > perPageDropdown[0],
          perPageDropdown,
          setCurrentPage: 1,
          nextLabel: '',
          prevLabel: '',
          rowsPerPageLabel: $t('ROWSPERPAGELABEL'),
          ofLabel: $t('OF').toLowerCase(),
          pageLabel: 'page',
          allLabel: $t('ALL')
        }"
      @on-page-change="onPageChange"
      @on-per-page-change="onPerPageChange"
      styleClass="vgt-table"
    >
      <!-- Фильтр -->
      <div
        slot="table-actions"
        class="display-flex ai--center"
        style="padding-right: 3px;"
      >
        <button
          class="btn btn-accent display-i-flex"
          style="font-size: 14px; height: 40px; padding: 9px;"
          @click="createOrder"
        >
          {{ $t("NEW_LIMIT_ORDER") }}
        </button>

        <ui-select
          v-model="filters.symbol.value"
          :options="filters.symbol.items"
          class="display-i-flex m-l-20"
        >
          <template #selected="{ option }">
            {{ option.text }}
          </template>
          <template #default="{ option }">
            {{ option.text }}
          </template>
        </ui-select>
        <ui-select
          v-model="filters.direction.value"
          :options="filters.direction.items"
          class="display-i-flex m-l-5"
        >
          <template #selected="{ option }">
            {{ option.text }}
          </template>
          <template #default="{ option }">
            {{ option.text }}
          </template>
        </ui-select>
      </div>
      <!-- Строки -->
      <template
        slot="table-row"
        slot-scope="props"
      >
        <div v-if="props.column.field === 'date' && !!props.row.date">
          <div>
            {{ $DateText(props.row.date, false) }}, {{ $TimeText(props.row.date) }}
          </div>
          <small
            v-if="isAdmin"
            class="color-gray cursor--pointer"
            title="Нажмите чтобы скопировать"
            v-text="`ID: ${$shortString(props.row.id)}`"
            @click="copyText(props.row.id)"
          />
        </div>
        <div v-else-if="props.column.field === 'username'">
          <div class="font-size-16 font-700">
            {{ props.row.user.username }}
          </div>
          <small
            v-if="isAdmin"
            class="color-gray cursor--pointer"
            title="Нажмите чтобы скопировать"
            v-text="`ID: ${$shortString(props.row.userId)}`"
            @click="copyText(props.row.userId)"
          />
        </div>
        <div
          v-else-if="props.column.field === 'direction'"
          :class="props.row.direction === 'sell' ? 'color-red' : 'color-success'"
        >
          <span class="font-500">{{ $t(props.row.direction.toUpperCase()) }}</span>
        </div>
        <div
          v-else-if="props.column.field === 'price'"
          class="display-i-flex ai--baseline"
        >
          <span class="font-size-18 font-700">
            {{ props.row.priceUsd.toLocaleString("ru-RU", $LOCALESTRING(1, 5)) }}
          </span>
          <small
            class="color-gray text-uppercase"
            style="margin-left: 3px; line-height: 1em;"
            v-text="'USDT'"
          />
        </div>
        <div
          v-else-if="props.column.field === 'amount'"
          class="display-i-flex ai--baseline"
        >
          <span class="font-size-18 font-700">{{ props.row.amount.toLocaleString("ru-RU", $LOCALESTRING(1, 5)) }}</span>
          <small
            class="text-uppercase font-500"
            :style="{marginLeft: '3px', lineHeight: '1em', color: $TokenColors[props.row.symbol]}"
          >
            {{ props.row.symbol }}
          </small>
        </div>
        <div v-else-if="props.column.field === 'action'">
          <button
            v-if="props.row.userId === $store.getters.user.id"
            :class="['btn', 'btn-dark']"
            :disabled="selectedOrder && selectedOrder._id === props.row._id"
            :title="$t('EDIT_LIMIT_ORDER')"
            style="padding: 5px 10px"
            @click="editOrder(props.row)"
          >
            <ui-preloader
              v-if="selectedOrder && selectedOrder._id === props.row._id"
              center
              color="black"
              size="button"
            />
            <template v-else>
              <svg width="20" height="20" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M46.3071 60H9.26141C6.80513 60 4.44946 59.0242 2.7126 57.2874C0.975753 55.5505 0 53.1949 0 50.7386V13.6929C0 11.2367 0.975753 8.88099 2.7126 7.14414C4.44946 5.40729 6.80513 4.43154 9.26141 4.43154H21.61C22.4287 4.43154 23.2139 4.75679 23.7929 5.33574C24.3718 5.91469 24.6971 6.69991 24.6971 7.51867C24.6971 8.33743 24.3718 9.12266 23.7929 9.70161C23.2139 10.2806 22.4287 10.6058 21.61 10.6058H9.26141C8.44265 10.6058 7.65743 10.9311 7.07848 11.51C6.49953 12.089 6.17427 12.8742 6.17427 13.6929V50.7386C6.17427 51.5573 6.49953 52.3426 7.07848 52.9215C7.65743 53.5005 8.44265 53.8257 9.26141 53.8257H46.3071C47.1258 53.8257 47.911 53.5005 48.49 52.9215C49.0689 52.3426 49.3942 51.5573 49.3942 50.7386V38.39C49.3942 37.5713 49.7194 36.7861 50.2984 36.2071C50.8773 35.6282 51.6626 35.3029 52.4813 35.3029C53.3001 35.3029 54.0853 35.6282 54.6643 36.2071C55.2432 36.7861 55.5685 37.5713 55.5685 38.39V50.7386C55.5685 53.1949 54.5927 55.5505 52.8559 57.2874C51.119 59.0242 48.7633 60 46.3071 60Z" fill="#555860"/>
                <path d="M38.8979 10.2045L23.6166 25.6402C23.4081 25.8261 23.267 26.0757 23.2153 26.3502L20.1281 38.1431C20.0533 38.4032 20.0512 38.6788 20.1219 38.94C20.1927 39.2012 20.3336 39.4381 20.5295 39.6249C20.68 39.7456 20.8531 39.8351 21.0386 39.8881C21.2241 39.9411 21.4184 39.9566 21.61 39.9336C21.7423 39.9611 21.8789 39.9611 22.0113 39.9336L33.8041 36.8465C34.0786 36.7947 34.3283 36.6536 34.5142 36.4451L49.7955 21.1021L38.8979 10.2045Z" fill="#555860"/>
                <path d="M58.6556 5.82075L54.1793 1.3444C53.3018 0.482759 52.1212 0 50.8915 0C49.6617 0 48.4811 0.482759 47.6037 1.3444L43.2199 5.82075L54.1793 16.7801L58.6556 12.3963C59.5172 11.5189 60 10.3383 60 9.10855C60 7.87879 59.5172 6.69818 58.6556 5.82075Z" fill="#555860"/>
              </svg>
            </template>
          </button>
          <button
            v-if="props.row.userId === $store.getters.user.id"
            :class="['btn', 'btn-dark']"
            :disabled="selectedOrder && selectedOrder._id === props.row._id"
            :title="$t('DELETE_LIMIT_ORDER')"
            style="padding: 5px 10px"
            @click="removeOrder(props.row)"
          >
            <ui-preloader
              v-if="selectedOrder && selectedOrder._id === props.row._id"
              center
              color="black"
              size="button"
            />
            <template v-else>
              <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.7254 20H3.27411C2.72089 19.9987 2.19072 19.7835 1.79953 19.4016C1.40835 19.0196 1.18799 18.5019 1.18664 17.9618V3.58757C1.18664 3.38932 1.2673 3.19918 1.41087 3.059C1.55445 2.91881 1.74917 2.84006 1.95222 2.84006H14.0483C14.2513 2.84006 14.4461 2.91881 14.5896 3.059C14.7332 3.19918 14.8139 3.38932 14.8139 3.58757V17.9618C14.8125 18.5021 14.592 19.0199 14.2006 19.4019C13.8092 19.7839 13.2788 19.9989 12.7254 20ZM2.71779 4.33509V17.9618C2.71793 18.1058 2.77658 18.2439 2.88088 18.3457C2.98518 18.4476 3.1266 18.5048 3.27411 18.505H12.7254C12.873 18.505 13.0145 18.4478 13.1189 18.3459C13.2233 18.244 13.2821 18.1059 13.2822 17.9618V4.33509H2.71779Z" fill="#555860"/>
                <path d="M11.2152 4.33509H4.78433C4.58129 4.33509 4.38656 4.25633 4.24299 4.11614C4.09942 3.97596 4.01876 3.78582 4.01876 3.58757V2.22909C4.01957 1.63805 4.26042 1.07146 4.68849 0.653583C5.11656 0.235705 5.6969 0.000659255 6.30221 0H9.69728C10.3026 0.000659255 10.8829 0.235705 11.311 0.653583C11.7391 1.07146 11.9799 1.63805 11.9807 2.22909V3.58757C11.9807 3.78582 11.9001 3.97596 11.7565 4.11614C11.6129 4.25633 11.4182 4.33509 11.2152 4.33509ZM5.54991 2.84006H10.4496V2.22909C10.4493 2.0344 10.37 1.84777 10.2289 1.71015C10.0879 1.57253 9.89667 1.49516 9.69728 1.49503H6.30221C6.10291 1.49529 5.91184 1.57272 5.77091 1.71032C5.62998 1.84793 5.55069 2.03448 5.55042 2.22909L5.54991 2.84006Z" fill="#555860"/>
                <path d="M7.99974 17.1385C7.7967 17.1385 7.60198 17.0598 7.4584 16.9196C7.31483 16.7794 7.23417 16.5893 7.23417 16.391V6.44955C7.23417 6.2513 7.31483 6.06117 7.4584 5.92098C7.60198 5.7808 7.7967 5.70204 7.99974 5.70204C8.20279 5.70204 8.39751 5.7808 8.54109 5.92098C8.68466 6.06117 8.76532 6.2513 8.76532 6.44955V16.391C8.76532 16.5893 8.68466 16.7794 8.54109 16.9196C8.39751 17.0598 8.20279 17.1385 7.99974 17.1385Z" fill="#555860"/>
                <path d="M5.23551 17.1385C5.03247 17.1385 4.83774 17.0598 4.69417 16.9196C4.55059 16.7794 4.46994 16.5893 4.46994 16.391V6.44955C4.46994 6.2513 4.55059 6.06117 4.69417 5.92098C4.83774 5.7808 5.03247 5.70204 5.23551 5.70204C5.43855 5.70204 5.63328 5.7808 5.77685 5.92098C5.92043 6.06117 6.00108 6.2513 6.00108 6.44955V16.391C6.00108 16.5893 5.92043 16.7794 5.77685 16.9196C5.63328 17.0598 5.43855 17.1385 5.23551 17.1385Z" fill="#555860"/>
                <path d="M10.7645 17.1385C10.5614 17.1385 10.3667 17.0598 10.2231 16.9196C10.0796 16.7794 9.99892 16.5893 9.99892 16.391V6.44955C9.99892 6.2513 10.0796 6.06117 10.2231 5.92098C10.3667 5.7808 10.5614 5.70204 10.7645 5.70204C10.9675 5.70204 11.1623 5.7808 11.3058 5.92098C11.4494 6.06117 11.5301 6.2513 11.5301 6.44955V16.391C11.5301 16.5893 11.4494 16.7794 11.3058 16.9196C11.1623 17.0598 10.9675 17.1385 10.7645 17.1385Z" fill="#555860"/>
                <path d="M15.2344 4.33509H0.765575C0.562532 4.33509 0.367805 4.25633 0.224232 4.11614C0.0806587 3.97596 0 3.78582 0 3.58757C0 3.38932 0.0806587 3.19918 0.224232 3.059C0.367805 2.91881 0.562532 2.84006 0.765575 2.84006H15.2344C15.4375 2.84006 15.6322 2.91881 15.7758 3.059C15.9193 3.19918 16 3.38932 16 3.58757C16 3.78582 15.9193 3.97596 15.7758 4.11614C15.6322 4.25633 15.4375 4.33509 15.2344 4.33509Z" fill="#555860"/>
              </svg>
            </template>
          </button>
        </div>
        <div v-else>
          {{ props.formattedRow[props.column.field] }}
        </div>
      </template>
    </vue-good-table>

    <ui-modal
      v-if="showModal"
      @close="closeModal"
    >
      <create-order
        :order="selectedOrder"
        :direction="direction"
        @complete="closeModal"
      />
      <p
        v-if="isAdmin"
        class="font-300 m-t-30"
      >
        Открывая ордер на покупку, создается своего рода "робот", который скупает все открытые ордера, пока не выкупит все необходимое количество токенов.
      </p>
    </ui-modal>
  </div>
</template>

<script>
import { VueGoodTable } from "vue-good-table";
import UiPreloader from "./ui/ui-preloader.global";
import UiSelect from "./ui/ui-select.global";
import UiModal from "./ui/ui-modal.global";
import CreateOrder from "./admin/CreateOrder";

export default {
  name: "ListOrders",
  components: { CreateOrder, UiModal, UiSelect, UiPreloader, VueGoodTable },
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const perPage = 20;

    return {
      columns: [
        {
          label: this.$t("DATE"),
          field: "date",
          width: "20%",
          tdClass: "v--center",
          sortable: false
        },
        {
          label: this.$t("DIRECTION"),
          field: "direction",
          width: "10%",
          tdClass: "v--center",
          sortable: false
        },
        {
          label: this.$t("USERNAME"),
          field: "username",
          width: "20%",
          tdClass: "v--center",
          sortable: false
        },
        {
          label: this.$t("PRICE"),
          field: "price",
          width: "15%",
          tdClass: "v--center",
          sortable: true
        },
        {
          label: this.$t("AMOUNT"),
          field: "amount",
          width: "20%",
          tdClass: "v--center",
          sortable: true
        },
        {
          label: this.$t("ACTION"),
          field: "action",
          width: "15%",
          tdClass: "v--center",
          sortable: false
        }
      ],
      perPageDropdown: [perPage],
      direction: "",
      showModal: false,
      selectedOrder: null,
      errors: [],
      loading: false,
      totalRecords: 0,
      rows: [],
      page: 1,
      offset: 0,
      limit: 1000,
      filters: {
        symbol: {
          value: { value: "", text: `${this.$t("ALL")} ${this.$t("TOKENS")}` },
          compare: (itemValue, filterValue) => !filterValue || itemValue === filterValue,
          items: [
            { value: "", text: `${this.$t("ALL")} ${this.$t("TOKENS")}` },
            { value: "kzn", text: "KZN" },
            { value: "srk", text: "SRK" },
            { value: "vng", text: "VNG" }
          ]
        },
        direction: {
          value: { value: "", text: this.$t("ALL") },
          compare: (itemValue, filterValue) => !filterValue || itemValue === filterValue,
          items: [
            { value: "", text: this.$t("ALL") },
            { value: "sell", text: this.$t("SELL") },
            { value: "buy", text: this.$t("BUY") }
          ]
        }
      }
    };
  },
  computed: {
    rowsFiltered () {
      return Object.entries(this.filters).reduce((rows, [key, filter]) => rows.filter(r => filter.compare(r[key], filter.value.value)), this.rows);
    }
  },
  mounted () {
    this.loadOrders();
  },
  methods: {
    /** Подгурзка данных таблицы */
    loadOrders (event, direction = this.direction) {
      const params = {
        offset: this.offset,
        limit: this.limit
      }
      if (direction) params.direction = direction

      console.log(params);
      this.$API.TokenOrderListAll(params,(items) => {
        this.rows = items.list;
        this.totalRecords = items.length;
        this.loading = false;
      }, (e) => {
        this.loading = false;
        this.errors = Array.isArray(e?.message) ? this.$t(e?.message.toUpperCase()) : [this.$t(e.message.toUpperCase())];
      });
    },

    /** Новый ордер */
    createOrder () {
      this.showModal = true;
      this.direction = this.isAdmin ? "buy" : "sell";
    },

    /** Удалить order */
    removeOrder (order) {
      this.selectedOrder = order;
      const confirmMsg = `${this.$t("DELETE_LIMIT_ORDER_CONFIRM")} #${order._id}`;
      const params = {
        _id: order._id
      };
      if (confirm(confirmMsg)) {
        this.loading = true;
        this.$API.TokenOrderSave(order.direction, params, (rows) => {
          this.loading = false;
          this.selectedOrder = null;
          this.loadOrders();
        }, (e) => {
          alert("Error when deleting an order. See the browser console.");
          console.error("[TokenOrderSellSave][REMOVE]", e);
          this.loading = false;
          this.selectedOrder = null;
          if (e.message === "incorrect_access_token") {
            this.$store.dispatch("logout");
            this.$router.push(this.localePath("auth"));
          }
          this.errors = Array.isArray(e?.message)
            ? this.$t(e?.message.toUpperCase())
            : [this.$t(e.message.toUpperCase())];
        });
      } else {
        this.selectedOrder = null;
      }
    },

    /** Покупка ордера */
    buyOrder (order) {
      this.selectedOrder = order;
      console.log(order);
      if (confirm(`Подтверждаете покупку ${order.amount}${order.symbol.toUpperCase()} по цене $${order.priceUsd} за $${order.priceUsd * order.amount}?`)) {
        const params = {
          userId: order.userId,
          direction: "buy",
          symbol: order.symbol,
          amount: order.amount,
          priceUsd: order.priceUsd,
          date: order.date
        };
        this.$API.TokenOrderBuySave(params, (rows) => {
          this.loading = false;
          this.selectedOrder = null;
          this.loadOrders();
        }, (e) => {
          alert("Ошибка при покупке ордера. См. консоль браузера.");
          console.error("[TokenOrderBuySave][BUY]", e);
          this.loading = false;
          this.selectedOrder = null;
          if (e.message === "incorrect_access_token") {
            this.$store.dispatch("logout");
            this.$router.push(this.localePath("auth"));
          }
          this.errors = Array.isArray(e?.message)
            ? this.$t(e?.message.toUpperCase())
            : [this.$t(e.message.toUpperCase())];
        });
      } else {
        this.selectedOrder = null;
      }
    },

    /** Редактировать ордер */
    editOrder (order) {
      this.selectedOrder = order;
      this.direction = order.direction;
      this.showModal = true;
    },

    /** Закрыть модальное окно.
     * Также это обработка события, когда ордер добавлен или отредактирован
     */
    closeModal () {
      this.showModal = this.selectedOrder = this.direction = null;
      this.loadOrders();
    },

    /** Обновление параметров таблицы */
    updateParams (newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },

    /** Переключение страниц пагинации */
    onPageChange (params) {
      this.updateParams({ page: params.currentPage });
      this.offset = (params.currentPage - 1) * params.currentPerPage;
      this.loadOrders();
    },
    /** Изменение лимита отображаемых данных на странице */
    onPerPageChange (params) {
      console.log("onPerPageChange", params);
      let perPage = params.currentPerPage;
      if (params.currentPerPage === -1) {
        perPage = this.totalRecords;
        this.offset = 0;
      }

      this.updateParams({ perPage });
      this.loadOrders();
    },

    /** Копировать в буфер */
    copyText (text) {
      const textArea = document.createElement("textarea");
      textArea.width = "1px";
      textArea.height = "1px";
      textArea.background = "transparent";
      textArea.value = text;
      document.body.append(textArea);
      textArea.select();
      textArea.setSelectionRange(0, 999999999);
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
  }
};
</script>

<style scoped>

</style>
