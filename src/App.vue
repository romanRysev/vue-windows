<template>
  <div>test</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import VueWindow from "./components/VueWindow.vue";

export default defineComponent({
  name: "App",
  created() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    console.log(this.$windowManager);
  },
  mounted() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    this.$windowManager.windows.testWindow.show();
  },
});
</script>

<style></style>
