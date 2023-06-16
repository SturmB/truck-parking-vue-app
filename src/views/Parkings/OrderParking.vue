<script setup>
import { onBeforeUnmount } from "vue";
import { useVehicle } from "@/stores/vehicle";
import { useShed } from "@/stores/shed";
import { useParking } from "@/stores/parking";

const vehicleStore = useVehicle();
const shedStore = useShed();
const parkingStore = useParking();

vehicleStore.getVehicles().then((response) => {
  if (response.length > 0) {
    parkingStore.form.vehicle_id = response[0].id;
  }
});

shedStore.getSheds().then((response) => {
  if (response.length > 0) {
    parkingStore.form.shed_id = response[0].id;
  }
});

onBeforeUnmount(parkingStore.resetForm);
</script>

<template>
  <form @submit.prevent="parkingStore.arrive" novalidate>
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">Arrive at Shed</h1>

      <div class="flex flex-col gap-2 mb-4">
        <label for="vehicle_id" class="required">Vehicle</label>
        <select
          v-model="parkingStore.form.vehicle_id"
          name="vehicle_id"
          id="vehicle_id"
          class="form-input"
          :disabled="parkingStore.loading"
        >
          <option
            v-for="vehicle in vehicleStore.vehicles"
            :value="vehicle.id"
            :key="vehicle.id"
          >
            {{ vehicle.plate_number.toUpperCase() }}
            <span v-if="vehicle.description">({{ vehicle.description }})</span>
          </option>
        </select>
        <ValidationError :errors="parkingStore.errors" field="vehicle_id" />
      </div>

      <div class="flex flex-col gap-2 mb-4">
        <label for="shed_id" class="required">Shed</label>
        <select
          v-model="parkingStore.form.shed_id"
          name="shed_id"
          id="shed_id"
          class="form-input"
          :disabled="parkingStore.loading"
        >
          <option
            v-for="shed in shedStore.sheds"
            :value="shed.id"
            :key="shed.id"
          >
            {{ shed.name }}
            ({{ shed.capacity }} docking bays)
          </option>
        </select>
        <ValidationError :errors="parkingStore.errors" field="shed_id" />
        <ValidationError :errors="parkingStore.errors" field="general" />
      </div>

      <div class="border-t h-[1px] my-6"></div>

      <div class="flex gap-2">
        <button
          type="submit"
          class="btn btn-primary w-full"
          :disabled="parkingStore.loading"
        >
          <IconSpinner class="animate-spin" v-show="parkingStore.loading" />
          Arrive and Wait
        </button>
        <RouterLink :to="{ name: 'parkings.active' }" v-slot="{ navigate }">
          <button
            @click="navigate"
            :disabled="parkingStore.loading"
            class="btn btn-secondary"
          >
            Cancel
          </button>
        </RouterLink>
      </div>
    </div>
  </form>
</template>
