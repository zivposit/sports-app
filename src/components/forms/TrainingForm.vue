<script setup lang="ts">
import { defineProps, defineEmits, computed, onMounted } from "vue";
import { useTrainingsStore } from "@/store/trainings";
import { useTrainingMetadataStore } from "@/store/trainingMetadata";
import { useTraineesStore } from "@/store/trainees";
import type { Training } from "@/types/training";
import GenericForm from "./GenericForm.vue";

const props = defineProps<{
    trainerId: number;
    initialValues?: Training;
}>();
const emit = defineEmits(["close"]);

const trainingsStore = useTrainingsStore();
const trainingMetadataStore = useTrainingMetadataStore();
const traineesStore = useTraineesStore();

onMounted(async () => {
    await trainingMetadataStore.fetchTrainingMetadata();
    await traineesStore.fetchTraineesByTrainer(props.trainerId);
});

const studios = computed(() => trainingMetadataStore.studios);
const trainingTypes = computed(() => trainingMetadataStore.trainingTypes);
const trainees = computed(() => traineesStore.trainees);

const assignedTrainees = computed(() => {
    if (!props.initialValues?.trainees) return [];
    return props.initialValues.trainees.map(id => {
        const trainee = trainees.value.find(t => t.id == id);
        return trainee ? { id: trainee.id, name: `${trainee.firstName} ${trainee.lastName}` }
            : { id, name: `Unknown Trainee (${id})` };
    });
});

const traineeOptions = computed(() =>
    trainees.value.map(t => ({ id: t.id, name: `${t.firstName} ${t.lastName}` }))
);

const initialTrainingValues = computed(() => ({
    ...props.initialValues,
    trainees: assignedTrainees.value,
}));

const fields = computed(() => [
    { name: "studioId", label: "Studio", type: "select", options: studios.value },
    { name: "trainingTypeId", label: "Training Type", type: "select", options: trainingTypes.value },
    { name: "dateTime", label: "Date & Time", type: "datetime-local" },
    { name: "duration", label: "Duration (minutes)", type: "number" },
    {
        name: "trainees",
        label: "Assign Trainees",
        type: "multiselect",
        options: traineeOptions.value
    }
]);

const submitTraining = async (formData: Omit<Training, "id" | "createdAt" | "updatedAt">) => {
    const trainingData = {
        ...formData,
        trainerId: formData.trainerId || props.trainerId,
        trainees: formData.trainees.map(t => t.id),
    };

    if (props.initialValues) {
        await trainingsStore.updateTraining(props.initialValues.id, trainingData);
    } else {
        await trainingsStore.createTraining(trainingData);
    }
    emit("close");
};
</script>

<template>
    <div>
        <h2 class="text-xl font-bold mb-4">{{ initialValues ? "Edit Training" : "Add New Training" }}</h2>
        <GenericForm :fields="fields" :initialValues="initialTrainingValues" submitText="Save"
            @submit="submitTraining" />
    </div>
</template>
