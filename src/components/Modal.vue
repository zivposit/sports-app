<script setup lang="ts">
import { defineEmits } from "vue";

const emit = defineEmits(["close"]);
</script>

<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button @click="emit('close')" class="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-lg">
                ✕
            </button>
            <slot></slot>
        </div>
    </div>
</template>
