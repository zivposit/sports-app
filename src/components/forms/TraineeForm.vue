<script setup lang="ts">
import { ref, defineProps, defineEmits, watchEffect } from "vue";
import { useTraineesStore } from "@/store/trainees";
import type { Trainee } from "@/types/trainee";
import GenericForm from "./GenericForm.vue";

const props = defineProps<{ initialValues?: Trainee, trainerId: number }>();
const emit = defineEmits(["close"]);
const traineesStore = useTraineesStore();

const trainee = ref<Omit<Trainee, "id" | "createdAt" | "updatedAt">>({
    idNumber: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    joinDate: new Date().toISOString().split("T")[0],
});


watchEffect(() => {
    if (props.initialValues) {
        trainee.value = { ...props.initialValues };
    }
});

const submitTrainee = async (formData: Omit<Trainee, "id" | "createdAt" | "updatedAt">) => {
    if (props.initialValues) {
        await traineesStore.updateTrainee(props.initialValues.id, formData);
    } else {
        await traineesStore.createTrainee({ ...formData, trainerId: props.trainerId, joinDate: new Date().toISOString().split("T")[0] });
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
            {{ initialValues ? "Edit Trainee" : "Add New Trainee" }}
        </h2>
        <GenericForm :fields="fields" :initialValues="trainee" submitText="Save" @submit="submitTrainee" />
    </div>
</template>
