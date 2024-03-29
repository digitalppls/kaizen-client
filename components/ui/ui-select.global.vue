<template>
  <div
    ref="ui-select"
    :class="[
      'ui-select',
      { 'ui-select--disabled' : disabled },
      { 'ui-select--open' : open },
      { 'ui-select--single' : options.length === 1 },
      { 'ui-select--inside' : isInsideElement }
    ]"
    v-click-outside="close"
    @click="options.length === 1 ? null : open = !open"
    @close-select="open = false"
  >
    <div class="ui-select__container">
      <div class="ui-select__selected">
        <slot :option="value">
          {{ value }}
        </slot>
      </div>
      <div
        v-if="open"
        class="ui-select__list"
      >
        <div
          v-for="(option, idx) in options"
          :key="idx"
          class="ui-select__item"
          @click="select(option)"
        >
          <slot :option="option">
            {{ option }}
          </slot>
        </div>
      </div>
    </div>
    <!-- suffix -->
    <div
      v-if="suffix"
      class="ui-select__suffix"
      v-text="suffix"
    />
  </div>
</template>
<i18n>
{
  "en-US": {
    "SElECT": "Select..."
  },
  "ru-RU": {
    "SElECT": "Выберите..."
  }
}
</i18n>
<script>
import vClickOutside from "v-click-outside";

export default {
  name: "UiSelect",
  props: {
    suffix: {
      type: String,
      default: ""
    },
    value: {
      type: [String, Object, Boolean],
      default: ""
    },
    options: {
      type: Array,
      required: true,
      default () {
        return [];
      }
    },
    name: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      open: false,
      isInsideElement: false
    };
  },
  mounted () {
    // Если select находится внутри компонента ui-text-field в слоте #append
    if (this.$refs["ui-select"] && this.$refs["ui-select"].closest(".ui-input-text__append")) {
      this.isInsideElement = true;
    }
  },
  methods: {
    select (option) {
      this.$emit("input", option);
    },
    close () {
      this.open = false;
    }
  },
  directives: {
    clickOutside: vClickOutside.directive
  }
};
</script>

<style
  lang="scss"
  scoped
>
.ui-select {
  $self: &;
  $input-padding-x: 10px;
  $input-padding-y: 10px;

  &:focus,
  &:hover {
    border-color: #fff;
  }

  &__suffix {
    font-size: 14px;
    color: var(--color-gray-light);
  }

  &__container {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    width: 100%;
    border: 1px solid #55585f;
    outline: none;
    background: #242527;
    transition: border-color 300ms ease;

    #{$self}--open & {
      //border-color: #fff;
    }
  }

  &__selected {
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    overflow: hidden;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0)'%3E%3Cpath d='M12 3.70745L10.585 2.29248L6 6.87747L1.41502 2.29248L8.91824e-07 3.70745L6 9.70745L12 3.70745Z' fill='%23D3D3D3'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0'%3E%3Crect width='12' height='12' fill='white' transform='translate(12) rotate(90)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
    background-position: right $input-padding-x top 50%;
    background-repeat: no-repeat;
    padding: $input-padding-y $input-padding-x;
    padding-right: 40px;
    user-select: none;

    #{$self}--single & {
      background-image: none;
    }

    img,
    svg {
      display: inline-block;
      vertical-align: middle;
      width: 32px;
      height: 32px;
      margin-right: 10px;
    }
  }

  &__list {
    position: absolute;
    top: 100%;
    left: -1px;
    right: -1px;
    background: #242527; // var(--color-dark);
    z-index: 3;
    border: 1px solid #55585f;
    max-height: 300px;
    overflow-x: auto;
    padding-top: 10px;

    @include respond-before("md") {
      max-height: 400px;
    }
  }

  &__item {
    display: block;
    cursor: pointer;
    user-select: none;
    padding: 10px $input-padding-x-mob;

    @include respond-before("md") {
      padding: 10px $input-padding-x;
    }

    img,
    svg {
      display: inline-block;
      vertical-align: middle;
      width: 32px;
      height: 32px;
      margin-right: 10px;
    }

    &:hover {
      background: #353638; // var(--body-bg);
    }
  }

  &--inside {
    //margin-left: -15px;
    margin-right: calc(#{$input-padding-x} * -1);

    #{$self}__container {
      border: 0;
    }
  }

  &--disabled {
    pointer-events: none;
    color: var(--color-gray);
  }
}
</style>
