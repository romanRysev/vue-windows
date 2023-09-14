<template>
  <VueWindow />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VueWindow from "./components/VueWindow.vue";

export default defineComponent({
  name: "App",
  components: {
    VueWindow,
  },
});
</script>

<style></style>
