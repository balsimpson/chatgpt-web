<template>
  <div class="flex flex-wrap">
    <div class="w-full ">
      <ul class="flex flex-row flex-wrap pt-3 pb-0 mb-0 list-none border-b-4 border-zinc-700">
        <li class="mr-2 -mb-px text-center cursor-pointer last:mr-0">
          <a class="block px-5 py-3 text-xs font-bold leading-normal uppercase rounded-t shadow-lg" @click="toggleTabs(1)"
            :class="{ 'text-zinc-700 bg-white': openTab !== 1, 'text-white bg-zinc-700': openTab === 1 }">
            <i class="mr-1 text-base fas fa-space-shuttle"></i> Settings
          </a>
        </li>
        <li class="mr-2 -mb-px text-center cursor-pointer last:mr-0">
          <a class="block px-5 py-3 text-xs font-bold leading-normal uppercase rounded-t shadow-lg" @click="toggleTabs(2)"
            :class="{ 'text-zinc-700 bg-white': openTab !== 2, 'text-white bg-zinc-700': openTab === 2 }">
            <i class="mr-1 text-base fas fa-cog"></i> Prompts
          </a>
        </li>

      </ul>
      <div class="relative flex flex-col w-full min-w-0 break-words rounded shadow-lg bg-zinc-800">
        <div class="flex-auto px-4 py-5">
          <div class="tab-content tab-space">
            <div :class="{ 'hidden': openTab !== 1, 'block': openTab === 1 }">
              <slot name="tab1"></slot>
            </div>
            <div :class="{ 'hidden': openTab !== 2, 'block': openTab === 2 }">
              <slot name="tab2"></slot>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
const openTab = ref(1)

const toggleTabs = (tabNumber) => {
  openTab.value = tabNumber
}

</script>