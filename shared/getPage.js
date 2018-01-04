import { ReadJSON, InsertVariable } from 'ReadJSON'

const multi_text = ReadJSON().static_text
const $s = multi_text["shared"]["getPage"]

export function getPage(page) {
  switch(page) {
    case 'waiting':
      return $s["text"][0]
    case 'experiment':
      return $s["text"][1]
    case 'result':
      return $s["text"][2]
    default:
      return page
  }
}
