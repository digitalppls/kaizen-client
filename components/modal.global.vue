<template>
  <transition name="modal">
    <div class="modal-bg">
      <div class="modal-wrapper">
        <div class="modal-inner">
          <div class="modal-stage">
            <div class="modal-slide">
              <div class="modal-container">
                <!-- Достижение уровня popup :: start -->
                <template v-if="empty">
                  <slot />
                </template>
                <!-- Достижение уровня popup :: end -->
                <!-- Стандартный popup :: start -->
                <div
                  v-else
                  class="modal-content"
                  :style="{maxWidth}"
                  role="dialog"
                >
                  <button
                    v-if="closeBtn"
                    class="modal-close"
                    @click="closeModal"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z" />
                    </svg>
                  </button>

                  <div
                    v-if="hasHeaderSlot"
                    class="modal-header"
                  >
                    <slot name="header" />
                  </div>

                  <div class="modal-body">
                    <slot />
                  </div>

                  <div
                    v-if="hasFooterSlot"
                    class="modal-footer"
                  >
                    <slot name="footer" />
                  </div>
                </div>
                <!-- Стандартный popup :: end -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  props: {
    // Show close button
    closeBtn: {
      type: Boolean,
      default: true
    },
    maxWidth: {
      type: String,
      default: "580px"
    },
    empty: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    hasHeaderSlot () {
      return !!this.$slots.header;
    },
    hasBodySlot () {
      return !!this.$slots.body;
    },
    hasFooterSlot () {
      return !!this.$slots.footer;
    },
    hasFooterButtonSlot () {
      return !!this.$slots["footer-button"];
    },
    hasFooterBeforeButtonSlot () {
      return !!this.$slots["footer-before-button"];
    },
    hasFooterAfterButtonSlot () {
      return !!this.$slots["footer-after-button"];
    }
  },
  mounted () {
    document.querySelector("body").classList.add("modal-open");
    window.addEventListener("keydown", this.escCloseModal);
  },
  beforeDestroy () {
    document.querySelector("body").classList.remove("modal-open");
    window.removeEventListener("keydown", this.escCloseModal);
  },
  methods: {
    escCloseModal (e) {
      if (this.closeBtn && e.key === "Escape") {
        this.closeModal();
      }
    },
    closeModal () {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-bg {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  position: fixed;
  outline: none !important;
  -webkit-backface-visibility: hidden;
  background-color: rgba(#0A0A0A, 0.7);
  transition: opacity 0.3s ease;
}

.modal-iframe {

  .modal-content {
    background-color: #1e1e1e;
    padding: 20px;
  }
}

.modal-wrapper {
  -webkit-backface-visibility: hidden;
  height: 100%;
  left: 0;
  outline: 0;
  position: fixed;
  -webkit-tap-highlight-color: transparent;
  top: 0;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  width: 100%;
  z-index: 99992;
}

.modal-inner,
.modal-stage {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}

.modal-stage {
  direction: ltr;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  z-index: 99994;
  overflow: hidden;
}

.modal-slide {
  -webkit-backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  left: 0;
  outline: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding: 80px 15px 0;
  position: absolute;
  text-align: center;
  top: 0;
  -webkit-transition-property: opacity, -webkit-transform;
  transition-property: opacity, -webkit-transform;
  -o-transition-property: transform, opacity;
  transition-property: transform, opacity;
  transition-property: transform, opacity, -webkit-transform;
  white-space: normal;
  width: 100%;
  z-index: 99994;
}

.modal-container {
  display: inline-block;
  margin: 0;
  max-width: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0;
  position: relative;
  text-align: left;
  vertical-align: middle;
}

.modal-close {
  background: none;
  border: 0;
  display: inline-block;
  height: 50px;
  width: 50px;
  padding: 10px;
  right: 0;
  top: 0;
  margin: 0;
  transition: color .2s;
  vertical-align: top;
  visibility: inherit;
  border-radius: 0;
  color: currentColor;
  cursor: pointer;
  opacity: .8;
  position: absolute;
  z-index: 401;

  @include respond-before("md") {
    right: 10px;
    top: 10px;
  }

  svg {
    display: block;
    height: 100%;
    overflow: visible;
    position: relative;
    width: 100%;

    path {
      fill: currentColor;
    }
  }
}

.modal-content {
  width: 100%;
  position: relative;
  margin: auto;
  padding: var(--modal-padding);
  background-color: var(--color-dark);
  box-shadow: 0 4px 64px rgba(0, 0, 0, 0.42);
  border-radius: 15px;
  transition: all 0.3s ease;

  @include respond-to("md") {
    padding-top: 40px;
  }
  @include respond-before("md") {
    border-radius: var(--border-radius);
  }
}

.modal-header {
  @include modal-header;
}

.modal-body {
  padding: 0;
  font-size: 16px;
}

.modal-footer {
  margin-top: 30px;

  &__action {
    text-align: center;
  }

  &__top {
    margin-bottom: 20px;
  }

  &__bottom {
    margin-top: 20px;
  }
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-wrapper,
.modal-leave-active .modal-wrapper {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
