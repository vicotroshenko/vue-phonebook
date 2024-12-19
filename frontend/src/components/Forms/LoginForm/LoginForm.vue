<template>
  <FormKit type="form" :actions="false" id="login_form" :plugins="[zodPlugin]" @submit="submitHandler"
    :incomplete-message="false" form-class="bg-bg-color w-full max-w-[300px] mx-auto flex flex-col gap-y-3 bg-inherit">
    <CustomField type="email" name="email" label-text="Email" validation="required|email" />
    <CustomField type="password" name="password" label-text="Password" autocomplete="off"
      required="validation|length:8" />
    <div class="flex justify-between gap-2">
      <CustomButton>Log in</CustomButton>
      <GoBackButton class="px-2 py-1 font-medium uppercase" />
    </div>
  </FormKit>
</template>

<script setup lang="ts">
import CustomButton from '@/components/CustomButton/CustomButton.vue';
import CustomField from '@/components/CustomField/CustomField.vue';
import { FormKit, reset } from '@formkit/vue';
import loginSchema from './validation';
import { createZodPlugin } from '@formkit/zod';
import GoBackButton from '@/components/GoBackButton/GoBackButton.vue';
import { useRouter } from 'vue-router';
import userService from '@/service/user.service';
const router = useRouter();

const [zodPlugin, submitHandler] = createZodPlugin(loginSchema, async (formData) => {
  userService.login(formData)
  router.replace('/');
  reset('login_form');
});
</script>
