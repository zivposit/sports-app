<script setup lang="ts">
import { useRoute } from "vue-router";
import { useTrainersStore } from "@/store/trainers";
import Paragraph from "./Paragraph.vue";
const route = useRoute();
const trainersStore = useTrainersStore();

const trainerId = route.params.id ? Number(route.params.id) : null;
const trainer = trainerId ? trainersStore.trainers.find(t => t.id === trainerId) : null;
</script>

<template>
    <nav class="sticky top-5 z-10 backdrop-blur-md mb-10 ">
        <RouterLink :to="`/`" class="px-4 py-2 border rounded-lg hover:bg-gray-300">Back</RouterLink>
        <div class="mt-5 bg-white shadow-md rounded-lg p-4 border border-gray-300 flex justify-between">
            <div>
                <Paragraph :text="trainer.firstName" type="title" />
                <Paragraph :text="trainer.lastName" type="title" />
            </div>
            <div>
                <Paragraph :text="'ID Number: ' + trainer.idNumber" type="paragraph" />
                <Paragraph :text="'Birth Date: ' + trainer.birthDate" type="paragraph" />
                <Paragraph :text="'Join Date: ' + trainer.joinDate" type="paragraph" />
            </div>
        </div>

        <div class="flex space-x-4 border-b pb-2 mt-4">
            <RouterLink :to="`/trainer/${trainerId}/trainees`" class="px-4 py-2 border rounded-lg hover:bg-gray-300"
                active-class="bg-gray-200">
                Trainees
            </RouterLink>
            <RouterLink :to="`/trainer/${trainerId}/trainings`" class="px-4 py-2 border rounded-lg hover:bg-gray-300"
                active-class="bg-gray-200">
                Trainings
            </RouterLink>
        </div>
    </nav>
</template>
