<template>
  <div
    v-click-outside="closeUiSelect"
    :class="[
      'ui-input-text',
      { 'ui-input-text--floating': floating },
      { 'ui-input-text--is-focus': isFocus },
      { 'ui-input-text--focused': isFocused },
      { 'ui-input-text--append': hasAppend },
      { 'ui-input-text--prepend': hasPrepend },
      { 'ui-input-text--disabled': disabled }
    ]"
  >
    <div
      v-if="hasPrepend"
      class="ui-input-text__prepend"
    >
      <slot name="prepend" />
    </div>
    <div class="ui-input-text__input">
      <input
        v-bind="$attrs"
        :id="elemID"
        :value="value"
        :readonly="disabled"
        :placeholder="floating ? '' : label"
        @focus="onFocus"
        @blur="onBlur($event)"
        @input="$emit('input', $event.target.value)"
      >
    </div>
    <label
      v-if="floating"
      :for="elemID"
      v-html="label"
    />
    <div
      v-if="hasAppend"
      class="ui-input-text__append"
    >
      <slot name="append" />
    </div>
  </div>
</template>

<script>
import vClickOutside from "v-click-outside";

export default {
  name: "UiTextField",
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number, Boolean],
      default: ""
    },
    label: {
      type: String,
      default: null
    },
    floating: {
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
      isFocused: false,
      isFocus: false,
      temp: null
    };
  },
  computed: {
    focused: {
      get () {
        return this.isFocused;
      },
      set (value) {
        this.isFocused = value;
      }
    },
    hasPrepend () {
      return this.$slots.prepend;
    },
    hasAppend () {
      return this.$slots.append;
    },
    elemID () {
      return `${this.label}-${this.getRandomArbitrary(1, 10000)}`;
    }
  },
  watch: {
    value () {
      this.focused = !!this.value || this.value === 0;
    }
  },
  methods: {
    onFocus () {
      this.isFocus = (this.focused = true);
    },
    onBlur (event) {
      this.$emit("blur", event);
      this.focused = !!((this.value === null ? "" : this.value).toString()).length;
      this.isFocus = false;
    },
    closeUiSelect () {
      this.$emit("close-select");
    },
    getRandomArbitrary (min, max) {
      return Math.random() * (max - min) + min;
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
.ui-input-text {
  $self: &;
  color: inherit;
  display: flex;
  position: relative;
  align-items: stretch;
  width: 100%;
  border: 1px solid #55585f;
  outline: none;
  background: #242527;
  transition: border-color .5s ease;
  border-radius: 0;
  resize: none;
  box-shadow: none;
  appearance: none;
  padding: 0 15px;

  &__input {
    flex: 1;
    padding: 15px 0;

    input {
      padding: 0;
      max-width: 100%;
      min-width: 0;
      color: #fff;
      font-size: 16px;
      font-weight: 300;
      width: 100%;
      background-color: transparent;
      border-style: none;

      &[type="number"] {
        -moz-appearance: textfield;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }
    }
  }

  &__prepend {
    padding-right: 15px;
  }

  &__append {
    //flex: 0 0 auto;
    padding-left: 15px;
  }

  &--focused#{$self}--floating {
    #{$self}__input {
      padding: calc(10px + 3px) 0 calc(10px - 3px);

      @include respond-before('md') {
        padding: calc(var(--input-padding-y) + 3px) 0 calc(var(--input-padding-y) - 3px);
      }
    }
  }

  &--is-focus {
    //border-color: #555860;
  }

  &--prepend,
  &--append {
    align-items: center;
  }

  &--disabled {
    opacity: .5;
  }

  &.error,
  &--error,
  &--novalid {
    border-color: var(--error-bg);
  }

  &--floating {
    > label {
      position: absolute;
      top: 0;
      left: 0;
      color: #7c7c7c;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      height: 100%; // allow textareas
      padding: 10px 10px;
      pointer-events: none;
      border: 1px solid transparent;
      transform-origin: 0 0;
      transition: opacity var(--transition), transform var(--transition);
    }

    > input {
      &::placeholder {
        color: transparent;
      }

      //&:focus,
      //&:not(:placeholder-shown),
      //&[contentEditable=true]:empty:not(:focus) {
      //  padding-top: var(--floating-input-padding-t-mob);
      //  padding-bottom: var(--floating-input-padding-b-mob);
      //
      //  @include respond-before('md') {
      //    padding-top: var(--floating-input-padding-t);
      //    padding-bottom: var(--floating-input-padding-b);
      //  }
      //}

      // Duplicated because `:-webkit-autofill` invalidates other selectors when grouped
      &:-webkit-autofill {
        //padding-top: $form-floating-input-padding-t;
        //padding-bottom: $form-floating-input-padding-b;
      }
    }

    &#{$self}--focused {
      > label {
        color: #7c7c7c;
        font-size: .75em;
        transform: translateY(-$floating-input-padding-b-mob);

        @include respond-before('md') {
          transform: translateY(-$floating-input-padding-b);
        }
      }
    }
  }

  &::-webkit-date-and-time-value {
    // Multiply line-height by 1em if it has no unit
    height: 1.5em; // from mixin p();
  }

  // autocomplete fill
  &:-webkit-autofill {
    -webkit-box-shadow: inset 0 0 0 50px var(--body-bg) !important;
    -webkit-text-fill-color: #fff !important; /* цвет текста */
    color: #fff !important; /* цвет текста */
  }

  // Поле содержит ошибку
  &.error {
    border-color: var(--error-bg);

    ~ div.error {
      display: none !important;
    }
  }

  &--view-pass {
    padding-right: 60px;
  }
}
</style>
