<script setup>
import { onBeforeUnmount, ref } from "vue";
import humanizeDuration from "humanize-duration";

const props = defineProps(['parking']);
let waitTime = ref("");

function waitDuration() {
  waitTime.value = humanizeDuration(Date.now() - props.parking.arrived_at * 1000, {
    units: ['y', 'mo', 'w', 'd', 'h', 'm', 's'],
    round: true,
    conjunction: " and ",
  });
}

const ticker = setInterval(waitDuration, 1000);

onBeforeUnmount(() => clearInterval(ticker));

// @click="store.dock(props.parking)"
// @click="store.depart(props.parking)"
</script>

<template>
  <div class="flex flex-col p-2 border gap-1">
    <div class="plate text-2xl">{{ props.parking.vehicle.plate_number }}</div>
    <div class="text-sm text-gray-600">
      {{ props.parking.vehicle.description }}
    </div>
    <div class="bg-gray-100 p-2">
      {{ props.parking.shed.name }}
      ({{ props.parking.shed.capacity }} docking bays)
    </div>
    <div>
      <div class="font-bold uppercase">from</div>
      <span class="font-mono">{{ props.parking.arrived_at }}</span>
    </div>
    <div>
      <div class="font-bold uppercase">waiting for</div>
      <span class="text-2xl font-bold text-blue-600">{{ waitTime }}</span>
    </div>
    <div class="flex gap-1 ml-auto">
      <button
        type="button"
        class="btn btn-primary uppercase"
        v-if="!props.parking.docked_at"
      >
        dock
      </button>
      <button
        type="button"
        class="btn btn-danger uppercase"
        v-if="props.parking.docked_at && !props.parking.departed_at"
      >
        depart
      </button>
    </div>
  </div>
</template>
