<template>
  <VueWindow
    :initialPosition="{ left: 50, top: 50 }"
    :initialSize="{ width: 500, height: 500 }"
    ><template #header>Header</template><template #content>Content</template
    ><template #footer>Footer</template></VueWindow
  >
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
