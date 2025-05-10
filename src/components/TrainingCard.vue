<script setup lang="ts">
import { defineProps, ref, computed, onMounted } from "vue";
import { useTrainingsStore } from "@/store/trainings";
import { useTrainingMetadataStore } from "@/store/trainingMetadata";
import Button from "./Button.vue";
import Paragraph from "./Paragraph.vue";
import type { Training } from "@/types/training";
import Modal from "./Modal.vue";
import TrainingForm from "./forms/TrainingForm.vue";

const props = defineProps<{ training: Training }>();
const trainingMetadataStore = useTrainingMetadataStore();
const trainingsStore = useTrainingsStore();
const showModal = ref(false);

onMounted(() => {
    trainingMetadataStore.fetchTrainingMetadata();
});


const getTime = (dateTime: string, duration: number) => {
    const formattedDate = dateTime.split("T")[0];

    const dateObj = new Date(dateTime);
    dateObj.setHours(dateObj.getHours() - 2);

    const startTime = `${dateObj.getHours().toString().padStart(2, "0")}:${dateObj.getMinutes().toString().padStart(2, "0")}`;

    const endDateObj = new Date(dateObj.getTime() + duration * 60000);
    const endTime = `${endDateObj.getHours().toString().padStart(2, "0")}:${endDateObj.getMinutes().toString().padStart(2, "0")}`;

    return { formattedDate, formattedTimeRange: `${startTime} - ${endTime} (${duration} minutes)` };
};




const formattedTraining = computed(() => {
    const { dateTime, duration, studioId, trainingTypeId } = props.training;
    const { formattedDate, formattedTimeRange } = getTime(dateTime, duration);
    const studio = trainingMetadataStore.studios.find(s => s.id == studioId);
    const studioName = studio ? studio.name : "Unknown Studio";

    const trainingType = trainingMetadataStore.trainingTypes.find(t => t.id == trainingTypeId);
    const trainingTypeName = trainingType ? trainingType.name : "Unknown Type";

    return { formattedDate, formattedTimeRange, studioName, trainingTypeName };
});

const deleteTraining = () => trainingsStore.deleteTraining(props.training.id);

const editTraining = () => {
    showModal.value = true;
};
</script>

<template>
    <div
        class="m-1 p-4 flex flex-col gap-2 items-center justify-between bg-white shadow-md rounded-lg border border-gray-200 text-center">
        <div class="flex flex-col gap-1 items-center">
            <Paragraph :text="formattedTraining.trainingTypeName" type="subtitle" />
            <Paragraph :text="formattedTraining.studioName" type="paragraph" />
        </div>
        <div>
            <Paragraph :text="formattedTraining.formattedDate" type="paragraph" />
            <Paragraph :text="formattedTraining.formattedTimeRange" type="paragraph" />
        </div>

        <div class="mt-2 flex justify-between w-full">
            <Button text="Edit" @click="editTraining" />
            <Button text="Delete" color="danger" @click="deleteTraining" />
        </div>
    </div>

    <Modal v-if="showModal" @close="showModal = false">
        <TrainingForm :trainerId="props.training.trainerId" :initialValues="props.training"
            @close="showModal = false" />
    </Modal>
</template>
