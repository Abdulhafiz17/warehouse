<template>
  <button v-wave="{ color: buttonColor }">
    <slot />
  </button>
</template>

<script>
export default {
  name: "btn",
  props: {
    color: { type: String, default: "blue" },
    textColor: { default: false },
    block: { default: false },
  },
  data() {
    return {
      mode: localStorage["mode"],
      colors: {
        blue: "rgb(13, 110, 253)",
        indigo: "rgb(102, 16, 242)",
        purple: "rgb(111, 66, 193)",
        pink: "rgb(214, 51, 132)",
        red: "rgb(220, 53, 69)",
        orange: "rgb(253, 126, 20)",
        yellow: "rgb(255, 193, 7)",
        green: "rgb(25, 135, 84)",
        teal: "rgb(32, 201, 151)",
        cyan: "rgb(13, 202, 240)",
        black: "rgb(10, 10, 10)",
        white: "rgb(245, 245, 245)",
      },
    };
  },
  computed: {
    buttonColor() {
      return this.colors[this.$props.color];
    },
    is_block() {
      return this.$props.block ? "100%" : "auto";
    },
  },
};
</script>

<style scoped>
button {
  width: v-bind(is_block);
  padding: 5px 10px;
  border: 1px solid v-bind(buttonColor);
  border-radius: 10px;
  background: white;
  box-shadow: inset 0 0 5px -1px v-bind(buttonColor),
    0 5px 10px -5px v-bind(buttonColor);
  transition: all 0.2s;
}

.dark button {
  color: whitesmoke;
  background-color: rgb(50, 50, 50);
}

.input-group-append > button {
  border-radius: 0 10px 10px 0;
}

.dropdown > button {
  border-radius: 0;
}

.btn-group > button {
  border-radius: 0;
}

.btn-group > button:first-child {
  border-radius: 10px 0 0 10px;
}

.btn-group > button:last-child {
  border-radius: 0 10px 10px 0;
}

button:disabled {
  cursor: not-allowed;
}
</style>
