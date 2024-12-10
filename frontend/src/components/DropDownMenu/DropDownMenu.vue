<template>
  <div class="relative">
    <button
      type="button"
      class="h-[18px] w-[18px] p-1"
      @click="$emit('openDropdown', item.id)"
      aria-label="button open drop down menu"
    >
      <ArrowIcon class="h-full w-full transition-all" :class="isDropDownOpen && 'rotate-180'" />
    </button>
    <div
    ref="dropDownRef"
      v-if="isDropDownOpen"
      class="absolute left-0 top-full z-10 flex w-max flex-col items-start gap-1 rounded-md border-[1px] border-black bg-white p-2"
    >
      <button
        type="button"
        @click="$emit('deleteItem', item.id)"
        class="w-full rounded bg-slate-300 p-1"
      >
        Delete
      </button>
      <button
        type="button"
        class="w-full rounded bg-slate-300 p-1"
      >
        Change contact
      </button>
      <button
        type="button"
        @click="$emit('addToFavorite', item.id)"
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
import { onBeforeMount, onUnmounted, ref } from 'vue';
const { isDropDownOpen } = defineProps<{
  isDropDownOpen: boolean;
  item: Contacts;
}>();
const emit = defineEmits(['openDropdown', 'deleteItem', 'addToFavorite']);

const dropDownRef = ref(null);

const clickOutsideEvent = (event: any) => {
  if(!dropDownRef.value) return;
  if (!(dropDownRef.value === event.target || dropDownRef.value.contains(event.target))) {
    console.log('close drop down');
    emit('openDropdown');
  }
};
onBeforeMount(() => {
  document.addEventListener('click', clickOutsideEvent );
});

onUnmounted(() => document.removeEventListener('click', clickOutsideEvent))
</script>
