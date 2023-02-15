<template>
  <div class="CARD">
    <div class="BODY">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
  props: {
    color: { type: String, default: "blue" },
    textAlign: { type: String, default: "center" },
  },
  data() {
    return {
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
      },
    };
  },
  computed: {
    cardColor() {
      return this.colors[this.$props.color];
    },
    text_align() {
      return this.$props.textAlign;
    },
  },
};
</script>

<style scoped>
.CARD {
  display: block;
  border-radius: 10px;
  background: white;
  box-shadow: inset 0 0 2px 1px v-bind(cardColor),
    0 5px 10px -5px v-bind(cardColor);
  text-align: v-bind(text_align);
  transition: all 0.2s;
}

.CARD > .BODY {
  padding: 12px;
}

.dark .CARD {
  color: whitesmoke;
  background-color: rgb(50, 50, 50);
}
</style>
