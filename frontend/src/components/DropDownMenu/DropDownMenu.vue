<template>
  <div class="relative">
    <button
      type="button"
      class="h-[18px] w-[18px] p-1"
      @click="$emit('openDropdown', item._id)"
      aria-label="button open drop down menu"
      :data-name="BUTTON_DATANAME"
    >
      <ArrowIcon
        class="pointer-events-none h-full w-full transition-all"
        :class="item.isOpenDropDown && 'rotate-180'"
      />
    </button>
    <div
      v-if="item.isOpenDropDown"
      ref="drop-down"
      class="absolute left-0 top-full z-40 flex w-max flex-col items-start gap-1 rounded-md border-[1px] border-black bg-white p-2"
    >
      <button
        type="button"
        @click="$emit('deleteItem', item._id)"
        class="w-full rounded bg-slate-300 p-1"
      >
        Delete
      </button>
      <button type="button" class="w-full rounded bg-slate-300 p-1">Change contact</button>
      <button
        type="button"
        @click="$emit('addToFavorite', item._id)"
        class="w-full rounded bg-slate-300 p-1"
      >
        {{ item.favorite ? 'Delete from favorite' : ' Add to Favorite' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Contacts } from '@/types/contacts';
import ArrowIcon from '../../assets/svg/down-arrow-svgrepo-com.svg';
import { onMounted, onUnmounted, useTemplateRef } from 'vue';

const BUTTON_DATANAME = 'open-button';
interface OpenDropDown {
  isOpenDropDown: boolean;
}

defineProps<{
  item: Contacts & OpenDropDown;
}>();

const emit = defineEmits(['openDropdown', 'deleteItem', 'addToFavorite']);

const dropDownRef = useTemplateRef('drop-down');

const clickOutsideEvent = (event: Event) => {
  const element = event.target as HTMLElement;
  if (element.dataset.name === BUTTON_DATANAME || !dropDownRef.value) return;
  if (!(dropDownRef.value === event.target || dropDownRef.value.contains(element))) {
    emit('openDropdown');
  }
};

onMounted(() => {
  document.addEventListener('click', clickOutsideEvent);
});

onUnmounted(() => document.removeEventListener('click', clickOutsideEvent));
</script>
