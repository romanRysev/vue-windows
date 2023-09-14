<template>
  <div ref="windowContainer" class="vue-window" @mousemove="_onMouseMove">
    <div
      ref="windowElem"
      class="vue-window__content"
      @mouseup="_onMouseUp"
      @mousedown="_onMouseDown"
    >
      window
    </div>
  </div>
</template>
<script setup lang="ts">
import { Ref, ref } from "vue";

const windowElem: Ref<HTMLElement | null> = ref(null);

const windowContainer: Ref<HTMLElement | null> = ref(null);

const isDrag = ref(false);

const shiftX = ref(0);

const shiftY = ref(0);

const _setPosition = (event: MouseEvent) => {
  if (!windowElem.value) return;

  windowElem.value.style.left = event.pageX - shiftX.value + "px";
  windowElem.value.style.top = event.pageY - shiftY.value + "px";
};

const _onMouseMove = (event: MouseEvent) => {
  if (!isDrag.value) return;

  _setPosition(event);
};

const _onMouseDown = (event: MouseEvent) => {
  if (!windowElem.value) return;

  shiftX.value = event.clientX - windowElem.value.getBoundingClientRect().left;
  shiftY.value = event.clientY - windowElem.value.getBoundingClientRect().top;
  isDrag.value = true;
};

const _onMouseUp = () => {
  isDrag.value = false;
};
</script>
<style>
.vue-window {
  width: 100%;
  height: 100vw;
}

.vue-window__content {
  background-color: aqua;
  position: absolute;
  width: 500px;
  height: 500px;
}
</style>
