<template>
  <div ref="windowContainer" class="vue-window" @mousemove="_onMouseMove">
    <div ref="windowBody" class="vue-window__body">
      <div
        class="vue-window__header"
        @mouseup="_onMouseUp"
        @mousedown="_onMouseDown"
      >
        <slot name="header"> </slot><button @click="onClose">X</button>
      </div>
      <div class="vue-window__content">
        <component :is="props.component"></component>
      </div>
      <div class="vue-window__footer"><slot name="footer"> </slot></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  Ref,
  ref,
  defineProps,
  onMounted,
  getCurrentInstance,
  DefineComponent,
} from "vue";

type Props = {
  initialPosition: {
    left: number | string | undefined;
    top: number | string | undefined;
  };
  initialSize: {
    width: number | string | undefined;
    height: number | string | undefined;
  };
  component: DefineComponent<object, object, unknown>;
};

const props = defineProps<Props>();

const windowBody: Ref<HTMLElement | null> = ref(null);

const windowContainer: Ref<HTMLElement | null> = ref(null);

const isDrag = ref(false);

const shiftX = ref(0);

const shiftY = ref(0);

const vm = getCurrentInstance();

const onClose = () => {
  if (!vm) return;

  vm.appContext.config.globalProperties.$windowManager.activeWindows = [];
};

const _setPosition = (event: MouseEvent) => {
  if (!windowBody.value) return;

  windowBody.value.style.left = event.pageX - shiftX.value + "px";
  windowBody.value.style.top = event.pageY - shiftY.value + "px";
};

const _onMouseMove = (event: MouseEvent) => {
  if (!isDrag.value) return;

  _setPosition(event);
};

const _onMouseDown = (event: MouseEvent) => {
  if (!windowBody.value) return;

  shiftX.value = event.clientX - windowBody.value.getBoundingClientRect().left;
  shiftY.value = event.clientY - windowBody.value.getBoundingClientRect().top;
  isDrag.value = true;
};

const _onMouseUp = () => {
  isDrag.value = false;
};

onMounted(() => {
  if (!windowBody.value) return;
  windowBody.value.style.left = props.initialPosition?.left + "px";
  windowBody.value.style.top = props.initialPosition?.top + "px";
  windowBody.value.style.width = props.initialSize?.width + "px";
  windowBody.value.style.height = props.initialSize?.height + "px";
});
</script>
<style>
.vue-window {
  width: 100%;
  height: 100vw;
}

.vue-window__body {
  position: absolute;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.vue-window__header {
  background-color: aqua;
  height: 50px;
}

.vue-window__content {
  background-color: cadetblue;
  height: inherit;
}

.vue-window__footer {
  height: 50px;
  background-color: antiquewhite;
}
</style>
