<script setup>
import { onBeforeUnmount } from "vue";
import { useParking } from "@/stores/parking";
import ParkingEntry from "@/components/ParkingEntry.vue";

const store = useParking();

store.getActiveParkings();

function poll(callback) {
  return setInterval(callback, 60_000);
}

const interval = poll(store.getActiveParkings);

onBeforeUnmount(() => clearInterval(interval));
</script>

<template>
  <div class="flex flex-col mx-auto md:w-96 w-full">
    <h1 class="text-2xl font-bold mb-4 text-center">Active parkings</h1>

    <RouterLink
      :to="{ name: 'parkings.create' }"
      class="btn btn-primary w-full"
    >
      New Arrival
    </RouterLink>

    <div class="border-t h-[1px] my-6"></div>

    <div class="flex flex-col gap-1">
      <ParkingEntry
        v-for="parking in store.parkings"
        :key="parking.id"
        :parking="parking"
        @dock="store.dock(parking)"
        @depart="store.depart(parking)"
      />
    </div>
  </div>
</template>
