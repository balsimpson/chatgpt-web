<template>
  <div class="w-full max-w-2xl px-4 pb-12 mx-auto">
    <AppTabs>
      <template #tab1>
        <div class="p-5 border rounded text-stone-400 border-zinc-600">
          <div class="text-xl font-bold">Adjust model parameters</div>
          <div>All changes are automatically saved to
            <pre class="inline">localStorage</pre>.
          </div>
        </div>
        <form class="px-4 mt-12 space-y-3">
          <div class="flex flex-col justify-between w-full sm:flex-row sm:gap-x-4 gap-y-4">
            <div v-if="selectedModel" class="w-full mb-4 sm:w-1/2 sm:mb-8 shrink-0">
              <label for="hs-feedback-post-comment-name-1" class="block mb-2 text-xl font-medium text-white">AI
                Model</label>
              <select @change="updateSettings({ displayValue: selectedModel, title: 'Model' })" v-model="selectedModel"
                class="w-full px-3 py-4 rounded bg-stone-900 text-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-600">
                <option v-for="model in models" :key="model" :value="model">{{ model }}</option>
              </select>
              <div class="pt-3 text-xs tracking-wide text-white/30">Currently only one chat model available</div>
            </div>

            <div v-if="maxTokens" class="w-full mb-4 sm:mb-8">
              <label for="hs-feedback-post-comment-name-1" class="block mb-2 text-xl font-medium text-white">Max
                Tokens</label>
              <input @change="updateSettings({ displayValue: maxTokens, title: 'Max Tokens' })" type="number"
                class="block w-full px-4 py-3 text-sm rounded-md focus:border-amber-500 focus:ring-amber-500 sm:p-4 bg-stone-900 border-stone-700 text-stone-400"
                placeholder="256" v-model="maxTokens">
              <div class="pt-3 text-xs tracking-wide text-white/30">The maximum number of tokens to generate in the
                completion. The token count of your prompt plus this parameter cannot exceed the models context length.
                Max is 2048 tokens.</div>
            </div>
          </div>

          <div class="divide-y-2 divide-stone-700">
            <AppRangeSlider v-if="temperature" @update="updateSettings" title="Temperature"
              description="Higher values means the model will take more risks. Try 0.9 for more creative applications, and 0 for ones with a well-defined answer. We generally recommend altering this or Top P, but not both."
              :value="temperature" min="0" max="1" step="0.1" defaultVal="0.7"
              class="first:border-t border-stone-700" />

            <AppRangeSlider v-if="top_p" title="Top P" @update="updateSettings"
              description="An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered. We generally recommend altering this or temperature but not both."
              :value="top_p" min="0" max="1" step="0.1" defaultVal="1" class="odd:bg-zinc-800" />

            <AppRangeSlider v-if="frequency_penalty !== null" @update="updateSettings" title="Frequency Penalty"
              description="Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line."
              :value="frequency_penalty" min="-2" max="2" step="0.5" defaultVal="0" />

            <AppRangeSlider v-if="presence_penalty !== null" @update="updateSettings" title="Presence Penalty"
              description="Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics."
              :value="presence_penalty" min="-2" max="2" step="0.5" defaultVal="0" />
          </div>

        </form>
      </template>

      <template #tab2>
        <div class="flex items-center justify-between w-full text-stone-400">
          <div><span>{{ filteredPrompts.length }}</span> Prompts</div>
          <button @click.prevent="isAddPrompt = !isAddPrompt">New Prompt</button>
        </div>
        <div v-if="isAddPrompt" class="mt-6 mb-4 space-y-2">
          <div>
            <label for="hs-feedback-post-comment-name-1" class="block mb-2 font-medium text-white">Name</label>
            <input v-model="newPromptTitle" type="text"
              class="block w-full px-4 py-3 text-sm rounded-md focus:border-amber-500 focus:ring-amber-500 sm:p-4 bg-stone-900 border-stone-700 text-stone-400">

          </div>
          <div>
            <label for="hs-feedback-post-comment-name-1" class="block mb-2 font-medium text-white">Prompt</label>
            <textarea v-model="newPromptContent" rows="4"
              class="block w-full px-4 py-3 text-sm rounded-md focus:border-amber-500 focus:ring-amber-500 sm:p-4 bg-stone-900 border-stone-700 text-stone-400">
                    </textarea>
          </div>

          <button @click.prevent="addPrompt" class="px-3 py-1 text-sm border rounded text-stone-400">Add prompt</button>
        </div>

        <div class="mt-6 space-y-3">

          <div>

            <input v-model="searchTerm" @keyup="searchPrompts" type="text" placeholder="search prompts"
              class="block w-full px-4 py-3 text-sm rounded-md placeholder-stone-600 focus:border-amber-500 focus:ring-amber-500 focus:outline-none focus:ring-2 sm:p-4 bg-stone-900 border-stone-700 text-stone-400">

          </div>
          <PromptCard @update="savePrompt" @delete="deletePrompt" v-for="(prompt, index) in filteredPrompts"
            :prompt="prompt" :index="index" />
        </div>
      </template>
    </AppTabs>

  </div>
</template>

<script setup>
import prompts from "~/assets/prompts.json"

const filteredPrompts = ref([])
const searchTerm = ref("")
const isAddPrompt = ref(false)
const isEditingPrompt = ref(false)
const totalTokens = ref()

const models = [
  'gpt-3.5-turbo',
  // 'text-davinci-003',
  // 'text-curie-001',
  // 'text-babbage-001',
  // 'text-gPT-3',
  // 'text-prompt-002'
]

const selectedModel = ref(null)
const maxTokens = ref(null)
const temperature = ref(null)
const top_p = ref(null)
const frequency_penalty = ref(null)
const presence_penalty = ref(null)

const newPromptTitle = ref("")
const newPromptContent = ref("")

const updateSettings = (event) => {
  const title = event.title
  const newValue = event.displayValue
  switch (title) {
    case 'Temperature':
      localStorage.setItem('gpt3-temperature', JSON.stringify(newValue))
      break;
    case 'Top P':
      localStorage.setItem('gpt3-top_p', JSON.stringify(newValue))
      break;
    case 'Frequency Penalty':
      localStorage.setItem('gpt3-frequency_penalty', JSON.stringify(newValue))
      break;
    case 'Presence Penalty':
      localStorage.setItem('gpt3-presence_penalty', JSON.stringify(newValue))
      break;
    case 'Model':
      localStorage.setItem('gpt3-model', JSON.stringify(newValue))
      break;
    case 'Max Tokens':
      localStorage.setItem('gpt3-max_tokens', JSON.stringify(newValue))
      break;

    default:
      break;
  }
}

const searchPrompts = () => {
  let searchByContent = fuzzy(prompts, 'content')
  filteredPrompts.value = searchByContent(searchTerm.value)
}

const addPrompt = () => {
  if (newPromptTitle.value && newPromptContent.value) {
    let prompt = {
      title: newPromptTitle.value,
      content: newPromptContent.value
    }

    filteredPrompts.value.unshift(prompt)
    localStorage.setItem('gpt3-prompts', JSON.stringify(filteredPrompts.value))
  }
}

const savePrompt = (event) => {
  filteredPrompts.value[event.index] = {
    title: event.title,
    content: event.content
  }
  localStorage.setItem('gpt3-prompts', JSON.stringify(filteredPrompts.value))
}

const deletePrompt = (event) => {
  filteredPrompts.value = filteredPrompts.value.filter((prompt, index) => index !== event.index)
  // console.log((event))
  localStorage.setItem('gpt3-prompts', JSON.stringify(filteredPrompts.value))
}

onMounted(async () => {

  // check if there is localStorage version of the prompts
  let savedPrompts = await JSON.parse(localStorage.getItem('gpt3-prompts'))
  if (savedPrompts) {
    filteredPrompts.value = savedPrompts
  } else {
    localStorage.setItem('gpt3-prompts', JSON.stringify(prompts))
    filteredPrompts.value = prompts
  }

  selectedModel.value = await JSON.parse(localStorage.getItem('gpt3-model')) || 'gpt-3.5-turbo';
  maxTokens.value = await JSON.parse(localStorage.getItem('gpt3-max_tokens')) || 256;
  temperature.value = await JSON.parse(localStorage.getItem('gpt3-temperature')) || 0.5;
  top_p.value = await JSON.parse(localStorage.getItem('gpt3-top_p'));
  frequency_penalty.value = await JSON.parse(localStorage.getItem('gpt3-frequency_penalty')) || 0
  presence_penalty.value = await JSON.parse(localStorage.getItem('gpt3-presence_penalty')) || 0

  totalTokens.value = JSON.parse(localStorage.getItem("gpt3-total_tokens")) || 0
})
</script>


<style>
input[type="range"]::-webkit-slider-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #999999;
  height: 40px;
  width: 40px;
  border-radius: 50px;
  background: #e4b107;
  cursor: pointer;
  -webkit-appearance: none;
}

input[type="range"]::-moz-range-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #999999;
  height: 40px;
  width: 40px;
  border-radius: 50px;
  background: #e4b107;
  cursor: pointer;
}
</style>