<script setup lang="ts">
defineProps<{ text: string; color?: "primary" | "secondary" | "danger" }>();

const colors = {
    primary: "bg-blue-500 hover:bg-blue-600",
    secondary: "bg-gray-500 hover:bg-gray-600",
    danger: "bg-red-500 hover:bg-red-600",
};
</script>

<template>
    <button :class="`${colors[color || 'primary']} min-w-[80px] text-white px-4 py-2 rounded-lg`">
        {{ text }}
    </button>
</template>
