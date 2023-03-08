<template>
  <div class="border rounded border-stone-600 text-stone-400">
    <div v-if="!isEditingPrompt" class="p-4">
      <div class="text-xl font-bold">{{ prompt.title }}</div>
      <p>{{ prompt.content }}</p>
    </div>
    <div v-else class="p-4">
      <input v-model="prompt.title" type="text"
        class="block w-full px-4 py-3 rounded-md focus:border-amber-500 focus:ring-amber-500 sm:p-4 bg-stone-900 border-stone-700 text-stone-400">
      <textarea v-model="prompt.content" rows="4"
        class="block w-full px-4 py-3 mt-2 rounded-md focus:border-amber-500 focus:ring-amber-500 sm:p-4 bg-stone-900 border-stone-700 text-stone-400">
                            </textarea>
    </div>

    <div class="flex justify-end p-2 px-4 border-t border-stone-600">
      <button v-if="!isEditingPrompt" @click.prevent="isEditingPrompt = !isEditingPrompt"
        class="flex items-center text-sm uppercase">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
          <path
            d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
          <path
            d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
        </svg>
      </button>
      
      <div v-else class="space-x-3">

        <button @click.prevent="emit('delete',
          {
            title: prompt.title,
            content: prompt.content,
            index: index
          }) ; isEditingPrompt = false">Delete</button>

        <button @click.prevent="emit('update',
          {
            title: prompt.title,
            content: prompt.content,
            index: index
          }); isEditingPrompt = false">Save</button>
      </div>


    </div>
  </div>
</template>

<script setup>
defineProps(["prompt", "index"])
const emit = defineEmits(["update", 'delete'])
const isEditingPrompt = ref(false)
</script>