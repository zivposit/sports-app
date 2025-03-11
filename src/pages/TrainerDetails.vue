<script setup lang="ts">
import { useRoute, RouterView } from "vue-router";
import { useTrainersStore } from "@/store/trainers";
import { computed, onMounted } from "vue";
import Paragraph from "@/components/Paragraph.vue";
import { useTrainingMetadataStore } from "@/store/trainingMetadata";
import Navbar from "@/components/Navbar.vue";

const route = useRoute();
const trainerId = Number(route.params.id);
const trainersStore = useTrainersStore();
const trainingMetadataStore = useTrainingMetadataStore();

onMounted(() => {
    trainingMetadataStore.fetchTrainingMetadata();
    trainersStore.fetchTrainers();
});

const trainer = computed(() => trainersStore.trainers.find(t => t.id === trainerId));
</script>

<template>
    <div class="p-6">
        <template v-if="trainer">
            <Navbar :trainer="trainer" />

            <RouterView />
        </template>

        <template v-else>
            <Paragraph text="Trainer not found." type="paragraph" />
        </template>
    </div>
</template>
