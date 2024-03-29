<template>
  <div class="referral-network">
    <liquor-tree
      ref="tree"
      :data="treeData"
      :options="treeOptions"
    >
      <span
        slot-scope="{ node }"
        class="node-item"
      >
        <span class="node-item__container">
          <span v-if="node.data.user" class="node-item__name">
            {{ node.data.user.username }}
          </span>
          <small v-if="node.data.user && adminMode" class="node-item__email">
            {{ node.data.user.id }}
          </small>
        </span>
      </span>
    </liquor-tree>
  </div>
</template>

<script>
import LiquorTree from "liquor-tree";

export default {
  name: "ReferralNetwork",
  components: { LiquorTree },
  props: {
    user: {
      type: Object,
      required: true
    },
    adminMode: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const adminMode = this.adminMode;
    return {
      line: 1,
      treeData: this.getData(),
      treeOptions: {
        checkbox: false,
        minFetchDelay: 1000,
        fetchData (node) {
          const vm = node.vm;
          const data = { _id: node.id, line: 1 };
          return new Promise((resolve) => {
            if (adminMode) {
              vm.$API.RefListAll(data, (r) => {
                const array = r.users.map(user => ({
                  data: {
                    user,
                    name: user.username,
                    products: user.products
                  },
                  id: user._id,
                  isBatch: true
                }));
                resolve(array);
              }, (error) => (console.error("[ref-list-all]", error)));
            } else {
              vm.$API.RefList(data, (r) => {
                const array = r.users.map(user => ({
                  data: {
                    user,
                    name: user.username,
                    products: user.products
                  },
                  id: user._id,
                  isBatch: true
                }));
                resolve(array);
              }, (error) => (console.error("[ref-list]", error)));
            }
          });
        }
      }
    };
  },
  methods: {
    getData () {
      return [
        {
          data: {
            name: this.user?.username ?? "",
            user: this.user,
            products: []
          },
          id: this.user?._id ?? "",
          isBatch: true
        }
      ];
    }
  }
};
</script>

<style
  lang="scss"
  scoped
>
.referral-network {
  &__info {
    display: flex;
    flex-wrap: wrap;

    &-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 15px;
      margin-right: 30px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &-icon {
      margin-right: 10px;
    }

    &-txt {
      color: #fff;
    }
  }
}
</style>
<style lang="scss">
.tree-node.selected {
  > .tree-content {
    background-color: var(--body-bg) !important;
  }
}

.tree-node:not(.selected) {
  > .tree-content:hover {
    background: var(--body-bg) !important;
  }
}

.tree-arrow.has-child:after {
  border-color: rgba(#fff, .4) !important;
}

.tree-node.has-child.loading > .tree-content > .tree-arrow {
  --border-size: 1px;
  border-top: var(--border-size) solid rgba(#fff, .2) !important;
  border-right: var(--border-size) solid rgba(#fff, .2) !important;
  border-bottom: var(--border-size) solid rgba(#fff, .2) !important;
  border-left: var(--border-size) solid var(--col-accent) !important;
}

.tree-node {
  .tree-content {
    border-radius: 6px;
  }

  .tree-anchor {
    user-select: auto;
  }

  .node-item {
    color: #fff;

    &__container {
      display: flex;
      flex-direction: column;
      @include respond-before("pre-md") {
        flex-direction: row;
      }
    }

    &__name {
      @include respond-before("pre-md") {
        margin-right: 5px;
      }
    }

    &__email {
      font-size: 14px;
      color: var(--col-gray);
    }

    &__data {
      > span {
        font-size: 12px;
        margin-right: 5px;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
