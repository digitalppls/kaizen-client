<template>
  <div class="cabinet-history">
    <h2 class="title">
      {{ $t("OPERATIONS") }}
    </h2>
    <ui-select
      v-model="type"
      :options="types"
      class="m-b-20"
      style="max-width: 400px"
      @input="select"
    >
      <template #selected="{ option }">
        {{ $t(option.label) }}
      </template>
      <template #default="{ option }">
        {{ $t(option.label) }}
      </template>
    </ui-select>
    <ui-preloader v-if="loading" center="true" />
    <div v-else-if="transactions.length" class="cabinet-history__body">
      <vue-good-table
        v-if="transactions"
        :columns="columns"
        :rows="transactions"
        style-class="vgt-table vgt-table--dark"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: 10,
          position: 'top',
          perPageDropdown: [5, 10, 15],
          dropdownAllowAll: true,
          setCurrentPage: 1,
          nextLabel: '',
          prevLabel: '',
          rowsPerPageLabel: $t('ROWSPERPAGELABEL'),
          ofLabel: $t('OF').toLowerCase(),
          pageLabel: 'page', // for 'pages' mode
          allLabel: $t('ALL'),
        }"
      >
        <template slot="table-row" slot-scope="props">
          <div v-if="props.column.field === 'date'">
            {{ $DateText(props.row.date) }}, {{ $TimeText(props.row.date) }}
          </div>
          <div v-else-if="props.column.field === 'type'">
            {{ $t(`OPERATION_${props.row.type.toUpperCase()}`) }}

            <div v-if="props.row.type === 'withdraw' || props.row.type === 'payment'" class="color-gray" style="display: flex; align-items: center;">
              <span class="m-r-10">
                Hash:
              </span>
              <span style="max-width: 300px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; display: inline-block; vertical-align: middle;">
                <a :href="`https://bscscan.com/tx/${props.row.hash}`" target="_blank">{{ props.row.hash }}</a>
              </span>

              <button
                class="m-l-10"
                style="padding: 0; background: none;"
                @click.prevent="copyText(props.row.hash)"
              >
                <svg
                  v-if="!copied"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 7V17C18 17.2652 17.8946 17.5196 17.7071 17.7071C17.5196 17.8946 17.2652 18 17 18H7C6.73478 18 6.48043 17.8946 6.29289 17.7071C6.10536 17.5196 6 17.2652 6 17V7C6 6.73478 6.10536 6.48043 6.29289 6.29289C6.48043 6.10535 6.73478 6 7 6H17C17.2652 6 17.5196 6.10535 17.7071 6.29289C17.8946 6.48043 18 6.73478 18 7ZM3 11H2V2H11V3C11 3.26522 11.1054 3.51957 11.2929 3.70711C11.4804 3.89464 11.7348 4 12 4C12.2652 4 12.5196 3.89464 12.7071 3.70711C12.8946 3.51957 13 3.26522 13 3V1C13 0.734783 12.8946 0.480429 12.7071 0.292893C12.5196 0.105357 12.2652 0 12 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.480429 0 0.734783 0 1V12C0 12.2652 0.105357 12.5196 0.292893 12.7071C0.48043 12.8946 0.734784 13 1 13H3C3.26522 13 3.51957 12.8946 3.70711 12.7071C3.89464 12.5196 4 12.2652 4 12C4 11.7348 3.89464 11.4804 3.70711 11.2929C3.51957 11.1054 3.26522 11 3 11Z"
                    fill="#898b8c"
                  />
                </svg>
                <svg
                  v-if="copied"
                  width="18"
                  height="13"
                  viewBox="0 0 18 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.71681 10.2576L1.44839 6.21657L0 7.58776L5.71681 13L18 1.37123L16.5516 0L5.71681 10.2576Z"
                    fill="var(--col-accent)"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div v-else-if="props.column.field === 'amount'">
            <div style="font-weight: 500;">
              {{ props.row.amount.toLocaleString(undefined, $LOCALESTRING_CRYPTO) }} {{
                props.row.symbol.toUpperCase()
              }}
            </div>
            <div class="color-gray-light small">
              ≈ {{ props.row.amountUsd.toLocaleString(undefined, $LOCALESTRING_USD()) }}
            </div>
            <div class="color-gray small">
              ≈ {{ $toUsd(props.row.symbol, props.row.amount).toLocaleString(undefined, $LOCALESTRING_USD()) }}
              {{ $t("AT_CURRENT_RATE").toLowerCase() }}
            </div>
          </div>
          <div v-else>
            {{ props.formattedRow[props.column.field] }}
          </div>
        </template>
        <div slot="emptystate" class="text-center">
          {{ $t("NO_DATA") }}
        </div>
      </vue-good-table>
    </div>
    <div v-else class="text-center" style="padding: 30px;">
      {{ $t("NO_DATA") }}
    </div>
  </div>
</template>

<script>
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";

export default {
  name: "PageOperations",
  components: { VueGoodTable },
  data () {
    return {
      transactions: [],
      limit: 1000,
      offset: 0,
      page: 1,
      copied: false,
      type: {
        label: "OPERATION_ALL",
        value: "all"
      },
      loading: true,
      columns: [
        {
          label: this.$t("DATE"),
          field: "date",
          width: "25%",
          thClass: "min-width-150",
          sortable: true
        },
        {
          label: this.$t("TYPE"),
          field: "type",
          width: "45%",
          thClass: "min-width-180",
          sortable: false
        },
        {
          label: this.$t("AMOUNT"),
          field: "amount",
          width: "30%",
          thClass: "min-width-180",
          sortable: false
        }
      ]
    };
  },

  computed: {
    types () {
      return [
        "all",
        "payment",
        "withdraw",
        "token_swap",
        "token_ref_bonus"
      ].map((e) => {
        return {
          label: `OPERATION_${e.toUpperCase()}`,
          value: e
        };
      });
    }
  },

  mounted () {
    this.getTransactions();
  },

  methods: {
    /** Загрузить транзакции по select'у */
    select () {
      this.getTransactions();
    },

    /** Получить транзакции */
    getTransactions () {
      this.loading = true;
      const params = {
        offset: this.offset,
        limit: this.limit,
        type: this.type.value
      };
      this.$API.OperationList(params, (response) => {
        this.loading = false;
        this.transactions = response.operations;
      });
    },

    /** Скопировать хэш */
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

      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.cabinet-history {
  &__top {
    margin-bottom: 40px;

    @include respond-before("md") {
      display: flex;
      align-items: center;
    }

    &-left {
      @include respond-before("md") {
        width: 100%;
        max-width: 300px;
      }
    }

    &-right {
      @include respond-before("md") {
        flex: 1;
      }
    }
  }
  a:hover {
    color: white;
  }
}
</style>
