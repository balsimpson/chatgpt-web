<template>
  <div class="flex flex-col h-screen bg-[#1d1d20]">
    <nav class="flex items-center justify-between w-full max-w-4xl px-8 py-6 mx-auto bg-[#333541]">
      <NuxtLink to="/" class="font-bold text-stone-400">My<span class="text-amber-500">GPT</span></NuxtLink>

      <div class="flex items-center justify-between w-full max-w-xl px-6 mx-auto space-x-2">
        <AppAutocomplete @select="setPersona" @clear="isPersonaActivated = false" class="w-full" :options="prompts"
          placeholder="choose persona" />
        <button @click="startChat" :class="[isPersonaActivated ? 'opacity-100' : 'opacity-30 pointer-events-none']"
          class="px-2 py-1 rounded shrink-0 bg-amber-500">Start chat</button>
      </div>
      <NuxtLink to="/settings" id="settings"
        class="text-white transition-opacity opacity-50 cursor-pointer hover:opacity-100 target:bg-amber-500"><svg
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>

      </NuxtLink>
    </nav>

    <!-- <highlightjs language="js" code="console.log('Hello World');" /> -->

    <div ref="chatContainer" id="container" class="flex-grow flex  overflow-y-auto bg-[#333541] h-full flex-col">
      <AppCard v-for="message in messages" :text="message.content" :sender="message.role" />
    </div>

    <div
      class="w-full md:border-t-0 border-white/20 md:border-transparent md:bg-vert-light-gradient bg-[#333541] md:bg-vert-dark-gradient">
      <div class="flex items-center justify-center pt-2 text-xs uppercase text-zinc-400">
        <div>Tokens used: 400</div>
      </div>
      <form id="question"
        class="flex flex-row gap-3 px-6 py-3 mx-2 stretch last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl">
        <div class="relative flex flex-1 h-full md:flex-col">

          <div
            class="flex flex-col w-full pb-2 flex-grow md:py-3 md:pl-4 relative border border-gray-900/50 text-white bg-[#40414f] rounded-md shadow-[0_0_15px_rgba(0,0,0,0.10)]">

            <textarea @keyup.enter.prevent="getCompletion" @input="adjustTextareaHeight" ref="textarea" tabindex="0"
              rows="1" placeholder=""
              class="w-full p-0 pl-2 m-0 bg-transparent border-0 resize-none pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pl-0 focus:outline-none"
              v-model="inputText"></textarea>

            <button @click.prevent="getCompletion"
              class="absolute p-1 rounded-md text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent">
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
  </div>
</template>

<script setup>

import prompts from "~/assets/prompts.json"
const textarea = ref()
const inputText = ref('');
const completion = ref('');

const isPersonaActivated = ref(false)
const isSearching = ref(false)
const isMenuShowing = ref(false)
const chatContainer = ref(null);
const messages = ref([])

const getCompletion = async (event) => {
  if (event.code == "Enter") {
    textarea.value.style.height = 24 + 'px';
    const msg = {
      "role": "user",
      "content": inputText.value,
      // "date": Date.now()
    }
    inputText.value = ""
    messages.value.push(msg)

    console.log(messages.value)
    let { data } = await useFetch(`/api/openai`, {
      method: "POST",
      body: JSON.stringify({
        messages: messages.value
      })
    })

    console.log("result", data.value)

    const res = {
      "role": "assistant",
      "content": data.value.message.content.trim(),
      // "date": Date.now()
    }
    // console.log(res)
    messages.value.push(res)
    // localStorage.setItem('gpt3-chat_current', JSON.stringify(messages.value))
  } else {
    console.log(event)
  }

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
  console.log('event', persona)
  isPersonaActivated.value = true;
}

const startChat = () => {

}

onMounted(() => {
  messages.value = localStorage.getItem("gpt3-chat_current") || []

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
    console.log("else", event)
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
