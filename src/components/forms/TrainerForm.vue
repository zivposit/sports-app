<script setup lang="ts">
import { ref, defineProps, defineEmits, watchEffect } from "vue";
import { useTrainersStore } from "@/store/trainers";
import type { Trainer } from "@/types/trainer";
import GenericForm from "./GenericForm.vue";

const props = defineProps<{ initialValues?: Trainer }>();
const emit = defineEmits(["close"]);
const trainersStore = useTrainersStore();

const trainer = ref<Omit<Trainer, "id" | "createdAt" | "updatedAt">>({
    idNumber: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    joinDate: new Date().toISOString().split("T")[0],
});

watchEffect(() => {
    if (props.initialValues) {
        trainer.value = { ...props.initialValues };
    }
});

const submitTrainer = async (formData: Omit<Trainer, "id" | "createdAt" | "updatedAt">) => {
    if (props.initialValues) {
        await trainersStore.updateTrainer(props.initialValues.id, formData);
    } else {
        await trainersStore.createTrainer({ ...formData, joinDate: new Date().toISOString().split("T")[0] });
    }
    emit("close");
};

const fields = [
    { name: "idNumber", label: "ID Number", type: "text", disabled: !!props.initialValues },
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "birthDate", label: "Date of Birth", type: "date" },
];
</script>

<template>
    <div>
        <h2 class="text-xl font-bold mb-4">
            {{ initialValues ? "Edit Trainer" : "Add New Trainer" }}
        </h2>
        <GenericForm :fields="fields" :initialValues="trainer" submitText="Save" @submit="submitTrainer" />
    </div>
</template>
