<template>
  <ul class="mx-auto flex w-fit flex-col gap-3 p-2">
    <li v-for="(item, index) in contactsItems" :key="item.id">
      <ul
        class="bg-item-color flex w-fit min-w-[360px] items-center justify-between rounded border-[1px] border-black p-2"
        :class="{
          'border-1 border-red-600': item.favorite,
        }"
      >
        <li class="font-medium">{{ index + 1 }}.</li>
        <li>{{ item.name }}</li>
        <li>
          <a :href="'tel:' + item.phone" class="hover:underline">{{ item.phone }}</a>
        </li>
        <li>
          <a :href="'mailto:' + item.email" class="hover:underline">{{ item.email }}</a>
        </li>
        <li>
          <DropDownMenu
            :item="item"
            @openDropdown="getIndexOpenDropDownItem"
            @deleteItem="$emit('deleteContact', item.id)"
            @addToFavorite="$emit('addToFavorite', $event)"
            :isDropDownOpen="item.id === indexOpenDropDownItem"
          />
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Contacts } from '@/types/contacts';
import DropDownMenu from '../DropDownMenu/DropDownMenu.vue';
import { ref } from 'vue';
defineProps<{
  contactsItems: Contacts[];
}>();

defineEmits<{
  (event: 'deleteContact', id: string): void;
  (event: 'addToFavorite', id: string): void;
}>();

const indexOpenDropDownItem = ref<string | null>(null);

const getIndexOpenDropDownItem = (id: string | undefined) => {
  console.log('id: ', id);
  if (id && id !== indexOpenDropDownItem.value) {
    indexOpenDropDownItem.value = id;
    return;
  }
  indexOpenDropDownItem.value = null;
};
</script>
