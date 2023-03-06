import { Configuration, OpenAIApi } from "openai"
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
    const body = await readBody(event)
    // console.log("body", body)

    const messages = body.messages
    let options = body.options
    // return event.node.req

    const prediction = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: options.max_tokens,
      temperature: options.temperature,
      frequency_penalty: options.frequency_penalty,
      presence_penalty: options.presence_penalty
    });

    

    // console.log("usage", prediction.data.usage)
    // // // // @ts-ignore
    // // console.log("prediction", JSON.stringify(prediction.data.choices[0].message))
    return {
      message: prediction.data.choices[0].message,
      usage: prediction.data.usage
    }

  } catch (err) {
    // @ts-ignore
    console.log("error", err.message)
    return err
  }
})