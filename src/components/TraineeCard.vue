<script setup lang="ts">
import { defineProps, onMounted, ref } from "vue";
import { useTraineesStore } from "@/store/trainees";
import { fetchRandomPicture } from "@/utils/fetchRandomPicture";
import Button from "./Button.vue";
import Paragraph from "./Paragraph.vue";
import TraineeForm from "./forms/TraineeForm.vue";
import Modal from "./Modal.vue";
import type { Trainee } from "@/types/trainee";

const props = defineProps<{ trainee: Trainee, trainerId: number }>();
const traineesStore = useTraineesStore();
const profilePicture = ref("");
const showEditModal = ref(false);

const deleteTrainee = () => traineesStore.deleteTrainee(props.trainee.id);

onMounted(async () => {
    profilePicture.value = await fetchRandomPicture(`${props.trainee.firstName} ${props.trainee.lastName}`);
});

</script>

<template>
    <div
        class="flex flex-col justify-between p-4 bg-white shadow-md rounded-lg border border-gray-200 w-xs text-center">
        <div class="flex flex-row gap-4 items-center">
            <div v-if="profilePicture" class="w-1/3">
                <img :src="profilePicture" alt="Trainee Picture" class="w-full h-full object-cover rounded-lg" />
            </div>
            <div class="w-2/3">
                <Paragraph :text="[trainee.firstName, trainee.lastName].join(' ')" type="subtitle" />
                <div class="flex flex-col my-2">
                    <Paragraph :text="'Birth Date: ' + trainee.birthDate" type="paragraph" />
                    <Paragraph :text="'Joined At: ' + trainee.joinDate" type="paragraph" />
                </div>
            </div>
        </div>

        <div class="mt-4 flex justify-between">
            <Button text="Edit" @click="showEditModal = true" />
            <Button text="Delete" color="danger" @click="deleteTrainee" />
        </div>

        <Modal v-if="showEditModal" @close="showEditModal = false">
            <TraineeForm :initialValues="trainee" :trainerId="trainerId" @close="showEditModal = false" />
        </Modal>
    </div>
</template>
