<template>
  <FormKit type="form" :plugins="[zodPlugin]" @submit="submitHandler" :incomplete-message="false" :id="formId"
    :actions="false" form-class="max-w-[300px] mx-auto flex flex-col gap-y-3 bg-inherit">
    <CustomField type="text" name="name" label-text="Name" required />
    <CustomField type="email" name="email" label-text="Email" required />
    <CustomField type="text" name="phone" label-text="Phone" required />
    <FormKit type="checkbox" label="Favorite" help="Is this contact favorite?" name="favorite" :value="false" />
    <CustomButton>Send</CustomButton>
  </FormKit>
</template>

<script setup lang="ts">
import { FormKit, reset } from '@formkit/vue'
import CustomField from '../../CustomField/CustomField.vue'
import type { Contacts } from '@/types/contacts'
import CustomButton from '../../CustomButton/CustomButton.vue'
import addContactSchema from './validation';
import { createZodPlugin } from '@formkit/zod';
const formId = 'contacts_id'

defineProps<{
  contactsItems: Contacts[]
}>()

const emit = defineEmits<{
  (event: 'handleSubmit', contact: Contacts & Omit<Contacts, 'id'>): void
}>();

const [zodPlugin, submitHandler] = createZodPlugin(addContactSchema, async (formData) => {
  emit('handleSubmit', formData);
  reset(formId);
});
</script>
