<template>
  <main class="main">
    <div class="main-section">
      <div class="container">
        <h1 class="title">
          {{ $t("INDICATORS") }}
        </h1>

        <vue-good-table
          :columns="columns"
          :rows="rows"
          style-class="vgt-table vgt-table--dark"
        >
          <template slot="table-row" slot-scope="props">
            <template v-if="props.column.field == 'link'">
              <a :href="props.row.link" class="btn btn-small">
                {{ $t("DOWNLOAD") }}
              </a>
            </template>
            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
        </vue-good-table>
      </div>
    </div>
  </main>
</template>

<script>
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";

export default {
  name: "PageIndicators",
  components: { VueGoodTable },
  layout: "public",
  data () {
    return {
      columns: [
        {
          label: this.$t("DATE"),
          field: "date",
          type: "date",
          sortable: false,
          width: "10%",
          dateInputFormat: "yyyy-MM-dd",
          dateOutputFormat: "dd.MM.yyyy"
        },
        {
          label: this.$t("REPORT_NUMBER"),
          field: "number",
          width: "10%",
          sortable: false
        },
        {
          label: this.$t("DESCRIPTION"),
          field: "desc",
          sortable: false
        },
        {
          label: this.$t("MORE_DETAILS"),
          field: "link",
          width: "10%",
          sortable: false
        }
      ],
      rows: [
        {
          id: 1,
          date: "2021-09-21",
          number: 1,
          desc: "С 20.09 рынок показал параболлический рост, что обусловлено корелляцией первой криптовалюты с фондовым индексом S&P 500. Смотрите подробный отчёт",
          link: "#"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
details {
  margin: 0 auto 30px;
  background-color: #f8f8fb;
  //box-shadow: 0 4px 16px rgb(162 162 175 / 16%);
  border-radius: 12px;
  overflow: hidden;

  &[open] > summary:before {
    transform: rotate(90deg);
  }

  summary::-webkit-details-marker {
    display: none;
  }
}

summary {
  display: block;
  background-color: rgba(#A7A9B7, 0.07);
  padding: 1rem 1rem 1rem 2.2rem;
  position: relative;
  cursor: pointer;

  & + div {
    padding: 20px;
  }

  &:before {
    content: '';
    border-width: .4rem;
    border-style: solid;
    border-color: transparent transparent transparent var(--base-text);
    position: absolute;
    top: 1.3rem;
    left: 1rem;
    transform: rotate(0);
    transform-origin: .2rem 50%;
    transition: .25s transform ease;
  }
}
</style>
