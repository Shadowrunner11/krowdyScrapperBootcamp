import { Education } from '../modules/Models/Education';
import { Person } from '../modules/Models/Person';
import { xpathEval } from '../modules/Utils/evaluators';


const getUlByText = text => xpathEval(XPATH_SECTION_INFO(text), document).iterateNext();

const fullname = document.querySelector('h1')?.textContent;

const nodeUlEducation= getUlByText('Educación');

let listItemsEducation = xpathEval(XPATH_LIST_ITEMS_EDUCATION, nodeUlEducation);

let educationIterate = listItemsEducation.iterateNext();
const educationListItems =[];


while(educationIterate){
	const spansEducation =  xpathEval(XPATH_SPAN_EDUCATION, educationIterate);
	let spansEducationIterator = spansEducation.iterateNext();
	const educationArray = [];
	while(spansEducationIterator){
		educationArray.push(spansEducationIterator.textContent);
		spansEducationIterator = spansEducation.iterateNext();
	}
	educationListItems.push(new Education(educationArray[0], educationArray[1], educationArray[2]));
	educationIterate = listItemsEducation.iterateNext();
}



let port = chrome.runtime.connect({name:'safePort'});
port.postMessage(new Person(fullname, educationListItems));