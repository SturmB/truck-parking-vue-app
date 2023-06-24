<script setup>
import { onBeforeUnmount, ref } from "vue";
import humanizeDuration from "humanize-duration";

const props = defineProps(['parking']);
const waitTime = ref("");
const dockTime = ref("");

function waitDuration() {
  waitTime.value = humanizeDuration(Date.now() - props.parking.arrived_at * 1000, {
    units: ['y', 'mo', 'w', 'd', 'h', 'm', 's'],
    round: true,
    conjunction: " and ",
  });
}

function dockDuration() {
  dockTime.value = humanizeDuration(Date.now() - props.parking.docked_at * 1000, {
    units: ['y', 'mo', 'w', 'd', 'h', 'm', 's'],
    round: true,
    conjunction: " and ",
  });
}

function durationForHumans(seconds) {
  return humanizeDuration(seconds * 1000, {
    units: ['y', 'mo', 'w', 'd', 'h', 'm', 's'],
    round: true,
    conjunction: " and ",
  });
}

const waitTicker = setInterval(waitDuration, 1000);
const dockTicker = setInterval(dockDuration, 1000);

onBeforeUnmount(() => clearInterval(waitTicker));
onBeforeUnmount(() => clearInterval(dockTicker));

// @click="store.dock(parking)"
// @click="store.depart(parking)"
</script>

<template>
  <div class="flex flex-col p-2 border gap-1">
    <div class="plate text-2xl">{{ parking.vehicle.plate_number }}</div>
    <div class="text-sm text-gray-600">
      {{ parking.vehicle.description }}
    </div>
    <div class="bg-gray-100 p-2">
      {{ parking.shed.name }}
      ({{ parking.shed.capacity }} docking bays)
    </div>
    <div>
      <div class="font-bold uppercase">from</div>
      <span class="font-mono">{{ parking.arrived_at }}</span>
    </div>
    <div v-show="parking.is_waiting">
      <div class="font-bold uppercase">waiting for</div>
      <span class="text-2xl font-bold text-blue-600">{{ waitTime }}</span>
    </div>
    <div v-show="parking.is_docked">
      <div class="font-bold uppercase">waited for</div>
      <span class="font-mono">{{ durationForHumans(parking.wait_duration) }}</span>
      <div class="font-bold uppercase pt-1">docking for</div>
      <span class="text-2xl font-bold text-blue-600">{{ dockTime }}</span>
    </div>
    <div class="flex gap-1 ml-auto">
      <button
        type="button"
        class="btn btn-primary uppercase"
        v-if="!parking.docked_at"
      >
        dock
      </button>
      <button
        type="button"
        class="btn btn-danger uppercase"
        v-if="parking.docked_at && !parking.departed_at"
      >
        depart
      </button>
    </div>
  </div>
</template>
