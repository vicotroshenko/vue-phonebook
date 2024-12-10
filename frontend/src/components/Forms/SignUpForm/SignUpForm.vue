<template>
  <FormKit type="form" :plugins="[zodPlugin]" @submit="submitHandler" :actions="false" id="signin_form"
    :incomplete-message="false"
    form-class="bg-bg-color w-full max-w-[360px] min-w-[260px] mx-auto flex flex-col gap-y-6 bg-inherit">
    <CustomField type="text" name="name" label-text="Name" validation-visibility="dirty"
      validation="required|length:3" />
    <CustomField type="email" name="email" label-text="Email" validation-visibility="dirty"
      validation="required|email" />
    <CustomField type="password" name="password" label-text="Password" autocomplete="off" validation-visibility="dirty"
      validation="required|length:8" />
    <div class="flex justify-between gap-2">
      <CustomButton>Sign up</CustomButton>
      <GoBackButton class="px-2 py-1 font-medium uppercase" />
    </div>
  </FormKit>
</template>

<script setup lang="ts">
import CustomButton from '@/components/CustomButton/CustomButton.vue';
import CustomField from '@/components/CustomField/CustomField.vue';
import { FormKit, reset } from '@formkit/vue';
import { createZodPlugin } from '@formkit/zod';
import registrationSchema from './validation';
import GoBackButton from '@/components/GoBackButton/GoBackButton.vue';
import { STORAGE_KEY } from '@/constants/keys';
import { LocalStorage } from '@/utils/localStorage';
import { useRouter } from 'vue-router';
const userLocalStore = new LocalStorage(STORAGE_KEY);

const router = useRouter();
const [zodPlugin, submitHandler] = createZodPlugin(registrationSchema, async (formData) => {
  console.log(formData);
  const isUserExist = userLocalStore.get();
  if (isUserExist && isUserExist.email === formData.email) {
    return alert('User with such an email is already exist');
  }
  userLocalStore.set({
    ...formData,
    isLogged: true
  })
  reset('signin_form');
  router.push('/')
});
</script>
