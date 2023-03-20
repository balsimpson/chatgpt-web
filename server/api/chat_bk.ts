import { Configuration, OpenAIApi } from "openai"

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

    const messages = body.messages
    let options = body.options
    // return event.node.req
    console.log("body", messages, options)

    try {
      const res = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: "It was the best of times",
        max_tokens: 100,
        temperature: 0,
        stream: true,
      }, { responseType: 'stream' });

      // @ts-ignore
      res.data.on('data', data => {
        // @ts-ignore
        const lines = data.toString().split('\n').filter(line => line.trim() !== '');
        for (const line of lines) {
          const message = line.replace(/^data: /, '');
          if (message === '[DONE]') {
            return; // Stream finished
          }
          try {
            const parsed = JSON.parse(message);
            console.log(parsed.choices[0].text);
          } catch (error) {
            console.error('Could not JSON parse stream message', message, error);
          }
        }
      });
    } catch (error) {
      // @ts-ignore
      if (error.response?.status) {
        // @ts-ignore
        console.error(error.response.status, error.message);
        // @ts-ignore
        error.response.data.on('data', data => {
          const message = data.toString();
          try {
            const parsed = JSON.parse(message);
            console.error('An error occurred during OpenAI request: ', parsed);
          } catch (error) {
            console.error('An error occurred during OpenAI request: ', message);
          }
        });
      } else {
        console.error('An error occurred during OpenAI request', error);
      }
    }

    // const res = await openai.createChatCompletion({
    //   model: "gpt-3.5-turbo",
    //   messages: messages,
    //   max_tokens: Number(options.max_tokens),
    //   temperature: options.temperature,
    //   frequency_penalty: options.frequency_penalty,
    //   presence_penalty: options.presence_penalty,
    //   stream: true
    // });

    // // @ts-ignore
    // res.data.on("data", 
    //   console.log("data - ", res.data),
    //   console.log("data", res.data)
    // )


    // console.log("prediction", prediction)

    // return {
    //   message: prediction.data.choices[0].delta,
    //   usage: prediction.data.usage
    // }

  } catch (err) {
    // @ts-ignore
    console.log("error", err.message)
    return err
  }
})