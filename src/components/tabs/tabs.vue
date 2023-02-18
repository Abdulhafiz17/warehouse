<template>
  <div class="BUTTONS">
    <button
      v-for="(item, index) in tab_buttons"
      :key="item"
      :class="item == active_tab ? active_class : ''"
      @click="setTab(index)"
      :name="tab_slots[index]"
    >
      <span>{{ item }}</span>
    </button>
  </div>
  <transition name="tab" mode="out-in">
    <div class="CONTENT" v-if="active_slot">
      <slot :name="active_slot" />
    </div>
  </transition>
</template>

<script>
export default {
  name: "tabs",
  props: ["buttons", "slots"],
  data() {
    return {
      active_tab: this.$props.buttons[0],
      active_slot: this.$props.slots[0],
      active_class: "active",
    };
  },
  computed: {
    tab_buttons() {
      return this.$props.buttons;
    },
    tab_slots() {
      return this.$props.slots;
    },
  },
  methods: {
    setTab(index) {
      let timeout = null;
      clearTimeout(timeout);

      this.active_tab = null;
      this.active_slot = null;

      timeout = setTimeout(() => {
        this.active_tab = this.tab_buttons[index];
        this.active_slot = this.tab_slots[index];
      }, 100);
    },
  },
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
  --color: rgb(245, 245, 245);
  --background: rgb(40, 40, 40);
}

.BUTTONS {
  display: flex;
  margin: 0 0 5px 0;
  padding: 5px;
  border: 1px solid var(--green);
  border-radius: 10px;
  background: white;
  box-shadow: 0 5px 10px -5px var(--green);
}

.BUTTONS > button:first-child {
  border-radius: 10px 0 0 10px;
}

.BUTTONS > button:last-child {
  border-radius: 0 10px 10px 0;
}

button {
  position: relative;
  flex: 1 1 0;
  padding: 3px 5px;
  border: none;
  color: black;
  background: initial;
  box-shadow: inset 0 0 5px -1px var(--green), 0 1px 5px -2px var(--green);
  transition: all 0.15s;
}

button.active {
  box-shadow: inset 0 0 1px 2px var(--green), 0 1px 5px -2px var(--green);
}

.CONTENT {
  padding: 10px;
  border: 1px solid var(--green);
  border-radius: 10px;
  background: white;
  box-shadow: 0 5px 10px -5px var(--green);
}

.tab-enter-active {
  transform-origin: top;
  animation: changeTab 0.2s ease;
}
.tab-leave-active {
  animation: changeTab 0.2s ease reverse;
}

@keyframes changeTab {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
  }
}
</style>
