<template>
  <UserHeader
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
      @changeFavorite="changeFavorite"
    />
  </main>
</template>

<script setup lang="ts">
import ContactsList from '@/components/ContactsList/ContactsList.vue';
import type { Contacts } from '@/types/contacts.js';
import { computed, onMounted, ref } from 'vue';
import UserHeader from '@/components/UserHeader/UserHeader.vue';
import { contactsService } from '@/service/contacts.service.js';

const contactsItems = ref<Contacts[]>([]);
const searchValue = ref('');

onMounted(async () => {
  const fetchedContacts = await contactsService.getAll({ withAuth: true });
  contactsItems.value = sortContactsByFavorite(fetchedContacts.data);
});

const sortContactsByFavorite = (items: Contacts[]) => {
  const favorite = items.filter((item) => item.favorite);
  const notFavorite = items.filter((item) => !item.favorite);
  return [...favorite, ...notFavorite];
};

const addContact = (item: Omit<Contacts, 'id'>) => {
  contactsItems.value.push({ ...item, _id: `${new Date()}` });
  contactsService.create({
    config: {
      data: item,
    },
    withAuth: true,
  });
};

const updateContact = (item: Contacts) => {
  contactsItems.value = sortContactsByFavorite(contactsItems.value.map((el) => {
    if (el._id === item._id) {
      return {
        ...el,
        ...item,
      };
    }
    return el;
  }));

  const [data] = contactsItems.value.filter((el) => el._id === item._id);
  contactsService.put({ config: { data: { ...data } }, withAuth: true, id: item._id });
};

const deleteContact = (id: string) => {
  contactsItems.value = contactsItems.value.filter((el: Contacts) => el._id !== id);
  contactsService.delete({ id, withAuth: true });
};

const changeFavorite = (id: string) => {
  contactsItems.value = sortContactsByFavorite(contactsItems.value.map((el: Contacts) =>
    el._id === id ? { ...el, favorite: !el.favorite } : el,
  ));
  const [data] = contactsItems.value.filter((el) => el._id === id);
  contactsService.put({ config: { data: { ...data } }, withAuth: true, id });
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
