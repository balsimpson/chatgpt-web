<template>
  <div class="flex flex-col flex-grow h-full w-full bg-[#333541] relative">
    <div ref="chatContainer" id="container"
      class="flex-grow flex  overflow-y-scroll bg-[#333541] h-[calc(100vh_-_200px)] flex-col">
      <AppCard v-if="messages.length" v-for="message in messages" :content="message.content" :sender="message.role"
        :class="[message.role == 'system' ? 'first:hidden' : '']" />

      <div v-else class="flex flex-col items-center justify-center w-full h-full px-4 pt-12">
        <div class="py-3 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            aria-hidden="true" class="w-10 h-10">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"></path>
          </svg>
        </div>
        <div class="mb-3 text-2xl font-semibold text-center text-gray-100 sm:text-4xl">Choose a <span
            class="text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-indigo-300/30 to-indigo-700">persona</span>
        </div>

        <p class="max-w-md mb-6 text-sm text-center text-gray-400">Give ChatGPT a persona like <br> Travel Guide or
          Adevrtising
          Agency <br> for a richer conversation and better results.</p>
        <AppAutocomplete @select="setPersona" @clear="isPersonaActivated = false" class="w-full max-w-md"
          :options="savedPrompts" placeholder="choose persona" />
        <button @click="startChat(currentPersona)" :disabled="!isPersonaActivated"
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

    <div class="w-full md:border-t-0 border-white/20 md:border-transparent bg-[#333541]">
      <div v-if="isShowingUsage" class="flex items-center justify-center pt-2 space-x-4 text-xs uppercase text-zinc-400">
        <div>Prompt <span class="font-bold text-white">{{ usage.prompt_tokens }}</span></div>
        <div>Completion <span class="font-bold text-white">{{ usage.completion_tokens }}</span></div>
        <div>Total <span class="font-bold text-white">{{ usage.total_tokens }}</span></div>
      </div>
      <div v-else class="flex justify-center max-w-xl px-8 pt-2 mx-auto text-xs text-gray-400 lg:max-w-3xl">
        <div v-if="errorMsg"
          class="inline-flex items-center justify-center px-3 py-1 text-center border border-red-500 rounded bg-red-300/20">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <span class="ml-3">{{ errorMsg }}</span>
        </div>
        <div v-else-if="messages.length" class="flex items-center justify-between w-full">
          <div class="flex space-x-4">
            <button @click.prevent="clearChat" class="uppercase transition hover:text-gray-200">Clear
              chat</button>
            <a :href="chatDownloadURL" download="myChat.txt"
              class="flex items-center px-2 py-1 transition-colors rounded active:bg-gray-900 hover:bg-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z"
                  clip-rule="evenodd" />
              </svg>

              <span class="ml-1 uppercase">Save Chat</span></a>
          </div>

          <div class="flex">
            <span class="mr-2">Dall.E</span>
            <ToggleSwitch @toggled="isDalleOn = !isDalleOn"/>
          </div>
        </div>

      </div>

      <form id="question"
        class="flex flex-row gap-3 px-6 pt-1 pb-3 mx-2 stretch last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl">
        <div class="relative flex flex-1 h-full md:flex-col">

          <div
            class="flex flex-col w-full pb-2 flex-grow py-3  relative border border-gray-900/50 text-white bg-[#40414f] rounded-md shadow-[0_0_15px_rgba(0,0,0,0.10)]">

            <textarea @keydown.enter.prevent="getImage" @input="adjustTextareaHeight" ref="textarea" tabindex="0" rows="1"
              placeholder=""
              class="w-full p-0 pl-2 m-0 bg-transparent border-0 resize-none pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent focus:outline-none"
              v-model="inputText"></textarea>

            <button @click.prevent="getCompletion"
              class="absolute p-1 rounded-md text-gray-500 right-1 md:bottom-2.5 md:right-2  hover:text-gray-400 hover:bg-gray-900  disabled:hover:bg-transparent">

              <svg v-if="isDalleOn" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-4 h-4 mr-1">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
              </svg>

              <svg v-else stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
                stroke-linejoin="round" class="w-4 h-4 mr-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
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
import prompts from "~/assets/prompts.json"
import { Configuration, OpenAIApi } from "openai"
// @ts-ignore
// import sse from "sse"

const savedPrompts = ref([])
const textarea = ref()
const inputText = ref('')
const completion = ref('')
const errorMsg = ref("")

const isDalleOn = ref(false)
const isPersonaActivated = ref(false)
const isActivatingPersona = ref(false)
const currentPersona = ref(null)
const selectedPersonaTitle = ref("")
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
const displayTokenCount = ref("")
const route = useRoute()

useHead({
  title: "MyGPT",
  meta: [
    {
      name: "description",
      content: "Get better results and richer conversations with quick prompts like Travel Guide and Virtual Doctor .",
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
      content: "https://chattygpt.vercel.app/site_image.png",
    },
    {
      property: "og:url",
      content: "https://chattygpt.vercel.app/",
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
      content: "https://chattygpt.vercel.app/site_image.png",
    },
  ],
});

const getImage = async () => {
  let { data } = await useFetch(`/api/image`, {
    method: "POST",
    body: JSON.stringify({
      prompt: inputText.value,
    })
  })

  console.log("image", data.value);

  const msg = {
    "role": "dall.e",
    "content": `${data.value.url}::${data.value.prompt}`
  }

  messages.value.push(msg)
}

const getCompletion = async (event) => {
  if (inputText.value.length < 2) {
    return
  }

  // check if there is a URL in text and is parsable
  let txt = inputText.value
  // let txt = await replaceUrlsWithText(inputText.value)
  // // if not parsable, return error message
  // if (txt.error) {
  //   console.log("error parsing URL")
  //   return
  // }

  // check if token count exceeds 1000
  let { tokens } = await getTokenCount(txt)

  if (tokens > 1000) {
    // show error message
    errorMsg.value = `The conversation is ${tokens} tokens and exceeds the limit!`

    setTimeout(() => {
      errorMsg.value = ""
    }, 4000);

    return
  }

  const { max_tokens, temperature, frequency_penalty, presence_penalty } = getFromLocalStorage()

  if (event.code == "Enter" || event.type == "click") {
    textarea.value.style.height = 22 + 'px';
    const msg = {
      "role": "user",
      "content": txt,
      // "content": inputText.value,
    }
    inputText.value = ""
    messages.value.push(msg)

    let { data } = await useFetch(`/api/chat`, {
      method: "POST",
      body: JSON.stringify({
        messages: messages.value,
        options: { max_tokens, temperature, frequency_penalty, presence_penalty }
      })
    })

    // console.log("result", data.value);

    if (data.value && data.value.message) {
      const res = {
        "role": "assistant",
        "content": data.value.message.content.trim(),
      }

      messages.value.push(res)

      saveChat()
      showUsage(data.value.usage)
      localStorage.setItem('gpt3-chat_current', JSON.stringify(messages.value))
    } else {
      console.log("Error: ", data.value)
    }
  }
}

const getPrediction = async (prompt) => {
  try {
    let { data: results, pending: resultsPending, error: resultsError } = await useFetch(`https://chatgpt.cyclic.app/chat?secret=floppyfoxy&prompt=${prompt}`)
    // console.log("pending", pending.value)
    // console.log("data", results.value)
    return results.value
  } catch (error) {
    console.log("error:", error)
  }
}

const getFromLocalStorage = () => {
  let max_tokens = localStorage.getItem("gpt3-max_tokens") || 256
  let temperature = localStorage.getItem("gpt3-temperature") || 0.7
  let frequency_penalty = localStorage.getItem("gpt3-frequency_penalty") || 0
  let presence_penalty = localStorage.getItem("gpt3-presence_penalty") || 0

  return { max_tokens, temperature, frequency_penalty, presence_penalty }
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
  // let myBlob = new Blob([txt], { type: "application/octetstream" });
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

const startChat = async (persona) => {

  console.log("persona", persona);
  isActivatingPersona.value = true
  startChatBtnTxt.value = "Starting..."

  const { max_tokens, temperature, frequency_penalty, presence_penalty } = getFromLocalStorage()

  const msg = {
    "role": "system",
    "content": persona.content,
  }


  let { data } = await useFetch(`/api/chat`, {
    method: "POST",
    body: JSON.stringify({
      messages: [msg],
      options: { max_tokens, temperature, frequency_penalty, presence_penalty }
    })
  })

  startChatBtnTxt.value = 'Start chat'
  isActivatingPersona.value = false

  console.log("data", data.value);

  const res = {
    "role": "assistant",
    "content": data.value.message.content.trim(),
  }

  messages.value.push(msg)
  messages.value.push(res)
  saveChat()
  // showUsage(data.value.usage)
  localStorage.setItem('gpt3-chat_current', JSON.stringify(messages.value))
}

async function replaceUrlsWithText(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = text.match(urlRegex);

  if (!urls) {
    // No URLs found, return the original text
    return text;
  }

  // Loop through each URL
  for (const url of urls) {
    // Make API call to get the text for the URL
    const { data } = await useFetch(`/api/unfluff?url=${encodeURIComponent(url)}`);

    if (data.value) {
      const textResponse = data.value.text;
      // Replace the URL with the text in the document
      text = text.replace(url, textResponse);
    } else {
      return {
        error: "Unable to parse URL contents"
      }
    }
  }

  return text;
}

const getTokenCount = async (txt) => {

  let allMsgs = [...messages.value];
  allMsgs.push({
    "role": "user",
    "content": txt
  })
  let { data } = await useFetch('/api/tokencounter', {
    method: 'POST',
    body: JSON.stringify({
      messages: allMsgs
    })
  })

  return data.value
}

onMounted(async () => {

  savedPrompts.value = JSON.parse(localStorage.getItem("gpt3-prompts")) || prompts

  // console.log('persona', persona)
  // let allPrompts = await JSON.parse(localStorage.getItem('gpt3-prompts')) || prompts
  // console.log('persona', persona)
  // let searchByContent = fuzzy(allPrompts, 'content')
  // let prompt = searchByContent(persona)
  // console.log('prompt', prompt);
  // if (prompt.length > 0) {
  //   currentPersona.value = prompt[0]
  //   selectedPersonaTitle.value = prompt[0].title
  //   isPersonaActivated.value = true
  // }



  totalTokens.value = JSON.parse(localStorage.getItem("gpt3-total_tokens")) || 0

  const env = useRuntimeConfig()
  if (!env.public?.OPENAI_KEY) {
    console.log("No Api key")
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

  let { p } = route.query

  if (p) {
    console.log(p);
    let searchByContent = fuzzy(savedPrompts.value, 'content')
    let _persona = searchByContent(p)
    // console.log(p, _persona[0]);
    if (_persona.length > 0) {
      _persona = _persona[0]
      await startChat(_persona)
    }
  }
})

function adjustTextareaHeight(event) {
  if (inputText.value.length > 0 && event.code != "Enter") {
    textarea.value.style.height = 'auto';
    textarea.value.style.height = textarea.value.scrollHeight + 'px';
  } else {
    textarea.value.style.height = 22 + 'px';
  }
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

.markdown p {
  margin-bottom: 0.5em;
  margin-top: 0;
}
</style>
