<template>
  <div class="flex flex-col h-screen w-full bg-[#333541] relative">
    <nav class="flex items-end justify-between w-full max-w-4xl px-8 py-6 mx-auto">
      <NuxtLink to="/" class="flex items-center text-xl font-bold text-stone-400">
        <svg width="300" height="300" viewBox="0 0 300 300" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 text-indigo-500">
          <path
            d="M267.15 125.038C270.234 115.776 271.303 105.963 270.287 96.2547C269.272 86.5463 266.194 77.1671 261.259 68.7447C253.945 56.0053 242.772 45.919 229.354 39.9413C215.936 33.9637 200.965 32.4036 186.601 35.4863C180.123 28.1854 172.16 22.3524 163.245 18.378C154.33 14.4037 144.669 12.3794 134.908 12.4408C120.223 12.4054 105.907 17.0342 94.0223 25.66C82.1377 34.2858 73.2996 46.4628 68.7819 60.4355C59.2155 62.3938 50.1779 66.373 42.2739 72.1069C34.3699 77.8408 27.782 85.1968 22.9513 93.683C15.5786 106.387 12.4314 121.104 13.9638 135.713C15.4962 150.322 21.6289 164.065 31.4774 174.963C28.3937 184.225 27.324 194.038 28.3398 203.746C29.3556 213.455 32.4335 222.833 37.3676 231.256C44.6826 243.995 55.8553 254.08 69.2737 260.058C82.692 266.036 97.6628 267.596 112.026 264.514C118.504 271.815 126.467 277.648 135.382 281.623C144.297 285.597 153.958 287.621 163.719 287.56C178.411 287.599 192.735 282.968 204.624 274.336C216.513 265.705 225.353 253.519 229.867 239.538C239.433 237.58 248.471 233.601 256.375 227.867C264.279 222.133 270.867 214.777 275.698 206.29C283.061 193.587 286.201 178.874 284.665 164.271C283.129 149.668 276.996 135.931 267.15 125.038ZM163.741 269.575C151.68 269.592 139.999 265.368 130.737 257.643C131.155 257.415 131.887 257.013 132.365 256.721L187.144 225.078C188.519 224.296 189.661 223.162 190.452 221.792C191.243 220.422 191.655 218.866 191.646 217.285V140.056L214.8 153.426C214.921 153.486 215.026 153.576 215.105 153.686C215.183 153.797 215.233 153.926 215.25 154.06V218.017C215.233 231.677 209.802 244.774 200.147 254.437C190.492 264.102 177.401 269.545 163.741 269.575ZM52.9663 222.264C46.9253 211.826 44.7481 199.596 46.8157 187.714C47.2225 187.958 47.933 188.392 48.4429 188.685L103.222 220.327C104.588 221.125 106.141 221.546 107.722 221.546C109.303 221.546 110.856 221.125 112.221 220.327L179.101 181.71V208.449C179.109 208.586 179.082 208.722 179.025 208.846C178.967 208.97 178.879 209.078 178.77 209.16L123.394 241.132C111.549 247.955 97.4812 249.799 84.2781 246.261C71.0747 242.724 59.8139 234.093 52.9663 222.264ZM38.5554 102.675C44.5702 92.2234 54.0704 84.2215 65.392 80.0692C65.392 80.5411 65.3649 81.3768 65.3649 81.9566V145.241C65.3553 146.821 65.7668 148.376 66.557 149.745C67.3473 151.114 68.4877 152.247 69.8613 153.03L136.741 191.641L113.588 205.01C113.473 205.086 113.342 205.131 113.206 205.144C113.07 205.156 112.932 205.135 112.806 205.081L57.4246 173.081C45.6004 166.233 36.9741 154.977 33.4369 141.778C29.8997 128.581 31.7404 114.519 38.5554 102.675ZM228.788 146.944L161.907 108.327L185.061 94.963C185.176 94.888 185.307 94.8419 185.443 94.8295C185.579 94.8171 185.716 94.8392 185.842 94.8928L241.224 126.865C249.709 131.767 256.621 138.983 261.153 147.671C265.685 156.358 267.647 166.157 266.811 175.92C265.976 185.682 262.375 195.005 256.433 202.796C250.49 210.586 242.451 216.523 233.257 219.91C233.257 219.432 233.257 218.597 233.257 218.017V154.733C233.27 153.155 232.863 151.602 232.077 150.233C231.292 148.864 230.157 147.729 228.788 146.944ZM251.833 112.259C251.426 112.01 250.716 111.581 250.206 111.289L195.426 79.6462C194.061 78.8498 192.508 78.4295 190.927 78.4295C189.347 78.4295 187.793 78.8498 186.428 79.6462L119.548 118.264V91.5246C119.541 91.3878 119.567 91.2516 119.624 91.1278C119.682 91.004 119.77 90.896 119.879 90.8141L175.255 58.868C183.739 53.9762 193.44 51.6014 203.224 52.0214C213.008 52.4414 222.47 55.6389 230.503 61.2398C238.536 66.8406 244.808 74.6132 248.586 83.6486C252.363 92.6836 253.49 102.607 251.833 112.259ZM106.96 159.918L83.8001 146.548C83.679 146.488 83.5738 146.398 83.4954 146.288C83.417 146.177 83.3668 146.048 83.3503 145.913V81.9566C83.3565 72.1612 86.1531 62.57 91.412 54.3059C96.6717 46.0417 104.176 39.4467 113.048 35.2927C121.919 31.1387 131.79 29.5977 141.505 30.8499C151.221 32.1021 160.378 36.0959 167.906 42.3636C167.489 42.5914 166.762 42.9928 166.279 43.2856L111.499 74.9277C110.124 75.7091 108.983 76.8425 108.192 78.2115C107.401 79.5802 106.989 81.1353 106.998 82.7159L106.96 159.918ZM119.537 132.799L149.325 115.595L179.111 132.788V167.185L149.325 184.379L119.537 167.185V132.799Z"
            fill="currentColor" />
        </svg>

        <span class="ml-2">
          My
          <span class="text-indigo-500">
            GPT</span>
        </span>
      </NuxtLink>

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
        <div class="mb-3 text-2xl font-semibold text-center text-gray-100 sm:text-4xl">Choose a <span
            class="text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-indigo-300/30 to-indigo-700">persona</span></div>

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

const getCompletion = async (event) => {


  if (inputText.value.length < 3) {
    console.log(inputText.value.length);
    return
  } else {
    // check if there is a URL in text and is parsable
    let txt = await replaceUrlsWithText(inputText.value)
    // if not parsable, return error message
    if (txt.error) {
      console.log("error parsing URL")
      return
    }

    let max_tokens = localStorage.getItem("gpt3-max_tokens") || 256
    let temperature = localStorage.getItem("gpt3-temperature") || 0.7
    let frequency_penalty = localStorage.getItem("gpt3-frequency_penalty") || 0
    let presence_penalty = localStorage.getItem("gpt3-presence_penalty") || 0

    console.log(inputText.value.length);
    if (event.code == "Enter" || event.type == "click") {
      textarea.value.style.height = 22 + 'px';
      const msg = {
        "role": "user",
        "content": txt,
        // "content": inputText.value,
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
        console.log("Error", error)
      } else {
        const res = {
          "role": "assistant",
          "content": data.value.message.content.trim(),
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

onMounted(() => {

  console.log('route', route.query)

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
})

function adjustTextareaHeight(event) {
  if (inputText.value.length > 0 && event.code != "Enter") {
    textarea.value.style.height = 'auto';
    textarea.value.style.height = textarea.value.scrollHeight + 'px';
  } else {
    textarea.value.style.height = 30 + 'px';
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
  margin-bottom: 0;
  margin-top: 0;
}
</style>
