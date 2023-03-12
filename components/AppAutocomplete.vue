<template>
  <div class="relative max-w-md z-80">
    <input @keyup="findOption($event)" v-model="optionInput" type="text"
      class="flex items-center w-full px-2 py-1 text-base font-normal border-2 text-zinc-300 placeholder-zinc-600 bg-zinc-800 border-zinc-700 focus:outline-none focus:border-indigo-500 focus-within:border-indigo-500"
      :placeholder="placeholder" :class="[isDefaultOptionsActive ? 'rounded-t' : 'rounded']" />
    <!-- add an icon on the right -->
    <div @click="showDefaultOptions" class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
      <svg class="w-5 h-5 text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          clip-rule="evenodd" />
      </svg>
    </div>
    <!-- add a dropdown -->
    <div v-if="isDefaultOptionsActive"
      class="absolute z-10 w-full overflow-y-scroll border-b border-l border-r divide-y rounded-b text-zinc-400 bg-zinc-800 border-zinc-700 divide-zinc-700 max-h-32">
      <div @click="selectOption(option)" v-for="option in filteredOptions"
        class="px-2 py-1 cursor-pointer hover:bg-zinc-600">
        {{ option.title }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["options", "placeholder", "val"]);
const emit = defineEmits(["select", "clear"]);
const options = computed(() => {
  return props.options || [];
});
const filteredOptions = ref([]);
const isDefaultOptionsActive = ref(false);
const selected = ref(null);
const optionInput = ref(props.val || "");

const findOption = (event) => {
  if (event.key == "Backspace") {
    emit("clear")
  }
  // console.log(event.key)
  const input = optionInput.value;
  if (input.length > 0) {
    isDefaultOptionsActive.value = true;
    filteredOptions.value = options.value.filter((option) => {
      return option.content.toLowerCase().includes(input.toLowerCase());
    });
  } else {
    filteredOptions.value = [];
    emit("clear");
  }
};

const selectOption = (option) => {
  selected.value = option;
  optionInput.value = option.title;
  if (isDefaultOptionsActive.value) {
    isDefaultOptionsActive.value = false;
  }
  filteredOptions.value = [];
  emit("select", selected.value);
};

const showDefaultOptions = () => {
  isDefaultOptionsActive.value = !isDefaultOptionsActive.value;
  filteredOptions.value = options.value;
};

// onMounted(() => {
//   console.log(props.val);
//   if (props.val) {
//     selectOption(props.val)
//   }
// })
</script>

<style></style>