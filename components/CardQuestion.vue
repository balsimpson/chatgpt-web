<template>
  <div
    class="w-full text-gray-800 border-b border-black/10 dark:border-gray-900/50 dark:text-gray-100 group dark:bg-[#333541]">
    <div class="flex gap-4 p-4 m-auto text-base md:gap-6 md:max-w-2xl lg:max-w-2xl xl:max-w-3xl md:py-6 lg:px-0">
      <div class="w-[30px] flex flex-col relative items-end">
        <div class="relative flex w-8 h-6 bg-white rounded"></div>
      </div>
      <div class="relative flex w-[calc(100%-50px)] md:flex-col lg:w-[calc(100%-115px)]">
        <div class="flex flex-col flex-grow gap-3">
          <div class="min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap">{{ question }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["question"])
</script>