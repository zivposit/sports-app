<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import Multiselect from "vue-multiselect";

const props = defineProps<{
    field: {
        name: string;
        label: string;
        type: string;
        options?: { id: number; name: string }[];
    };
    modelValue: any;
    initialValues?: Record<string, any>;
}>();

const emit = defineEmits(["update:modelValue"]);

const fieldValue = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
});

const isDisabled = computed(() => {
    return props.field.name === "idNumber" && props.initialValues !== undefined;
});
</script>

<template>
    <div class="mb-4">
        <label :for="field.name" class="block text-gray-700 font-semibold mb-1">{{ field.label }}</label>

        <input v-if="!field.options && field.type !== 'multiselect'" :id="field.name" v-model="fieldValue"
            :type="field.type" :disabled="isDisabled"
            class="p-2 border border-gray-300 rounded-lg w-full focus:ring focus:ring-blue-300" :class="{
                'bg-gray-200 text-gray-500 cursor-not-allowed': isDisabled
            }" />

        <select v-else-if="field.type === 'select'" v-model="fieldValue"
            class="p-2 border border-gray-300 rounded-lg w-full focus:ring focus:ring-blue-300">
            <option disabled value="">Select an option</option>
            <option v-for="option in field.options" :key="option.id" :value="option.id">
                {{ option.name }}
            </option>
        </select>

        <Multiselect v-else-if="field.type === 'multiselect'" v-model="fieldValue" :options="field.options"
            :multiple="true" :close-on-select="false" label="name" track-by="id" placeholder="Select options" />
    </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
