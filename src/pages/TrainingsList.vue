<script setup lang="ts">
import { useRoute } from "vue-router";
import { useTrainingsStore } from "@/store/trainings";
import { useTraineesStore } from "@/store/trainees";
import TrainingCard from "@/components/TrainingCard.vue";
import Paragraph from "@/components/Paragraph.vue";
import TrainingForm from "@/components/forms/TrainingForm.vue";
import { ref, computed, onMounted } from "vue";
import Modal from "@/components/Modal.vue";

const route = useRoute();
const trainingsStore = useTrainingsStore();
const traineesStore = useTraineesStore();
const trainerId = Number(route.params.id);
const showModal = ref(false);

onMounted(() => {
    trainingsStore.fetchTrainingsByTrainer(trainerId);
    traineesStore.fetchTraineesByTrainer(trainerId);
});



const categorizedTrainings = computed(() => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const upcoming = [];
    const future = [];

    trainingsStore.trainings.forEach((training) => {
        const trainingDate = new Date(training.dateTime);

        if (trainingDate >= today && trainingDate <= nextWeek) {
            upcoming.push(training);
        } else if (trainingDate > nextWeek) {
            future.push(training);
        }
    });


    upcoming.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
    future.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());

    return { upcomingTrainings: upcoming, futureTrainings: future };
});

const trainerTrainees = computed(() => traineesStore.trainees);
</script>

<template>
    <template v-if="categorizedTrainings.upcomingTrainings.length">
        <hr class="my-4 border-gray-300">
        <Paragraph text="Upcoming Trainings (Next 7 Days)" type="subtitle" class="mt-4 text-center" />
        <div class="grid grid-cols-3 gap-4 mt-2">
            <TrainingCard v-for="training in categorizedTrainings.upcomingTrainings" :key="training.id"
                :training="training" />
        </div>
    </template>

    <template v-if="categorizedTrainings.futureTrainings.length">
        <hr class="my-4 border-gray-300">
        <Paragraph text="Future Trainings" type="subtitle" class="mt-6 text-center" />
        <div class="grid grid-cols-3 gap-4 mt-2">
            <TrainingCard v-for="training in categorizedTrainings.futureTrainings" :key="training.id"
                :training="training" />
        </div>
    </template>

    <button @click="showModal = true"
        class="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-500 text-white text-3xl flex items-center justify-center shadow-lg hover:bg-green-600 transition">
        +
    </button>

    <Modal v-if="showModal" @close="showModal = false">
        <TrainingForm :trainerId="trainerId" :trainees="trainerTrainees" @close="showModal = false" />
    </Modal>
</template>
