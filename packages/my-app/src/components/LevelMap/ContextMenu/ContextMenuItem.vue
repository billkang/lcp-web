<template>
  <div>
    <div class="g-contextmenu-item" :class="itemClass" @click="handleClick">
      <slot />
    </div>
    <div v-if="divider" class="g-contextmenu-divider"></div>
  </div>
</template>
<script setup lang="ts">
import { reactive, computed, defineProps, defineEmits, onMounted } from 'vue';
import busEmitter from './bus';

const props = defineProps({
  disabled: Boolean,
  divider: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['itemClickHandle']);

const val = reactive({ value: {} });

const handleClick = () => {
  emits('itemClickHandle', val.value);
  busEmitter.emit('menuItemClick');
};

onMounted(() => {
  busEmitter.on('bindValue', e => {
    val.value = e;
  });
});

const itemClass = reactive({
  'g-contextmenu-item--disabled': computed(() => props.disabled),
});
</script>

<style lang="scss" scoped>
.g-contextmenu-item {
  cursor: pointer;
  background-color: #fff;
  padding: 8px 15px;
  font-size: 14px;
  white-space: nowrap;
  &:hover {
    background-color: #eaeef1;
  }
  &--disabled {
    color: #c0c4cc;
    cursor: not-allowed;
    pointer-events: none;
  }
}
.g-contextmenu-divider {
  border-bottom: 1px solid #ebebeb;
  box-sizing: border-box;
  height: 1px;
}
</style>
