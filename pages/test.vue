<template>
  <div class="flex flex-col h-screen bg-[#1d1d20]">
    <div class="flex justify-between w-full max-w-4xl px-8 py-8 mx-auto">
      <div class="font-bold text-stone-400">OpenAI</div>
      <NuxtLink to="/settings" class="text-white transition-opacity opacity-50 cursor-pointer hover:opacity-100"><svg
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008z" />
        </svg>
      </NuxtLink>
    </div>
    <div ref="chatContainer" class="flex-grow h-full overflow-y-scroll text-sm dark:bg-[#333541]">
      <AppCard v-for="message in messages" :text="message.text" :sender="message.sender" />
    </div>

    <div
      class="w-full bg-white md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient dark:bg-[#333541] dark:md:bg-vert-dark-gradient">
      <form id="question"
        class="flex flex-row gap-3 p-6 mx-2 stretch last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6">
        <div class="relative flex flex-1 h-full md:flex-col">

          <div
            class="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:dark:bg-[#40414f] rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">

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
    <!-- <div
      class="absolute bottom-0 left-0 w-full bg-white md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient dark:bg-[#333541] dark:md:bg-vert-dark-gradient">
      <form id="question"
        class="flex flex-row gap-3 p-6 mx-2 stretch last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6">
        <div class="relative flex flex-1 h-full md:flex-col">

          <div
            class="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:dark:bg-[#40414f] rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">

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

    </div> -->
  </div>
</template>

<script setup>
const textarea = ref()
const inputText = ref('');
const completion = ref('');

const isSearching = ref(false)
const chatContainer = ref(null);
const messages = ref([])

async function getCompletion(event) {
  if (!event.shiftKey) {
    textarea.value.style.height = 'auto';
    event.preventDefault()
    const data = {
      sender: "user",
      text: inputText.value
    }
    messages.value.push(data)
    inputText.value = ''
    // isSearching.value = true
    // Your logic for handling the Enter key press event
    const reply = {
      sender: "bot",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem maxime dolorem quibusdam modi cupiditate vero consectetur ex corrupti quae nulla!"
    }

    messages.value.push(reply)
    console.log("getCompletion", chatContainer.value, chatContainer.value.scrollHeight)

    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    // setTimeout(() => {
    //   isSearching.value = false
    // }, 1000);
  }

  // try {
  //   let res = await $fetch("https://api.openai.com/v1/completions", {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer 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`
  //     },
  //     method: "POST",
  //     body: {
  //       model: "text-davinci-003",
  //       prompt: "What are you",
  //       temperature: 0.5
  //     }
  //   })
  // } catch (error) {
  //   console.error((error))
  // }
}

function adjustTextareaHeight(event) {

  if (inputText.value.length > 0) {
    // console.log("input", event)
    textarea.value.style.height = 'auto';
    textarea.value.style.height = textarea.value.scrollHeight + 'px';
  } else {
    console.log("else", event)

  }
  // if (event.inputType !== "insertLineBreak") {
  // } else {
  // }
}
</script>
