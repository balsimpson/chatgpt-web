<template>
  <div class="flex flex-col h-screen w-full bg-[#333541] relative">
    <nav class="flex items-end justify-between w-full max-w-4xl px-8 py-6 mx-auto">
      <NuxtLink to="/" class="text-xl font-bold text-stone-400">My<span class="text-amber-500">GPT</span></NuxtLink>

      <div class="flex items-end space-x-6">
        <div class="text-right text-zinc-400">
          <div class="text-xs font-semibold">{{ totalTokens }}</div>
          <div class="text-xs text-zinc-500">tokens used</div>
        </div>
        <NuxtLink to="/settings" id="settings"
          class="text-white transition-opacity opacity-50 cursor-pointer hover:opacity-100 target:bg-amber-500"><svg
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>

        </NuxtLink>
      </div>
    </nav>
    <!-- <div class="flex items-center justify-between w-full px-6 pb-6 mx-auto space-x-2 bg-[#212123] sm:hidden">
      <AppAutocomplete @select="setPersona" @clear="isPersonaActivated = false" class="w-full" :options="prompts"
        placeholder="choose persona" />
      <button @click="startChat" :class="[isPersonaActivated ? 'opacity-100' : 'opacity-30 pointer-events-none']"
        class="px-2 py-1 rounded shrink-0 bg-amber-500">Start chat</button>
    </div> -->

    <!-- <highlightjs language="js" code="console.log('Hello World');" /> -->

    <div ref="chatContainer" id="container" class="flex-grow flex  overflow-y-auto bg-[#333541] h-full flex-col">
      <AppCard v-if="messages.length" v-for="message in messages" :text="message.content" :sender="message.role"
        :class="[message.role == 'system' ? 'first:hidden' : '']" />

      <div v-else class="flex flex-col items-center justify-center w-full h-full px-4">
        <div class="py-3 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            aria-hidden="true" class="w-10 h-10">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"></path>
          </svg>
        </div>
        <div class="mb-3 text-2xl font-semibold text-center text-gray-100 sm:text-4xl">Choose a persona</div>
        <p class="max-w-md mb-6 text-sm text-center text-gray-400">Give ChatGPT a persona like Travel Guide or Adevrtising
          Agency for a richer conversation and better results.</p>
        <AppAutocomplete @select="setPersona" @clear="isPersonaActivated = false" class="w-full max-w-md"
          :options="prompts" placeholder="choose persona" />
        <button @click="startChat"
          :class="[isPersonaActivated ? 'opacity-100' : 'opacity-30 pointer-events-none', isActivatingPersona ? 'pointer-events-none animate-pulse' : '']"
          class="px-6 py-1 mt-3 font-semibold tracking-wide transition-colors rounded shrink-0 bg-zinc-400 hover:bg-zinc-100">{{
            startChatBtnTxt }}</button>
        <!-- <div class="max-w-2xl mx-auto max-h-[270px] overflow-y-scroll">
          <div class="grid gap-3 sm:grid-cols-2">
            <button v-for="prompt in prompts" class="w-full p-3 text-gray-200 rounded-md bg-gray-50 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-gray-900">{{prompt.title}}</button>
            
          </div>
        </div> -->
      </div>
    </div>

    <div
      class="w-full md:border-t-0 border-white/20 md:border-transparent md:bg-vert-light-gradient bg-[#333541] md:bg-vert-dark-gradient">
      <div v-if="isShowingUsage" class="flex items-center justify-center pt-2 space-x-4 text-xs uppercase text-zinc-400">
        <div>Prompt <span class="font-bold text-white">{{ usage.prompt_tokens }}</span></div>
        <div>Completion <span class="font-bold text-white">{{ usage.completion_tokens }}</span></div>
        <div>Total <span class="font-bold text-white">{{ usage.total_tokens }}</span></div>
      </div>
      <div v-else
        class="flex items-center justify-between max-w-xl px-8 pt-2 mx-auto text-xs text-gray-400 uppercase lg:max-w-3xl">
        <button v-if="messages.length" @click.prevent="clearChat" class="uppercase transition hover:text-gray-200">Clear
          chat</button>
        <a v-if="messages.length" :href="chatDownloadURL" download="myChat.txt"
          class="flex items-center px-2 py-1 transition-colors rounded active:bg-gray-900 hover:bg-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
            <path fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z"
              clip-rule="evenodd" />
          </svg>

          <span class="ml-1">Save Chat</span></a>

      </div>
      <form id="question"
        class="flex flex-row gap-3 px-6 pt-1 pb-3 mx-2 stretch last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl">
        <div class="relative flex flex-1 h-full md:flex-col">

          <div
            class="flex flex-col w-full pb-2 flex-grow py-3  relative border border-gray-900/50 text-white bg-[#40414f] rounded-md shadow-[0_0_15px_rgba(0,0,0,0.10)]">

            <textarea @keyup.enter.prevent="getCompletion" @input="adjustTextareaHeight" ref="textarea" tabindex="0"
              rows="1" placeholder=""
              class="w-full p-0 pl-2 m-0 bg-transparent border-0 resize-none pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent focus:outline-none"
              v-model="inputText"></textarea>

            <button @click.prevent="getCompletion"
              class="absolute p-1 rounded-md text-gray-500 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20"
                class="w-4 h-4 rotate-90" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z">
                </path>
              </svg>
            </button>
          </div>
        </div>
      </form>

    </div>

    <div v-if="!isValidAPIKey"
      class="absolute inset-0 z-10 flex items-center justify-center w-full h-full p-6 bg-black/80"
      :class="[isValidAPIKey ? 'visible' : 'hidden']">
      <div class="z-20 max-w-md p-4 border rounded-lg shadow text-zinc-100 bg-zinc-800 border-zinc-600">
        <div class="flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6 text-red-600">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>

          <span class="pl-3 text-xl font-semibold">OpenAI API key is missing!</span>
        </div>
        <p class="mt-3 text-sm text-zinc-400">Add the OpenAI key to your environment variables on Vercel. Get your OpenAI
          key <a href="https://platform.openai.com/account/api-keys" target="_blank" class="text-teal-500">here</a>.</p>
      </div>
    </div>

  </div>
</template>

<script setup>
// import {SSE} from "sse"
import prompts from "~/assets/prompts.json"
const textarea = ref()
const inputText = ref('');
const completion = ref('');

const isPersonaActivated = ref(false)
const isActivatingPersona = ref(false)
const currentPersona = ref()
const isSearching = ref(false)
const isMenuShowing = ref(false)
const isShowingUsage = ref(false)
const chatContainer = ref(null);
const chatDownloadURL = ref("")
const messages = ref([])
const usage = ref()

const startChatBtnTxt = ref('Start chat')
const isValidAPIKey = ref(false)

const totalTokens = ref()

useHead({
  title: "MyGPT",
  meta: [
    {
      name: "description",
      content: "ChatGPT with quick select personas and chat download functionality.",
    },
    {
      property: "og:title",
      content: "MyGPT",
    },
    {
      property: "og:description",
      content: "ChatGPT with quick select personas and chat download functionality.",
    },
    {
      property: "og:image",
      content: "",
    },
    {
      property: "og:url",
      content: "https://pullonath.in/",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "MyGPT",
    },
    {
      name: "twitter:description",
      content: "ChatGPT with quick select personas and chat download functionality.",
    },
    {
      name: "twitter:image",
      content: "",
    },
  ],
});

const getCompletion = async (event) => {

  let max_tokens = localStorage.getItem("gpt3-max_tokens") || 256
  let temperature = localStorage.getItem("gpt3-temperature") || 0.7
  let frequency_penalty = localStorage.getItem("gpt3-frequency_penalty") || 0
  let presence_penalty = localStorage.getItem("gpt3-presence_penalty") || 0

  if (event.code == "Enter" || event.type == "click") {
    textarea.value.style.height = 24 + 'px';
    const msg = {
      "role": "user",
      "content": inputText.value,
      // "date": Date.now()
    }
    inputText.value = ""
    messages.value.push(msg)

    let { data } = await useFetch(`/api/openai`, {
      method: "POST",
      body: JSON.stringify({
        messages: messages.value,
        options: { max_tokens, temperature, frequency_penalty, presence_penalty }
      })
    })

    if (data.value.error) {
      console.log("No Api key")
    } else {

      // console.log("result", data.value)

      const res = {
        "role": "assistant",
        "content": data.value.message.content.trim(),
        // "date": Date.now()
      }
      // console.log(res)
      messages.value.push(res)
      saveChat()
      showUsage(data.value.usage)
      localStorage.setItem('gpt3-chat_current', JSON.stringify(messages.value))
    }

  } else {
    console.log(event)
  }

}

const showUsage = (val) => {
  usage.value = val
  isShowingUsage.value = true
  setTimeout(() => {
    isShowingUsage.value = false
  }, 7000)

  incrementTokenCount(usage.value.total_tokens)
}

const saveChat = () => {

  let txt = ""

  for (let i = 0; i < messages.value.length; i++) {
    // console.log((messages))
    txt += messages.value[i].role + ": " + messages.value[i].content + "\n"
  }

  let myBlob = new Blob([txt], { type: "text/plain" });
  chatDownloadURL.value = window.URL.createObjectURL(myBlob);
}

const clearChat = () => {
  messages.value = []
  isPersonaActivated.value = false;
  currentPersona.value = null;
  localStorage.removeItem('gpt3-chat_current')
}

const incrementTokenCount = (tokensUsed) => {
  let totalTokens = JSON.parse(localStorage.getItem('gpt3-total_tokens')) || 0
  totalTokens = totalTokens + tokensUsed
  localStorage.setItem("gpt3-total_tokens", totalTokens)
}

function scrollToBottom() {
  // chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  let duration = 300 // Or however many milliseconds you want to scroll to last
  animateScroll(duration);
}

// First, define a helper function.
function animateScroll(duration) {
  let start = chatContainer.value.scrollTop;
  let end = chatContainer.value.scrollHeight;
  let change = end - start;
  let increment = 20;
  function easeInOut(currentTime, start, change, duration) {
    // by Robert Penner
    currentTime /= duration / 2;
    if (currentTime < 1) {
      return change / 2 * currentTime * currentTime + start;
    }
    currentTime -= 1;
    return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
  }
  function animate(elapsedTime) {
    elapsedTime += increment;
    let position = easeInOut(elapsedTime, start, change, duration);
    chatContainer.value.scrollTop = position;
    if (elapsedTime < duration) {
      setTimeout(function () {
        animate(elapsedTime);
      }, increment)
    }
  }
  animate(0);
}

const setPersona = (persona) => {
  // console.log('persona', persona)
  isPersonaActivated.value = true;
  currentPersona.value = persona;
}

const startChat = async () => {
  isActivatingPersona.value = true
  startChatBtnTxt.value = "Starting..."
  let max_tokens = localStorage.getItem("gpt3-max_tokens") || 256
  let temperature = localStorage.getItem("gpt3-temperature") || 0.7
  let frequency_penalty = localStorage.getItem("gpt3-frequency_penalty") || 0
  let presence_penalty = localStorage.getItem("gpt3-presence_penalty") || 0

  const msg = {
    "role": "system",
    "content": currentPersona.value.content,
  }


  let { data } = await useFetch(`/api/openai`, {
    method: "POST",
    body: JSON.stringify({
      messages: [msg],
      options: { max_tokens, temperature, frequency_penalty, presence_penalty }
    })
  })

  startChatBtnTxt.value = 'Start chat'
  isActivatingPersona.value = false

  const res = {
    "role": "assistant",
    "content": data.value.message.content.trim(),
  }

  messages.value.push(msg)
  messages.value.push(res)
  saveChat()
  showUsage(data.value.usage)
  localStorage.setItem('gpt3-chat_current', JSON.stringify(messages.value))
}

onMounted(() => {
  totalTokens.value = JSON.parse(localStorage.getItem("gpt3-total_tokens")) || 0

  const env = useRuntimeConfig()
  if (!env.public?.OPENAI_KEY) {
    console.log("No Api key", env)
    isValidAPIKey.value = false;
  }

  isValidAPIKey.value = true;
  // localStorage.setItem("gpt3-total_tokens", 0)
  messages.value = JSON.parse((localStorage.getItem("gpt3-chat_current"))) || []
  saveChat()
  // Create an observer and pass it a callback.
  let observer = new MutationObserver(scrollToBottom);
  // Tell it to look for new children that will change the height.
  let config = { childList: true };
  observer.observe(chatContainer.value, config);
})

function adjustTextareaHeight(event) {

  if (inputText.value.length > 0 && event.code != "Enter") {
    // console.log("input", event)
    textarea.value.style.height = 'auto';
    textarea.value.style.height = textarea.value.scrollHeight + 'px';
  } else {
    // console.log("else", event)
    textarea.value.style.height = 30 + 'px';
  }
  // if (event.inputType !== "insertLineBreak") {
  // } else {
  // }
}
</script>

<style>
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .3s ease;
}

#container> :first-child {
  margin-left: auto;
}

/* */
</style>
