import { Configuration, OpenAIApi } from "openai"

export const config = {
  runtime: 'edge',
};

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
    // const { q } = getQuery(event)
    const body = await readBody(event)
    const prompt = body.prompt

    console.log(prompt)

    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "256x256",
    });

    // console.log(res.data)
    return { url: res.data.data[0].url, prompt: prompt };

  } catch (err) {
    // @ts-ignore
    console.log("error", err.message)
    return err
  }
})