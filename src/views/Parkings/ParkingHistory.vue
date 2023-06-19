<script setup>
import { useParking } from "@/stores/parking";
// import humanizeDuration from "humanize-duration";

const store = useParking();

store.getParkingHistory();
</script>

<template>
  <div class="flex flex-col mx-auto md:w-96 w-full">
    <h1 class="text-2xl font-bold mb-4 text-center">Parking history</h1>

    <div class="flex flex-col gap-1">
      <div
        v-for="parking in store.stoppedParkings"
        :key="parking.id"
        class="flex flex-col p-2 border gap-1"
      >
        <div class="plate text-2xl">{{ parking.vehicle.plate_number }}</div>
        <div class="bg-gray-100 p-2">
          {{ parking.shed.name }}
          ({{ parking.shed.capacity }} docking bays)
        </div>
        <div>
          <div class="font-bold uppercase">from</div>
          <span class="font-mono">{{ parking.arrived_at }}</span>
        </div>
        <div>
          <div class="font-bold uppercase">to</div>
          <span class="font-mono">{{ parking.departed_at }}</span>
        </div>
<!--        <div class="flex items-top">
          <span class="text-2xl font-bold text-blue-600">{{ humanizeDuration(parking.wait_duration * 1000, {
            units: ['y', 'mo', 'w', 'd', 'h', 'm'],
            round: true,
            conjunction: " and ",
          }) }}</span>
          <span class="pt-0.5">&nbsp;seconds waiting</span>
        </div>-->
        <RouterLink
          :to="{ name: 'parkings.show', params: { id: parking.id } }"
          class="btn btn-secondary uppercase"
        >
          view details
        </RouterLink>
      </div>
    </div>
  </div>
</template>
