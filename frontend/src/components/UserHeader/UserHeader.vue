<template>
  <ContactsModal
    @toggle="toggle"
    :isOpen="isOpenModal"
    :contactsItems="contactsItems"
    @addContact="$emit('addContact', $event)"
    @updateContact="$emit('updateContact', $event)"
  />
  <header class="fixed left-0 top-0 w-full bg-light-1 backdrop-blur">
    <div class="flex justify-between px-3 py-2">
      <div class="text-2xl font-bold uppercase">Phonebook</div>
      <div class="flex gap-1">
        <button
          type="button"
          @click="toggle"
          aria-label="open modal window"
          class="rounded bg-slate-200 p-1"
        >
          Add contact
        </button>
        <button type="button" class="rounded bg-slate-200 p-1" @click="handleLogout">Logout</button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ContactsModal from '../ContactsModal/ContactsModal.vue';
import type { Contacts } from '@/types/contacts';
import { LocalStorage } from '@/utils/localStorage';
import { STORAGE_KEY } from '@/constants/keys';
import { useRouter } from 'vue-router';
import { LinkPath } from '@/router';

defineProps<{
  contactsItems: Contacts[];
}>();

defineEmits<{
  (event: 'addContact', contact: Omit<Contacts, 'id'>): void;
  (event: 'updateContact', contact: Contacts): void;
}>();

const isOpenModal = ref<boolean>(false);
const userLocalStore = new LocalStorage(STORAGE_KEY);
const router = useRouter();

const toggle = () => (isOpenModal.value = !isOpenModal.value);

const handleLogout = () => {
  const user = userLocalStore.get();
  if (!user) return;
  userLocalStore.set({
    ...user,
    isLogged: false,
  });
  router.push('/' + LinkPath.HOME);
};
</script>
