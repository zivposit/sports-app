import { Trainee } from "@/types/trainee";
import { Training } from "@/types/training";
import { fetchApi } from "@/utils/fetchApi";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useTrainingsStore = defineStore("trainings", () => {
  const trainings = ref<Training[]>([]);

  const fetchTrainingsByTrainer = async (trainerId: number) => {
    const response = await fetchApi(`/trainers/${trainerId}/trainings`);
    const trainingData = response.map(({ attributes, relationships }: any) => {
      return {
        ...attributes,
        trainingTypeId: relationships.trainingType.data.id,
        studioId: relationships.studio.data.id,
        trainees: relationships.trainees.data.map((trainee: any) => trainee.id),
      };
    });

    trainings.value = trainingData;
  };

  const createTraining = async (
    training: Omit<Training, "id" | "createdAt" | "updatedAt">
  ) => {
    const response = await fetchApi("/trainings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ training }),
    });

    const { attributes, relationships } = response || {};

    const trainingData = {
      ...attributes,
      trainingTypeId: relationships.trainingType.data.id,
      studioId: relationships.studio.data.id,
      trainees: relationships.trainees.data.map(
        (trainee: Trainee) => trainee.id
      ),
    };

    trainings.value.push(trainingData);
  };

  const deleteTraining = async (id: number) => {
    await fetchApi(`/trainings/${id}`, { method: "DELETE" });
    trainings.value = trainings.value.filter((t) => t.id !== id);
  };

  const updateTraining = async (
    id: number,
    training: Omit<Training, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      const response = await fetchApi(`/trainings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ training }),
      });

      const index = trainings.value.findIndex((t) => t.id === id);
      if (index !== -1) {
        const trainingData = {
          ...response.attributes,
          trainingTypeId: response.relationships.trainingType.data.id,
          studioId: response.relationships.studio.data.id,
          trainees: response.relationships.trainees.data.map(
            (trainee: Trainee) => trainee.id
          ),
        };

        trainings.value[index] = trainingData;
      }
    } catch (error) {
      console.error("Error updating training:", error);
    }
  };

  return {
    trainings,
    fetchTrainingsByTrainer,
    createTraining,
    deleteTraining,
    updateTraining,
  };
});
