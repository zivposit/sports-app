<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useTrainersStore } from "@/store/trainers";
import TrainerCard from "@/components/TrainerCard.vue";
import Paragraph from "@/components/Paragraph.vue";
import Modal from "@/components/Modal.vue";
import TrainerForm from "@/components/forms/TrainerForm.vue";

const trainersStore = useTrainersStore();
const showModal = ref(false);

onMounted(() => {
    trainersStore.fetchTrainers();
});

const trainers = computed(() => trainersStore.trainers);
</script>

<template>
    <div class="p-6">
        <Paragraph text="Trainers" type="title" />
        <div class="grid grid-cols-3 gap-4 mt-4">
            <TrainerCard v-for="trainer in trainers" :key="trainer.id" :trainer="trainer" />
        </div>

        <button @click="showModal = true"
            class="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-500 text-white text-3xl flex items-center justify-center shadow-lg hover:bg-blue-600 transition">
            +
        </button>

        <Modal v-if="showModal" @close="showModal = false">
            <TrainerForm @close="showModal = false" />
        </Modal>
    </div>
</template>
