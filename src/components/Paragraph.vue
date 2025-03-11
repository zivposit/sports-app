<script setup lang="ts">
defineProps<{ text: string; type?: "title" | "subtitle" | "paragraph" }>();
</script>

<template>
    <h1 v-if="type === 'title'" class="text-3xl font-bold text-gray-900">{{ text }}</h1>
    <h2 v-else-if="type === 'subtitle'" class="text-2xl font-semibold text-gray-700">{{ text }}</h2>
    <p v-else class="text-base text-gray-600">{{ text }}</p>
</template>
