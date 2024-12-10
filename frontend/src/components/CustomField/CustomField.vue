<template>
  <div class="relative h-[60px] w-full rounded border-[1px] border-black bg-item-color">
    <FormKit
      v-bind="$attrs"
      :id="name"
      :name="name"
      placeholder=" "
      validation-visibility="dirty"
      :classes="{
        input: 'bg-transparent h-full w-full rounded border-gray-2 px-2.5 py-1 outline-none',
        outer:
          'peer h-full [&:has(input:placeholder-shown)+label]:top-1/2 [&:has(input:placeholder-shown)+label]:translate-y-[-50%] [&:not(:has(input:placeholder-shown))+label]:text-sm [&:not(:has(input:placeholder-shown))+label]:text-blue-300',
        wrapper: 'h-full',
        inner: 'h-full',
      }"
    />
    <label
      class="absolute left-2.5 top-0 z-20 inline-block translate-y-0 leading-none text-gray-700 transition-all duration-200 peer-focus-within:top-0 peer-focus-within:translate-y-0 peer-focus-within:text-sm"
      :for="name"
      >{{ labelText }}</label
    >
    <!-- <span class="h-[20px] leading-5 text-red-500 text-sx">{{ error }}</span> -->
  </div>
</template>

<script setup lang="ts">
import { FormKit } from '@formkit/vue'

interface CustomFieldProps {
  labelText?: string;
  name: string;
  error?: string;
}
defineProps<CustomFieldProps>()
</script>

