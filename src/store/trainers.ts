import { Trainer } from "@/types/trainer";
import { fetchApi } from "@/utils/fetchApi";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useTrainersStore = defineStore("trainers", () => {
  const trainers = ref<Trainer[]>([]);
  const fetched = ref(false);

  const fetchTrainers = async () => {
    if (fetched.value) {
      return;
    }

    try {
      const response = await fetchApi<{ attributes: Trainer }[]>("/trainers");
      trainers.value = (response || []).map(({ attributes }) => attributes);
      fetched.value = true;
    } catch (error) {
      console.error("Error fetching trainers:", error);
    }
  };

  const createTrainer = async (
    trainer: Omit<Trainer, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      const response = await fetchApi<{ attributes: Trainer }>("/trainers", {
        method: "POST",
        body: JSON.stringify({ trainer }),
      });
      trainers.value.push(response.attributes);
    } catch (error) {
      console.error("Error creating trainer:", error);
    }
  };

  const updateTrainer = async (id: number, trainer: Partial<Trainer>) => {
    try {
      const response = await fetchApi<{ attributes: Trainer }>(
        `/trainers/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ trainer }),
        }
      );

      const index = trainers.value.findIndex((t) => t.id === id);
      if (index !== -1) {
        trainers.value[index] = response?.attributes || {};
      }
    } catch (error) {
      console.error("Error updating trainer:", error);
    }
  };

  const deleteTrainer = async (id: number) => {
    try {
      await fetchApi(`/trainers/${id}`, { method: "DELETE" });
      trainers.value = trainers.value.filter((t) => t.id !== id);
    } catch (error) {
      console.error("Error deleting trainer:", error);
    }
  };

  return {
    trainers,
    fetchTrainers,
    createTrainer,
    updateTrainer,
    deleteTrainer,
  };
});
