// ts-ignore
import { Build, Article } from 'newspaperjs';

export default defineEventHandler(async (event) => {

  try {
    const { url } = getQuery(event)
    // console.log(url);
    const build = Build.Build;

    let result = await Article(url)

    return result
  } catch (error) {
    console.error(error)
    return error
  }

})