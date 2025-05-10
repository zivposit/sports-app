import { Trainee } from "@/types/trainee";
import { fetchApi } from "@/utils/fetchApi";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useTraineesStore = defineStore("trainees", () => {
  const trainees = ref<Trainee[]>([]);

  const fetchTraineesByTrainer = async (trainerId: number) => {
    const response = await fetchApi<{ attributes: Trainee }[]>(
      `/trainers/${trainerId}/trainees`
    );
    trainees.value = (response || []).map(({ attributes }) => attributes);
  };

  const createTrainee = async (
    trainee: Omit<Trainee, "id" | "createdAt" | "updatedAt"> & {
      trainerId: number;
    }
  ) => {
    const response = await fetchApi(`/trainer_trainees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trainee }),
    });

    trainees.value.push(response.attributes);
  };

  const updateTrainee = async (id: number, trainee: Partial<Trainee>) => {
    try {
      const response = await fetchApi<{ attributes: Trainee }>(
        `/trainees/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ trainee }),
        }
      );

      const index = trainees.value.findIndex((t) => t.id === id);
      if (index !== -1) {
        trainees.value[index] = response?.attributes || {};
      }
    } catch (error) {
      console.error("Error updating trainee:", error);
    }
  };

  const deleteTrainee = async (id: number) => {
    await fetchApi(`/trainees/${id}`, { method: "DELETE" });
    trainees.value = trainees.value.filter((t) => t.id !== id);
  };

  return {
    trainees,
    updateTrainee,
    fetchTraineesByTrainer,
    createTrainee,
    deleteTrainee,
  };
});
