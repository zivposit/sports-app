<script setup lang="ts">
import { ref, defineProps, defineEmits, watchEffect, computed } from "vue";
import Multiselect from "vue-multiselect";
import Button from "../Button.vue";

const props = defineProps<{
    fields: {
        name: string;
        label: string;
        type: string;
        options?: { id: number; name: string }[];
        disabled?: boolean;
    }[];
    submitText: string;
    initialValues?: Record<string, any>;
}>();

const emit = defineEmits(["submit"]);
const formData = ref<{ [key: string]: any }>({});

watchEffect(() => {
    props.fields.forEach(field => {
        if (props.initialValues && props.initialValues[field.name] !== undefined) {
            if (field.type === "datetime-local" && props.initialValues[field.name]) {
                const date = new Date(props.initialValues[field.name]);
                formData.value[field.name] = date.toISOString().slice(0, 16);
            } else {
                formData.value[field.name] = props.initialValues[field.name];
            }
        } else {
            formData.value[field.name] = field.type === "multiselect" ? [] : "";
        }
    });
});

const isFormValid = computed(() => {
    return props.fields.every(field => {
        const value = formData.value[field.name];
        return field.type === "multiselect" ? value.length > 0 : !!value;
    });
});

const handleSubmit = () => {
    if (isFormValid.value) {
        emit("submit", formData.value);
    }
};
</script>

<template>
    <form @submit.prevent="handleSubmit" class="text-left">
        <div v-for="field in fields" :key="field.name" class="mb-4">
            <label :for="field.name" class="block text-gray-700 font-semibold mb-1">{{ field.label }}</label>

            <input v-if="!field.options && field.type !== 'multiselect'" v-model="formData[field.name]"
                :type="field.type" :id="field.name" :disabled="field.disabled"
                class="p-2 border border-gray-300 rounded-lg w-full focus:ring focus:ring-blue-300"
                :class="{ 'bg-gray-200 cursor-not-allowed': !!field.disabled }" />

            <select v-else-if="field.type === 'select'" v-model="formData[field.name]"
                class="p-2 border border-gray-300 rounded-lg w-full focus:ring focus:ring-blue-300">
                <option disabled value="">Select an option</option>
                <option v-for="option in field.options" :key="option.id" :value="option.id">
                    {{ option.name }}
                </option>
            </select>

            <Multiselect v-else-if="field.type === 'multiselect'" v-model="formData[field.name]"
                :options="field.options" :multiple="true" :close-on-select="false" label="name" track-by="id"
                placeholder="Select options" />
        </div>

        <Button :text="submitText" :disabled="!isFormValid"
            class="mt-4 w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed" />
    </form>
</template>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
