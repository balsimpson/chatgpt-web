// @ts-ignore
import extractor from "unfluff"

// @ts-ignore
export default defineEventHandler(async (event) => {
  try {
    const { url } = getQuery(event)
    // @ts-ignore
    let data = await $fetch(url)
    // @ts-ignore
    // console.log(data)
    return extractor(data)
  } catch (error) {
    console.log(error)
    return error
  }

})