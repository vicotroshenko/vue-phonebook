<template>
  <div class="flex h-screen w-full flex-col items-center justify-center bg-bg-color">
    <h1 class="mb-5 text-2xl font-semibold">Registration Form</h1>
    <SignUpForm />
  </div>
</template>

<script setup lang="ts">
import SignUpForm from '@/components/Forms/SignUpForm/SignUpForm.vue';
</script>
