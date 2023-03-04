import { Configuration, OpenAIApi } from "openai"

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig()
    const configuration = new Configuration({
      apiKey: config.private.OPENAI_KEY,
    });

    const openai = new OpenAIApi(configuration);
    const { q } = getQuery(event)
    const body = await readBody(event)

    const messages = body.messages
    // console.log("messages", messages)
    // return event.node.req

    const prediction = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 30,
      temperature: 0.7,
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