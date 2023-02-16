<template>
  <div class="DETAILS">
    <btn
      block="true"
      color="green"
      @click="
        collapse = !collapse;
        $emit('click');
      "
    >
      <slot name="header" />
      <span>
        <i :class="`fa fa-lg fa-${collapse ? `minus` : `plus`}`" />
      </span>
    </btn>
    <transition name="COLLAPSE">
      <div class="DETAILS-BODY" v-if="collapse">
        <slot name="body" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "collapse",
  emits: ["click"],
  data() {
    return {
      collapse: false,
    };
  },
  methods: {},
};
</script>

<style scoped>
:root {
  --blue: rgb(13, 110, 253);
  --indigo: rgb(102, 16, 242);
  --purple: rgb(111, 66, 193);
  --pink: rgb(214, 51, 132);
  --red: rgb(220, 53, 69);
  --orange: rgb(253, 126, 20);
  --yellow: rgb(255, 193, 7);
  --green: rgb(25, 135, 84);
  --teal: rgb(32, 201, 151);
  --cyan: rgb(13, 202, 240);
}

.COLLAPSE-enter-active,
.COLLAPSE-leave-active {
  transform-origin: top;
  transition: all 0.2s;
}

.COLLAPSE-enter-active {
  animation: toggleCollapse 0.2s ease;
}

.COLLAPSE-leave-active {
  animation: toggleCollapse 0.2s ease reverse;
}

@keyframes toggleCollapse {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.DETAILS {
  margin: 3px 0;
  padding: 0;
}

.DETAILS > button {
  display: flex;
  justify-content: space-between;
}

.DETAILS .DETAILS-BODY {
  margin-top: 5px;
  padding: 10px;
  border: 1px solid var(--green);
  border-radius: 10px;
  background: white;
  box-shadow: 0 5px 10px -5px var(--green);
}

.dark .DETAILS .DETAILS-BODY {
  color: white;
  background: var(--dark);
}
</style>
