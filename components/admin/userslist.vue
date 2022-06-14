<template>
  <div class="userslist">
    <h2 class="title m-b-30">
      Registered Users
    </h2>
    <ul v-if="errors.length" class="list list--none m-b-20">
      <li v-for="(error, idx) in errors" :key="idx" class="error-text" v-html="error" />
    </ul>
    <ui-preloader v-if="loading" center="true" />
    <div v-else-if="users.length">
      <div class="text-right small m-b-10">
        Total {{ length }} users
      </div>
      <vue-good-table
        v-if="users"
        :columns="columns"
        :rows="users"
        :line-numbers="true"
        :total-rows="length"
        compact-mode
        :pagination-options="{
          enabled: true,
          mode: 'records',
          // perPage: 10,
          position: 'top',
          perPageDropdown: [30, 50, 100],
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
            {{ $DateText(props.row.date, false) }}, {{ $TimeText(props.row.date) }}
          </div>
          <div v-else-if="props.column.field === 'username'">
            <span class="m-b-5" style="display: inline-block;">
              {{ props.row.username }}
            </span>

            <div class="small">
              {{ hideEmail(props.row.email) }}

              <span
                :class="[{'disc-success': props.row.emailVerified, 'disc-danger': !props.row.emailVerified, }]"
                :title="props.row.emailVerified ? 'Email confirmed' : 'Email not confirmed'"
              >
                <i />
              </span>
            </div>
          </div>
          <div v-else-if="props.column.field === 'invited' && props.row.father">
            <div>
              {{ props.row.father.username }}
            </div>
            <div class="small">
              {{ hideEmail(props.row.father.email) }}

              <span
                :class="[{'disc-success': props.row.emailVerified, 'disc-danger': !props.row.emailVerified, }]"
                :title="props.row.emailVerified ? 'Email confirmed' : 'Email not confirmed'"
              >
                <i />
              </span>
            </div>
          </div>
          <div v-else-if="props.column.field === 'sum'">
            <template v-if="getAggregateSum(props.row._id)">
              {{ (getAggregateSum(props.row._id)).toLocaleString("en-US", $LOCALESTRING_USD()) }}
            </template>

            <pre v-if="false" v-html="props.row" />
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
  name: "UsersList",
  components: { VueGoodTable },
  data () {
    return {
      users: [],
      errors: [],
      loading: true,
      loadingRef: false,
      loadingSums: false,
      referralUsername: {
        userId: "",
        refUsername: ""
      },
      aggregateSums: {
        userId: "",
        value: 0
      },
      limit: 500,
      offset: 0,
      length: 0,
      page: 1,
      columns: [
        {
          label: "Date",
          field: "date",
          width: "20%",
          sortable: false
        },
        {
          label: "Username",
          field: "username",
          width: "25%",
          sortable: false
        },
        {
          label: "Amount of investment",
          field: "sum",
          // width: "50%",
          // thClass: "min-width-180",
          sortable: false
        },
        {
          label: "Invited",
          field: "invited",
          // width: "25%",
          sortable: false
        }
      ]
    };
  },
  mounted () {
    this.$API.getUserList({
      offset: this.offset,
      limit: this.limit
    }, (r) => {
      this.users = r.users;
      this.aggregateSums = r.aggregateSums;
      this.length = r.length; // Всего пользователей
      this.loading = false;
    }, (e) => {
      this.loading = false;
      this.errors = Array.isArray(e?.message) ? this.$t(e?.message.toUpperCase()) : [this.$t(e.message.toUpperCase())];
    });
  },
  methods: {
    /** Скрываем часть email */
    hideEmail (email) {
      email = email.split("@");
      const left = email[0].slice(0, 2);
      const right = email[1];
      return `${left}***@${right}`;
    },

    /** Проверяем верифицирована ли почта юзера */
    checkEmailVerify (userObj) {
      return userObj?.emailVerified ?? false;
    },

    /** Получаем имя пригласившего пользователя */
    loadUserRefName (ref) {
      this.loadingRef = true;
      this.referralUsername.userId = ref;
      this.referralUsername.refUsername = "";
      this.$API.GetUsername({ ref }, (r) => {
        this.loadingRef = false;
        this.referralUsername.refUsername = r;
      }, (error) => {
        this.loadingRef = false;
        this.referralUsername.userId = "";
        this.referralUsername.refUsername = "";
        this.errors = Array.isArray(error?.message)
          ? error.message.map(msg => this.$t(msg.replace(/ /g, "_").toUpperCase()))
          : [this.$t(error.message.replace(/ /g, "_").toUpperCase())];
      });
    },

    getAggregateSum (userId) {
      return this.aggregateSums.find(e => e._id.userId === userId)?.amountUsd ?? 0;
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

  .disc-success,
  .disc-danger {
    display: inline-block;
    padding: 0 5px;

    i {
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }
  }

  .disc-success i {
    background-color: var(--color-success);
  }

  .disc-danger i {
    background-color: var(--color-error);
  }
}
</style>
