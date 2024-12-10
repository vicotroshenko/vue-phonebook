<template>
  <div class="flex h-screen w-full items-center justify-center bg-bg-color">
    <div class="flex gap-3">
      <RouterLink :to="{ name: LinkPath.LOGIN }" class="px-2 py-1 font-medium uppercase"
        >Login</RouterLink
      >
      <RouterLink :to="{ name: LinkPath.SIGNUP }" class="px-2 py-1 font-medium uppercase"
        >Sing up</RouterLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { LinkPath } from '@/router';
</script>
