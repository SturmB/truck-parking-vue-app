import { ref } from "vue";
import { defineStore } from "pinia";

export const useShed = defineStore("shed", () => {
  const sheds = ref([]);

  function getSheds() {
    return window.axios
      .get("sheds")
      .then((response) => (sheds.value = response.data.data));
  }

  return { getSheds, sheds };
});
