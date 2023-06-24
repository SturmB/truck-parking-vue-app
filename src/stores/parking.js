import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import humanizeDuration from "humanize-duration";

export const useParking = defineStore("parking", () => {
  const router = useRouter();
  const errors = reactive({});
  const loading = ref(false);
  const parkings = ref([]);
  const stoppedParkings = ref([]);
  const parkingDetails = ref({});
  const form = reactive({
    vehicle_id: null,
    shed_id: null,
  });

  function resetForm() {
    form.vehicle_id = null;
    form.shed_id = null;

    errors.value = {};
  }

  function arrive(dock = false) {
    if (loading.value) return;

    loading.value = true;
    errors.value = {};

    form.begin_docking = dock;
    return window.axios
      .post("parkings/arrive", form)
      .then(() => {
        router.push({ name: "parkings.active" });
      })
      .catch((error) => {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors;
        }
      })
      .finally(() => {
        loading.value = false;
      });
  }

  function getActiveParkings() {
    return window.axios.get("parkings").then((response) => {
      parkings.value = response.data.data;
    });
  }

  function dock(parking) {
    return window.axios.put(`parkings/dock/${parking.id}`).then(getActiveParkings);
  }

  function depart(parking) {
    return window.axios.put(`parkings/depart/${parking.id}`).then(getActiveParkings);
  }

  function getParkingHistory() {
    return window.axios.get("parkings/history").then((response) => {
      stoppedParkings.value = response.data.data;
    });
  }

  function resetParkingDetails() {
    parkingDetails.value = {};
  }

  function getParking(parking) {
    return window.axios.get(`parkings/${parking.id}`).then((response) => {
      parkingDetails.value = response.data.data;
    });
  }

  return {
    form,
    errors,
    loading,
    resetForm,
    arrive,
    parkings,
    getActiveParkings,
    dock,
    depart,
    stoppedParkings,
    getParkingHistory,
    parking: parkingDetails,
    resetParkingDetails,
    getParking,
  };
});
