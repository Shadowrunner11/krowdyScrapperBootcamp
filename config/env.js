export let XPATH_SPAN_EDUCATION = './/span[@aria-hidden]'
export let XPATH_LIST_ITEMS_EDUCATION = './li'
export let XPATH_SECTION_INFO = text=>`(//section[.//span[contains(text(),"${text}")] or .//div[contains(text(),"${text}")]]//ul)[1]`