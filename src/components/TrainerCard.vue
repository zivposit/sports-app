<script setup lang="ts">
import { defineProps, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useTrainersStore } from "@/store/trainers";
import Button from "./Button.vue";
import Paragraph from "./Paragraph.vue";
import Modal from "./Modal.vue";
import type { Trainer } from "@/types/trainer";
import { fetchRandomPicture } from "@/utils/fetchRandomPicture";
import TrainerForm from "./forms/TrainerForm.vue";

const props = defineProps<{ trainer: Trainer }>();
const profilePicture = ref<string | null>(null);
const showEditModal = ref(false);
const router = useRouter();
const trainersStore = useTrainersStore();

const navigateToDetails = () => {
    router.push(`/trainer/${props.trainer.id}`);
};

const deleteTrainer = () => {
    trainersStore.deleteTrainer(props.trainer.id);
};

onMounted(async () => {
    profilePicture.value = await fetchRandomPicture(`${props.trainer.firstName} ${props.trainer.lastName}`);
});
</script>

<template>
    <div
        class="text-center block p-4 bg-white shadow-md rounded-lg border border-gray-200 hover:bg-gray-100 transition flex flex-col justify-between">
        <div @click="navigateToDetails" class="flex flex-row gap-4 items-center cursor-pointer">
            <div v-if="profilePicture" class="w-1/3">
                <img :src="profilePicture" alt="Trainer Picture" class="w-full h-full object-cover rounded-lg" />
            </div>
            <div class="w-2/3">
                <Paragraph :text="[trainer.firstName, trainer.lastName].join(' ')" type="title" />
                <div class="flex flex-col mt-2">
                    <Paragraph :text="'ID Number:'" type="paragraph" />
                    <Paragraph :text="trainer.idNumber" type="paragraph" />
                </div>
            </div>
        </div>

        <div class="mt-4 flex justify-between">
            <Button text="Edit" @click.stop="showEditModal = true" />
            <Button text="Delete" color="danger" @click.stop="deleteTrainer" />
        </div>

        <Modal v-if="showEditModal" @close="showEditModal = false">
            <TrainerForm :initialValues="trainer" @close="showEditModal = false" />
        </Modal>
    </div>
</template>
