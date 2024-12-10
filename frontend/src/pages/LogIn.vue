<template>
  <main class="flex h-screen w-full flex-col items-center justify-center bg-bg-color">
    <h1 class="mb-5 text-2xl font-semibold">Log in</h1>
    <LoginForm />
  </main>
</template>

<script setup lang="ts">
import LoginForm from '@/components/Forms/LoginForm/LoginForm.vue';
</script>
