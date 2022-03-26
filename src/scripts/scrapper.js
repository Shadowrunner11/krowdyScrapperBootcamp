import { Education } from "../modules/Models/Education"
import { Person } from "../modules/Models/Person"

const getUlByText = text =>{
    return document.evaluate(
        `(//section[.//span[contains(text(),"${text}")] or .//div[contains(text(),"${text}")]]//ul)[1]`, 
        document, 
        null, 
        XPathResult.ANY_TYPE, 
        null).iterateNext()
}

const fullname= document.querySelector('h1')?.textContent

const nodeUlEducation= getUlByText("Educación")

let listItemsEducation = document.evaluate('./li', nodeUlEducation, null, XPathResult.ANY_TYPE, null)

let educationIterate = listItemsEducation.iterateNext()
const educationListItems =[]


while(educationIterate){
    const spansEducation =  document.evaluate(XPATH_SPAN_EDUCATION, educationIterate, null, XPathResult.ANY_TYPE, null)
    let spansEducationIterator = spansEducation.iterateNext()
    const educationArray = []
    while(spansEducationIterator){
        educationArray.push(spansEducationIterator.textContent)
        spansEducationIterator = spansEducation.iterateNext()
    }
    educationListItems.push(new Education(educationArray[0], educationArray[1], educationArray[2]))
    educationIterate = listItemsEducation.iterateNext()
}



let port = chrome.runtime.connect({name:'safePort'})


port.postMessage(new Person(fullname, educationListItems))