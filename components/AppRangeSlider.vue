<template>
  <div class="py-6">
    <label
      class="flex items-center justify-between mb-2 text-xl font-medium text-white">
      <span>
        {{ title }}
        <span class="ml-3 rounded text-amber-500">{{ displayValue }}</span>
      </span>
      <div class="px-3 py-1 ml-3 text-xs italic font-light border rounded border-stone-700">Default: {{ defaultVal }}</div>
    </label>
    <div class="pb-3 text-xs tracking-wide text-white/30">{{ description }}</div>
    <input @change="emit('update', {displayValue, title})" v-model="displayValue" type="range" :min="min" :max="max"
      :step="step"
      class="w-full h-8 transition-colors rounded-full appearance-none cursor-pointer bg-zinc-700 active:bg-amber-500/30 hover:bg-amber-300/20" />
  </div>
</template>

<script setup>
const props = defineProps(["title", "value", "description", "min", "max", "step", "defaultVal"])
const emit = defineEmits(["update"])
const displayValue = ref(props.value)
</script>