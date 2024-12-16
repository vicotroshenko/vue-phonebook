<template>
  <ul class="mx-auto flex w-fit flex-col gap-3 rounded-md bg-white-t p-3 backdrop-blur">
    <li v-for="(item, index) in contactsItemsUpdated" :key="item._id">
      <ul
        class="flex w-fit min-w-[360px] flex-wrap items-center rounded border-[1px] border-black bg-white-t p-2"
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
            @openDropdown="openDropdown"
            @deleteItem="$emit('deleteContact', item._id)"
            @addToFavorite="$emit('addToFavorite', $event)"
          />
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Contacts } from '@/types/contacts';
import DropDownMenu from '../DropDownMenu/DropDownMenu.vue';
import { computed, ref } from 'vue';
const { contactsItems } = defineProps<{
  contactsItems: Contacts[];
}>();

defineEmits<{
  (event: 'deleteContact', id: string): void;
  (event: 'addToFavorite', id: string): void;
}>();

const openDropDownId = ref<string | null>(null);

const viewedDropDown = (id?: string) => {
  if (!id) return;
  return contactsItemsUpdated.value.find((item) => item._id === id);
};

const contactsItemsUpdated = computed(() =>
  contactsItems.map((item) =>
    item._id === openDropDownId.value
      ? { ...item, isOpenDropDown: true }
      : { ...item, isOpenDropDown: false },
  ),
);

const openDropdown = (id?: string) => {
  openDropDownId.value = !id || viewedDropDown(id)?.isOpenDropDown ? null : id;
};
</script>
