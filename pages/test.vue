<template>
  <div class="relative w-full h-full overflow-hidden">

    <main class="relative flex flex-col items-stretch flex-1 w-full h-full overflow-hidden transition-width">
      <div class="p-4">
        <div class="pb-3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa modi deserunt tenetur praesentium debitis facilis
          in sequi ipsam officiis! Delectus laborum esse ad qui, quibusdam architecto dolorum natus nam a!
        </div>
        <input v-model="prompt" type="text" class="w-full px-2 py-1 border rounded">
        <button @click="extractText">extract</button>

        <pre>
              {{ article }}
            </pre>
      </div>

    </main>

    <div class="dark hidden bg-gray-900 md:fixed md:inset-y-0 md:flex md:w-[260px] md:flex-col"></div>
  </div>
</template>

<script setup>
const prompt = ref()
const article = ref()


const extractText = async () => {
  
  let res = await replaceUrlsWithText(prompt.value)
  console.log('res', res);

  // let { data } = await useFetch("/api/unfluff?url=" + url.value)
  // article.value = data.value
  // // let res = extractor(data.value)
  // console.log(data.value)
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
    }
  }

  return text;
}

</script>