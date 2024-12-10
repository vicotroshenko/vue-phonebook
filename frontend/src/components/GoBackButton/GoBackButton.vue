<template>
	<div>
		<button type="button" @click="router.back()">Back</button>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
