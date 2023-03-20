import { Configuration, OpenAIApi } from "openai"

export const config = {
  runtime: 'edge',
};

export default defineEventHandler(async (event) => {
  interface ChatResponse {
    message: string | undefined;
  }
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
    // const { q } = getQuery(event)
    const body = await readBody(event)

    const messages = body.messages
    // let options = body.options
    // return event.node.req
    // console.log("body", messages, options)

    const prediction = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 256
    });


    console.log("prediction", JSON.stringify(prediction.data.choices[0].message))

    const response: ChatResponse = {
      // @ts-ignore
      message: prediction.data.choices[0].message ?? undefined,
      // @ts-ignore
      // usage: prediction.data.usage
    };

    return response;

    // return {
    //   message: prediction.data.choices[0].message,
    //   usage: prediction.data.usage
    // }

  } catch (err) {
    // @ts-ignore
    console.log("error", err.message)
    return err
  }
})