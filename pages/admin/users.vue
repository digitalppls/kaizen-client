<template>
  <div>
    <h2 class="color-white">
      Пользователи <small class="color-gray">({{ totalRecords }})</small>
    </h2>

    <div class="userlist">
      <ul v-if="errors.length" class="list list--none m-b-20">
        <li v-for="(error, idx) in errors" :key="idx" class="error-text" v-html="error" />
      </ul>
      <ui-text-field
        v-model="searchTerm"
        type="text"
        class="m-b-10"
        label="Поиск по ID, имени или e-mail"
      />
      <vue-good-table
        v-if="rowsFiltered"
        mode="remote"
        :columns="columns"
        :rows="rowsFiltered"
        :total-rows="totalRecords"
        :line-numbers="true"
        :isLoading.sync="loading"
        :pagination-options="{
          enabled: true,
          perPageDropdown,
        }"
        :search-options="{
          enabled: true,
          externalQuery: searchTerm,
          skipDiacritics: true
        }"
        @on-row-click="onRowClick"
        @on-page-change="onPageChange"
        @on-per-page-change="onPerPageChange"
      >
        <template slot="table-row" slot-scope="props">
          <div v-if="props.column.field === 'date'">
            {{ $DateText(props.row.date, false) }}, {{ $TimeText(props.row.date) }}
          </div>
          <div v-else-if="props.column.field === 'email'" style="display: flex;">
            <!--{{ hideEmail(props.row.email) }}-->
            {{ props.row.email }}
            <span
              :class="props.row.emailVerified ? 'disc-success' : 'disc-danger'"
              :title="props.row.emailVerified ? 'Почта подтверждена' : 'Почта не подтверждена'"
            >
              <i />
            </span>
          </div>
          <div v-else-if="props.column.field === 'balance'">
            <div
              v-for="(wallet, key) in props.row.wallets"
              :key="key"
            >
              <span style="color:#f5cf48;">{{ wallet.symbol.toUpperCase() }}:</span>
               {{ wallet.amount.toLocaleString("en-US", $LOCALESTRING(0, 5)) }} <small>~ {{ wallet.amountUsd.toLocaleString("en-US", $LOCALESTRING_USD(0, 2)) }}</small>
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

    <ui-modal
      v-if="showModal"
      max-width="1000px"
      @close="closeModal"
    >
      <user-card :user-data="selectedUserData" />
    </ui-modal>
  </div>
</template>

<script>
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";
import UiPreloader from "../../components/ui/ui-preloader.global";
import UiModal from "../../components/ui/ui-modal.global";
import UserCard from "../../components/admin/UserCard";
import UiTextField from "../../components/ui/ui-text-field.global";
export default {
  name: "AdminUsers",
  components: { UiTextField, UserCard, UiModal, UiPreloader, VueGoodTable },
  data () {
    const perPage = 10;

    return {
      searchTerm: "",
      showModal: false,
      errors: [],
      loading: true,
      columns: [
        {
          label: "Регистрация",
          field: "date",
          width: "20%",
          sortable: false
        },
        {
          label: "Имя",
          field: "username",
          // width: "20%",
          sortable: false
        },
        {
          label: "E-mail",
          field: "email",
          // width: "29%",
          sortable: false
        },
        // {
        //   label: "Баланс кошелька",
        //   field: "balance1",
        //   sortable: false
        // }
      ],
      rows: [],
      totalRecords: 0,
      page: 1,
      offset: 0,
      perPageDropdown: [perPage],
      serverParams: {
        columnFilters: {},
        sort: [
          {
            field: '',
            type: ''
          }
        ],
        page: 1,
        perPage
      },
      selectedUserData: null
    };
  },
  computed: {
    rowsFiltered () {
      return this.searchTerm
        ? this.rows.filter((row) => {
          const email = row.email.toString().toLowerCase();
          const username = row.username.toString().toLowerCase();
          const id = row.id.toString().toLowerCase();
          return email.includes(this.searchTerm) || username.includes(this.searchTerm) || id.includes(this.searchTerm);
        })
        : this.rows;
    }
  },
  mounted () {
    this.loadItems();
  },
  methods: {
    /** Скрываем часть email */
    hideEmail (email) {
      email = email.split("@");
      const left = email[0].slice(0, 2);
      const right = email[1];
      return `${left}***@${right}`;
    },

    /** Обновление параметров таблицы */
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },

    /** Переключение страниц пагинации */
    onPageChange(params) {
      console.log("onPageChange", params);
      this.updateParams({page: params.currentPage});
      this.offset = (params.currentPage - 1) * params.currentPerPage;
      // console.log(`Offset ${this.offset}`);
      this.loadItems();
    },

    /** Изменение лимита отображаемых данных на странице */
    onPerPageChange(params) {
      console.log("onPerPageChange", params);
      let perPage = params.currentPerPage;
      if (params.currentPerPage === -1) {
        perPage = this.totalRecords;
        this.offset = 0;
      }

      this.updateParams({ perPage });
      this.loadItems();
    },

    /** Подгурзка данных таблицы */
    loadItems() {
      this.$API.adminUserList({
        offset: this.offset,
        limit: this.serverParams.perPage
      }, (r) => {
        this.rows = r.users;
        this.totalRecords = r.length; // Всего пользователей
        this.loading = false;
      }, (e) => {
        this.loading = false;
        this.errors = Array.isArray(e?.message) ? this.$t(e?.message.toUpperCase()) : [this.$t(e.message.toUpperCase())];
      });
    },

    /** Клик по строке таблицы
     *  Открывается модального окна с карточкой пользователя
     */
    onRowClick (params) {
      this.selectedUserData = params.row;
      this.showModal = true;
    },

    /** Закрыть модальное окно */
    closeModal () {
      this.showModal = false;
      this.selectedUserData = null;
    }
  }
};

// checkPermission () {
//   return !!this.$store.getters.user.permissions.find(e => "/api/user/list".includes(e));
// }
</script>

<style lang="scss" scoped>
.userslist {

  &::v-deep .vgt-table {
    tr:hover {
      background: linear-gradient(#f4f5f8, #f1f3f6);
    }
  }
}
</style>
