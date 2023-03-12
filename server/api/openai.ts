import { Configuration, OpenAIApi } from "openai"
// @ts-ignore
// import SSE from "sse"
// import pkg from '../node_modules/sse/index.js';
// const { SSE } = pkg;
export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig()
    const configuration = new Configuration({
      apiKey: config.private.OPENAI_KEY,
    });

    if (!config.private.OPENAI_KEY) {
      return {
        error: "No API key"
      }
    }

    const openai = new OpenAIApi(configuration);
    const { q } = getQuery(event)

    // let messages = [
    //   {
    //      "role": "system", 
    //      "content": "You are my personal coach helping me improve my online FIFA game. You know all the tips, tricks, tactics and strategies to win a game. Be concise in your reply, but always helpful. My team is PSG."
    //   },
    //   {
    //      "role": "user", 
    //      "content": q
    //   }
    // ] 

    // const prediction = await openai.createChatCompletion({
    //   model: "gpt-3.5-turbo",
    //   // @ts-ignore
    //   messages: q,
    //   max_tokens: 140,
    //   temperature: 0.5
    // });



    // return {
    //   message: prediction.data.choices[0].message
    // }

    return {q}

  } catch (err) {
    // @ts-ignore
    console.log("error", err)
    return err
  }
})