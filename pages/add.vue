<template>
  <div class="p-6 ">
    <div class="w-full max-w-2xl mx-auto">
      <div>Add</div>
      <div>
        <input v-model="redditLink" type="text"
          class="block w-full px-4 py-3 bg-transparent border rounded-md focus:border-amber-500 focus:ring-amber-500 sm:p-4 border-stone-400 text-stone-800">
      </div>

      <button @click.prevent="dataHandler"
        class="px-3 py-1 mt-2 font-semibold text-white bg-purple-500 border rounded">Get
        It</button>
    </div>

    <div id="container" class="relative w-11/12 mx-auto lg:w-10/12 xl:w-8/12">

      <!-- START OF THIS ISSUE -->

      <!-- three column -->
      <div class="absolute top-0 left-0 border-t-0 item three-col">

        <a href="http://editions.nymoon.com/post/22591102501/the-baedeker-project" class="block">
          <img src="http://zacksultan.com/nymoon/photos/nostcover.jpg" class="w-full h-auto">
          <h3 class="mt-2 font-bold">Looking Backward to Reveal the Future:<br> Introducing the Baedeker Project</h3>
          <p class="byline">By Bradley Hope, Illustration by Zack Sultan</p>
        </a>

      </div>

      <!-- two column -->
      <div class="absolute left-0 item two-col top-60 lg:top-96">

        <p class="slug">Baedeker Project</p>

        <a href="http://editions.nymoon.com/post/22591116275/newgate-the-prison-in-the-village-by-alexandra"
          class="block">
          <h1 class="mt-4 font-bold">The Prison in the Village</h1>
          <p class="byline">by Alexandra Atiya</p>
          <img src="http://s19.postimage.org/d7lnhai3n/prison_cover.jpg" class="w-full h-auto mt-4">
          <p class="mt-4 callout">Two early 19th-century guidebooks to New York City give a detailed picture of New York
            State’s first prison. Convicts made shoes, brushes, and whips on the four-acre site on the Hudson, and were
            also dispatched to work on New York’s roads and canals.</p>
        </a>

      </div>

      <!-- one column -->
    <div class="absolute transform -translate-x-1/2 item one-col left-1/2 top-60 lg:top-96">
    
    <p class="slug">Notes</p>
    
    <a href="http://editions.nymoon.com/post/22591120536/nostalgia" class="block">
        <h2 class="mt-4 font-bold">Nostalgia:</h2>
        <h3 class="mt-2 font-bold">Returning to Where We Have Never Been</h3>
        <p class="byline">by Editors of the Moon</p>
        <p class="mt-4">Nostalgia is one of the most obscure longings of the mind. It sends us paging through old journals and photo albums of our ancestors, on trips to worlds we "remember" as exotic from childhood stories, and into hazy day dreams of past embraces.</p>            
        <p>The sense most susceptible to nostalgia is smell. A whiff of some passing scent can release a long-trapped memory of a time and place, captured down to the textures of skin and the color light refracting through glass.</p>
        <p class="mt-4">It seems like no coincidence that the first syllable "nos" is the Russian word for nose. A Latin interpretation connotes something that is "our." It's easy to imagine something that used to be ours, now covered in algae. Our noses and algae: these, however, are false friends.</p>
    </a>
    
</div>
    </div>

    <div v-if="ogPost">
      <div>Title: {{ ogPost.data.children[0].data.title }}</div>
      <div>Link: {{ ogPost.data.children[0].data.url }}</div>
      <div>Author: {{ ogPost.data.children[0].data.author }}</div>
      <div>Subreddit: {{ ogPost.data.children[0].data.subreddit }}</div>
      <div>Created: {{ ogPost.data.children[0].data.created }}</div>
      <div>Upvotes: {{ ogPost.data.children[0].data.ups }}</div>
      <div>Comments: {{ ogPost.data.children[0].data.num_comments }}</div>
      <div>Domain: {{ ogPost.data.children[0].data.domain }}</div>
      <div>Media: {{ ogPost.data.children[0].data.secure_media }}</div>
      <div>Thumbnail: {{ ogPost.data.children[0].data.thumbnail }} <img :src="ogPost.data.children[0].data.thumbnail"
          alt=""></div>

    </div>
    <div v-if="news">News:{{ news.split(" ").length }} {{ news }}</div>
    <!-- <pre class="max-w-xl">
          {{ ogPost }}
        </pre> -->
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})

const PROMPT = `You are a journalist in a satire magazine. You will rewrite the content in a sensationalist way and make it funny to show the absurdity of it all. Include the comments in the main content as quotes. Use pompous sounding honorifics for everybody. Your output should be in this format.
Title: A sensationalist funny title
Content: A short article that is sensationalist and includes the comments as part of the article. 
Tags: frivolous, funny hashtags
`

const redditLink = ref("")
const ogPost = ref()
const news = ref()
const comments = ref()

const dataHandler = async () => {
  let { post, topcomments, txt } = await getData();

  let formattedTxt = formatPostString(post, topcomments, txt.text)
  // console.log("txt", formattedTxt);

  let res = await getArticle(formattedTxt)
  console.log("res", res.message)
  console.log("res", res.usage)
  news.value = res.message.content
}

const getArticle = async (txt) => {
  let messages = [
    {
      "role": "system",
      "content": PROMPT
    },
    {
      "role": "user",
      "content": txt
    }
  ]
  let { data } = await useFetch(`/api/chat`, {
    method: "POST",
    body: JSON.stringify({
      messages: messages,
      // options: { max_tokens, model: model.value }
      options: { max_tokens: 2000, model: "gpt-4" }
    })
  })

  // console.log("article", data.value)

  return data.value
}

const formatPostString = (post, topcomments, txt) => {
  const title = `Title: ${post.data.children[0].data.title}`;
  const content = `Content: ${txt ? txt : post.data.children[0].data.selftext}`;
  const comments = `Comments: ${topcomments}`;

  return `${title}\n${content}\n${comments}`;
};

const getData = async () => {
  // let { data } = await useFetch(`${redditLink.value}.json`)

  // ogPost.value = data.value[0]

  // comments.value = getComments(data.value[1].data.children)
  // let url = ogPost.value.data.children[0].data.url
  // let subreddit = ogPost.value.data.children[0].data.subreddit

  // if (subreddit == "worldnews" || subreddit == "news") {
  //   news.value = await getNews(url)
  // }
  // console.log("redditLink", redditLink.value);
  let { data } = await useFetch(`${redditLink.value}.json`);

  let post = data.value[0];
  let topcomments = getComments(data.value[1].data.children);
  let url = post.data.children[0].data.url;
  let subreddit = post.data.children[0].data.subreddit;
  let txt = null;

  if (subreddit === "worldnews" || subreddit === "news") {
    txt = await getNews(url);
  }
  // console.log("post", url, post);

  return {
    post,
    topcomments,
    txt,
  };
}

const getComments = (comments) => {

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

  // console.log(txtLen, top_10_comments);

  const commentsTxt = getTopComments(top_10_comments)
  return commentsTxt
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

  // console.log(output_string);
  return output_string;
}

const getNews = async (url) => {
  const { data } = await useFetch(`/api/unfluff?url=${encodeURIComponent(url)}`);
  // console.log("unfluffed", data.value);

  return data.value
}
</script>