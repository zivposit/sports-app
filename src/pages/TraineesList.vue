<script setup lang="ts">
import { useRoute } from "vue-router";
import { useTraineesStore } from "@/store/trainees";
import TraineeCard from "@/components/TraineeCard.vue";
import Paragraph from "@/components/Paragraph.vue";
import Modal from "@/components/Modal.vue";
import TraineeForm from "@/components/forms/TraineeForm.vue";
import { onMounted, computed, ref } from "vue";

const route = useRoute();
const traineesStore = useTraineesStore();
const trainerId = Number(route.params.id);
const showModal = ref(false);

onMounted(() => {
    traineesStore.fetchTraineesByTrainer(trainerId);
});

const trainees = computed(() => traineesStore.trainees);
</script>

<template>
    <div class="my-4 flex flex-wrap gap-4">
        <TraineeCard v-for="trainee in trainees" :key="trainee.id" :trainee="trainee" :trainerId="trainerId" />
    </div>

    <button @click="showModal = true"
        class="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-500 text-white text-3xl flex items-center justify-center shadow-lg hover:bg-blue-600 transition">
        +
    </button>

    <Modal v-if="showModal" @close="showModal = false">
        <TraineeForm :trainerId="trainerId" @close="showModal = false" />
    </Modal>
</template>
