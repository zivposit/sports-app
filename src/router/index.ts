import { createRouter, createWebHistory } from "vue-router";
import TrainersList from "@/pages/TrainersList.vue";
import TrainerDetails from "@/pages/TrainerDetails.vue";
import TraineesList from "../pages/TraineesList.vue";
import TrainingsList from "../pages/TrainingsList.vue";

const routes = [
  { path: "/", component: TrainersList },
  {
    path: "/trainer/:id",
    component: TrainerDetails,
    props: true,
    children: [
      { path: "trainees", component: TraineesList },
      { path: "trainings", component: TrainingsList },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
