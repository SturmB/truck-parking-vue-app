<script setup>
import { onBeforeUnmount, watchEffect } from "vue";
import { useParking } from "@/stores/parking";
import { useRoute } from "vue-router";

const store = useParking();
const route = useRoute();

watchEffect(async () => {
  store.getParking({ id: route.params.id });
});

onBeforeUnmount(store.resetParkingDetails);
</script>

<template>
  <div
    class="flex flex-col mx-auto md:w-96 w-full"
    v-if="store.parking.id !== undefined"
  >
    <h1 class="text-2xl font-bold mb-4 text-center">Parking order details</h1>

    <div class="border p-2 font-mono">
      <div class="font-bold uppercase mb-4">
        parking order #{{ store.parking.id }}
      </div>

      <div class="font-bold uppercase">license plate</div>
      <div class="plate text-2xl">{{ store.parking.vehicle.plate_number }}</div>

      <div class="font-bold uppercase">description</div>
      <div>{{ store.parking.vehicle.description }}</div>

      <div class="font-bold uppercase">shed</div>
      <div>{{ store.parking.shed.name }}</div>

      <div class="font-bold uppercase">capacity</div>
      <div>
        {{ store.parking.shed.capacity }} docking bays
      </div>

      <div class="font-bold uppercase">from</div>
      <div>{{ store.parking.arrived_at }}</div>

      <div class="font-bold uppercase">to</div>
      <div>{{ store.parking.departed_at }}</div>

      <div class="font-bold uppercase">wait duration</div>
      <div>
        {{ store.parking.wait_duration }} seconds waiting
      </div>

      <div class="border-t h-[1px] my-6"></div>

      <RouterLink
        :to="{ name: 'parkings.history' }"
        class="btn btn-secondary uppercase"
      >
        return
      </RouterLink>
    </div>
  </div>
</template>
