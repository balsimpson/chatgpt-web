<template>
  <div class="w-full px-6 text-gray-200 font-merri">
    <div class="max-w-screen-lg px-4 py-8 mx-auto">
      <header class="mb-8 border-b border-double">
        <h1 class="text-4xl font-bold text-center text-gray-800 ">The Daily News</h1>
        <p class="text-center text-gray-600">The oldest newspaper in town</p>
      </header>
      <section class="py-12 text-gray-800">
        <div class="max-w-screen-lg px-4 mx-auto">
          <div class="grid items-center grid-cols-1 p-4 border border-black divide-x md:grid-cols-2">
            <div>
              <h2 class="mb-4 text-3xl font-bold">Breaking News</h2>
              <p class="mb-8 text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget urna commodo,
                vestibulum ante eget, semper nulla.</p>
              <a href="#"
                class="inline-block px-6 py-2 font-semibold text-gray-800 transition duration-200 bg-white border border-black rounded-full hover:bg-gray-100">Read
                More</a>
            </div>
            <div class="pl-3">
              <img src="https://source.unsplash.com/random" alt="Breaking News" class="object-cover w-full h-full">
            </div>
          </div>
        </div>
      </section>
      <section class="grid grid-cols-1 divide-x md:grid-cols-2">
        <article class="p-8 bg-white shadow-md">
          <h2 class="mb-4 text-2xl font-bold text-gray-800">Local News</h2>

          <button @click.prevent="getComments">get comments</button>

          <p class="mb-4 leading-relaxed text-justify text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget urna commodo,
            vestibulum ante eget, semper nulla. Nulla posuere massa id tortor malesuada auctor. Integer porttitor augue
            nisl, eu bibendum sapien suscipit in. Duis aliquam mauris vel ultricies consequat. Sed iaculis a risus vitae
            gravida. Ut sagittis, purus vitae vestibulum facilisis, est enim finibus mi, vitae fermentum risus sapien sit
            amet augue.</p>
          <p class="text-gray-600">Duis dictum enim a magna tincidunt bibendum. Morbi congue tristique dui eget interdum.
            Sed feugiat risus a risus cursus, ut lobortis ante feugiat. Vestibulum ut nisi luctus, aliquet urna id,
            consectetur nisl.</p>
        </article>
        <article class="p-8 bg-white shadow-md">
          <h2 class="mb-4 text-2xl font-bold text-gray-800">International News</h2>
          <p class="mb-4 text-gray-600">Suspendisse eget efficitur nisl, at fringilla sapien. Aenean ac bibendum neque. Ut
            vitae felis sed enim semper eleifend. Fusce in magna at mauris vehicula facilisis eu non risus. Suspendisse
            finibus nunc a magna semper, eu dignissim nunc feugiat.</p>
          <p class="text-gray-600">Curabitur bibendum tellus vel nisl luctus, a feugiat ipsum tincidunt. Fusce tristique
            augue mauris, vitae sodales mauris aliquam ac. Aliquam eu sapien in elit dictum ultrices in non sapien. Etiam
            non nunc eget velit tincidunt bibendum nec a enim. In sit amet mi ac arcu consequat fringilla.</p>
        </article>
      </section>
      <section class="p-8 mt-8 bg-white shadow-md">
        <h2 class="mb-4 text-2xl font-bold text-gray-800">Sports News</h2>
        <p class="mb-4 text-gray-600">Vivamus eu lorem finibus, tempus ipsum non, vehicula
          ...urna. Vestibulum mollis, massa ac malesuada scelerisque, eros nisi congue ex, id vulputate felis odio ut
          nisi. Nunc malesuada, quam sit amet hendrerit pharetra, dui sapien egestas turpis, ut viverra est metus eu
          risus. Sed eleifend, mauris at consequat feugiat, velit quam eleifend nulla, vel vestibulum enim augue ut odio.
        </p>
        <p class="text-gray-600">Nam vitae massa sit amet enim aliquet tincidunt. Aliquam consequat euismod est, quis
          bibendum erat vulputate vel. Sed auctor vestibulum velit, sed malesuada mauris dictum ac. Integer dignissim arcu
          velit, vel aliquam nulla pretium sed. Nulla pulvinar lacus ac dui vestibulum dictum. Nam ut enim vitae lacus
          sollicitudin fringilla.</p>
      </section>
      <section class="p-8 mt-8 bg-white shadow-md">
        <h2 class="mb-4 text-2xl font-bold text-gray-800">Entertainment News</h2>
        <p class="mb-4 text-gray-600">Pellentesque suscipit sapien quis tellus tincidunt, in bibendum lorem aliquam. Fusce
          sed magna sit amet metus rhoncus bibendum. Nulla at ex vel quam tincidunt dapibus vel id lectus. Sed maximus
          ipsum sed dui laoreet rhoncus.</p>
        <p class="text-gray-600">Nam vulputate mi sit amet mauris bibendum, nec tristique urna interdum. Nullam vitae
          pulvinar mauris. In eget tellus leo. Nam euismod orci id nunc vehicula rhoncus. Nam eget ullamcorper enim, vel
          commodo est. Curabitur bibendum aliquet tellus, id ultricies lectus commodo id. Donec quis tellus quis nibh
          mollis bibendum quis non nulla.</p>
      </section>
      <footer class="mt-8 text-center text-gray-600">
        © 2023 The Daily News
      </footer>
    </div>
    <div>News</div>
    <button @click.prevent="getNews">Get News</button>
    <pre>{{ links }}</pre>
    <pre class="whitespace-pre-wrap">{{ unfluffed }}</pre>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})
const links = ref([])
const unfluffed = ref([])

const getNews = async () => {
  let { data } = useFetch("https://www.reddit.com/r/worldnews.json")

  console.log("data", data.value.data.children);
  let results = data.value.data.children

  let urls = [];

  for (let i = 0; i < results.length; i++) {
    urls.push({
      url: results[i].data.url,
      link: `https://www.reddit.com${results[i].data.permalink}`
    });
  }

  links.value = urls

  for (const url of urls) {
    // Make API call to get the text for the URL
    const { data } = await useFetch(`/api/unfluff?url=${encodeURIComponent(url.link)}`);
    console.log("unfluffed", data.value);

    unfluffed.value.push(data.value)
  }
}

const getComments = async () => {

  let { data } = await useFetch("https://www.reddit.com/r/news/comments/126zzrr/donald_trump_indicted_over_hush_money_payments_in.json")

  console.log("data", data.value);
  const comments = data.value[1].data.children;
  let txtLen = 0
  // Loop through the comments and extract necessary information
  const top_comments = [];
  comments.forEach(comment => {
    const author = comment.data.author;
    const text = comment.data.body;
    const time = new Date(comment.data.created_utc * 1000);
    const score = comment.data.score;
    const ups = comment.data.ups;
    const replies = comment.data.replies ? comment.data.replies.data.children : [];

    // if (text) {
    txtLen += text?.length || 0
    // }

    if (score >= 100) { // Only consider comments with a score of 100 or more
      const top_replies = [];
      replies.forEach(reply => {
        const reply_author = reply.data.author;
        const reply_text = reply.data.body;
        const reply_time = new Date(reply.data.created_utc * 1000);
        const reply_score = reply.data.score;

        if (reply_score >= 50) { // Only consider replies with a score of 50 or more
          top_replies.push({ reply_author, reply_text, reply_time, reply_score });
        }
      });

      top_comments.push({ author, text, time, score, top_replies });
    }
  });

  // Sort the top comments by score
  top_comments.sort((a, b) => b.score - a.score);
  const top_10_comments = top_comments.slice(0, 10);

  getTopComments(top_10_comments)
  console.log(txtLen, top_10_comments);
}

const getTopComments = (comments) => {
  const comment_strings = [];
  let total_length = 0;
  comments.forEach(comment => {
    const author = comment.author;
    const text = comment.text;

    // Format the comment as "authorName: Comment"
    const formatted_comment = `${author}: ${text}`;

    // Only consider comments that won't exceed the maximum length
    if (total_length + formatted_comment.length <= 2000) {
      comment_strings.push(formatted_comment);
      total_length += formatted_comment.length;
    } else {
      return;
    }
  });

  // Combine the comment strings into a single string, separated by commas
  const output_string = comment_strings.join(', ');

  console.log(output_string);
  console.log(output_string.split(" ").length);
}
</script>