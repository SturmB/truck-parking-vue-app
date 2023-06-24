<script setup>
import { onBeforeUnmount, ref } from "vue";
import humanizeDuration from "humanize-duration";

const props = defineProps(["parking"]);
const time = ref(currentDuration());

function currentDuration() {
  const startTime = props.parking.is_waiting
    ? props.parking.arrived_at
    : props.parking.is_docked
      ? props.parking.docked_at
      : Date.now();

  return new Date(Date.now() - startTime * 1000).toISOString().slice(11, 19);
}

function updateCurrentDuration() {
  time.value = currentDuration();
}

function durationForHumans(seconds) {
  return humanizeDuration(seconds * 1000, {
    units: ["y", "mo", "w", "d", "h", "m", "s"],
    round: true,
    conjunction: " and "
  });
}

function dateTimeForHumans(timestamp) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "long",
  }).format(timestamp * 1000);
}

const ticker = setInterval(updateCurrentDuration, 1000);

onBeforeUnmount(() => clearInterval(ticker));

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
      ({{ parking.shed.capacity.toLocaleString() }} docking bays)
    </div>
    <div>
      <div class="font-bold uppercase">from</div>
      <span class="font-mono">{{ dateTimeForHumans(parking.arrived_at) }}</span>
    </div>
    <div v-show="parking.is_waiting">
      <div class="font-bold uppercase">waiting for</div>
      <span class="text-2xl font-bold text-blue-600">{{ time }}</span>
    </div>
    <div v-show="parking.is_docked">
      <div class="font-bold uppercase">waited for</div>
      <span class="font-mono">{{ durationForHumans(parking.wait_duration) }}</span>
      <div class="font-bold uppercase pt-1">docking for</div>
      <span class="text-2xl font-bold text-blue-600">{{ time }}</span>
    </div>
    <div class="flex gap-1 ml-auto">
      <button
        type="button"
        class="btn btn-primary uppercase"
        v-if="parking.is_waiting"
      >
        dock
      </button>
      <button
        type="button"
        class="btn btn-danger uppercase"
        v-if="parking.is_docked"
      >
        depart
      </button>
    </div>
  </div>
</template>
