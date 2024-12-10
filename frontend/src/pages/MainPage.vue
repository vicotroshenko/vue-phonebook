<template>
  <UserHeader
    :contactsItems="contactsItems"
    @addContact="addContact"
    @updateContact="updateContact"
  />
  <main class="h-screen w-full bg-bg-color pt-[52px]">
    <div class="mx-auto w-fit">
      <input
        type="text"
        name="search"
        v-model="searchValue"
        class="rounded border-[1px] border-black bg-slate-100 px-2 py-1"
      />
    </div>
    <ContactsList
      :contactsItems="searchedContacts"
      @deleteContact="deleteContact"
      @addToFavorite="addToFavorite"
    />
  </main>
</template>

<script setup lang="ts">
import ContactsList from '@/components/ContactsList/ContactsList.vue';
import data from '../service/data.ts';
import type { Contacts } from '@/types/contacts.js';
import { computed, ref } from 'vue';
import UserHeader from '@/components/UserHeader/UserHeader.vue';

const contactsItems = ref<Contacts[]>(data);
const searchValue = ref('');

const addContact = (item: Omit<Contacts, 'id'>) => {
  contactsItems.value.push({ ...item, id: `${new Date()}` });
};

const updateContact = (item: Contacts) => {
  contactsItems.value = contactsItems.value.map((el) => {
    if (el.id === item.id) {
      return {
        ...el,
        ...item,
      };
    }
    return el;
  });
};

const deleteContact = (id: string) => {
  contactsItems.value = contactsItems.value.filter((el: Contacts) => el.id !== id);
};

const addToFavorite = (id: string) => {
  contactsItems.value = contactsItems.value.map((el: Contacts) =>
    el.id === id ? { ...el, favorite: !el.favorite } : el,
  );
};

const searchedContacts = computed(() =>
  contactsItems.value.filter((el) =>
    Object.values(el).some((c) => {
      if (typeof c !== 'boolean') {
        return c.toLowerCase().includes(searchValue.value.toLowerCase());
      }
    }),
  ),
);
</script>
