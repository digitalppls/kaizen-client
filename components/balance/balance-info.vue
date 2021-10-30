<template>
  <div class="balance-info">
    <div class="balance-info__top">
      <p class="font-bold">
        {{ $t("BALANCE_INFORMATION") }}
      </p>
      <div class="m-l-a">
        <nuxt-link :to="localePath('my-deposit')" class="btn btn-solid btn-small">
          {{ $t("DEPOSIT") }}
        </nuxt-link>
        <nuxt-link :to="localePath('my-buycrypto')" class="btn btn-solid btn-solid--tertiary btn-small">
          {{ $t("BUY") }}
        </nuxt-link>
      </div>
    </div>
    <user-wallets />
  </div>
</template>

<script>
import UserWallets from "~/components/balance/user-wallets";

export default {
  name: "BalanceInfo",
  components: { UserWallets }
};
</script>

<style lang="scss" scoped>
.balance-info {
  background-color: #f9f9fa;
  border-radius: 12px;
  padding: 15px;
  overflow: hidden;

  @include respond-before("md") {
    padding: 30px;
  }

  &__top {
    margin-bottom: 30px;

    @include respond-before("md") {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }

    .btn {
      padding: 10px 20px;
      margin-top: 15px;

      @include respond-before("md") {
        margin-top: 0;
      }
    }
  }
}
</style>
