import tiktoken from 'tiktoken-node'

export default defineEventHandler(async (event) => {

  try {
    const { messages } = await readBody(event)

    let enc = tiktoken.encodingForModel("gpt-3.5-turbo")
    let tokens_per_message = 4  // every message follows <im_start>{role/name}\n{content}<im_end>\n
    let tokens_per_name = -1 // if there's a name, the role is omitted

    let numTokens = 0;
    for (let message of messages) {
      numTokens += tokens_per_message;
      for (let [key, value] of Object.entries(message)) {
        // @ts-ignore
        numTokens += enc.encode(value).length;
        if (key === "name") {
          numTokens += tokens_per_name;
        }
      }
    }
    numTokens += 2;

    return { tokens: numTokens }
  } catch (error) {
    console.error(error)
    return error
  }
})