import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchApi } from "@/utils/fetchApi";
import { Studio, TrainingType } from "@/types/trainingMetadata";

export const useTrainingMetadataStore = defineStore("trainingMetadata", () => {
  const studios = ref<Studio[]>([]);
  const trainingTypes = ref<TrainingType[]>([]);

  const fetchTrainingMetadata = async () => {
    try {
      const [studiosResponse, trainingTypesResponse] = await Promise.all([
        fetchApi<{ attributes: Studio }[]>("/training_metadata/studios"),
        fetchApi<{ attributes: TrainingType }[]>(
          "/training_metadata/training_types"
        ),
      ]);

      const studs = studiosResponse.map(({ attributes }: any) => attributes);
      const types = trainingTypesResponse.map(
        ({ attributes }: any) => attributes
      );

      studios.value = studs;
      trainingTypes.value = types;
    } catch (error) {
      console.error("Error fetching training metadata:", error);
    }
  };

  return {
    studios,
    trainingTypes,
    fetchTrainingMetadata,
  };
});
