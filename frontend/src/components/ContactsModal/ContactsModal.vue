<template>
  <div v-if="isOpen" class="fixed inset-0 z-20 h-full w-full bg-gray-3">
    <div
      class="bg-bg-color absolute left-1/2 top-1/2 min-w-[360px] max-w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-md p-5 shadow shadow-black"
    >
      <button
        type="button"
        @click="$emit('toggle')"
        aria-label="close the modal window"
        class="mb-2 h-[28px] w-[28px] rounded-full transition hover:shadow-xl hover:shadow-black focus:shadow-xl focus:shadow-black"
      >
        X
      </button>
      <AddContactForm :contactsItems="contactsItems" @handleSubmit="handleSubmit" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Contacts } from '@/types/contacts';
import AddContactForm from '../Forms/AddContactForm/AddContactForm.vue';

defineProps<{
  isOpen: boolean;
  contactsItems: Contacts[];
}>();

const emit = defineEmits<{
  (event: 'toggle'): void;
  (event: 'addContact', contact: Omit<Contacts, 'id'>): void;
  (event: 'updateContact', contact: Contacts): void;
}>();

const handleSubmit = (contact: Contacts | Omit<Contacts, 'id'>) => {
  emit('addContact', contact);
  emit('toggle');
};
</script>
