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
    const query = getQuery(event)

    let messages = [
      {
         "role": "system", 
         "content": query.p
      },
      {
         "role": "user", 
         "content": query.m
      }
    ] 

    const prediction = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      // @ts-ignore
      messages: messages,
      max_tokens: 256,
      temperature: 0.5
    });



    return {
      message: prediction.data.choices[0].message
    }

    // return {q}

  } catch (err) {
    // @ts-ignore
    console.log("error", err)
    return err
  }
})