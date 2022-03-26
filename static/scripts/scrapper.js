(() => {
  // config/env.js
  var XPATH_SPAN_EDUCATION = ".//span[@aria-hidden]";

  // src/modules/Models/Education.js
  var Education = class {
    constructor(institution, description, date) {
      this.institution = institution;
      this.description = description;
      this.date = date;
    }
  };

  // src/modules/Models/Person.js
  var Person = class {
    constructor(fullname2, educationList) {
      this.fullname = fullname2;
      this.educationList = educationList;
    }
  };

  // src/scripts/scrapper.js
  var getUlByText = (text) => {
    return document.evaluate(`(//section[.//span[contains(text(),"${text}")] or .//div[contains(text(),"${text}")]]//ul)[1]`, document, null, XPathResult.ANY_TYPE, null).iterateNext();
  };
  var fullname = document.querySelector("h1")?.textContent;
  var nodeUlEducation = getUlByText("Educaci\xF3n");
  var listItemsEducation = document.evaluate("./li", nodeUlEducation, null, XPathResult.ANY_TYPE, null);
  var educationIterate = listItemsEducation.iterateNext();
  var educationListItems = [];
  while (educationIterate) {
    const spansEducation = document.evaluate(XPATH_SPAN_EDUCATION, educationIterate, null, XPathResult.ANY_TYPE, null);
    let spansEducationIterator = spansEducation.iterateNext();
    const educationArray = [];
    while (spansEducationIterator) {
      educationArray.push(spansEducationIterator.textContent);
      spansEducationIterator = spansEducation.iterateNext();
    }
    educationListItems.push(new Education(educationArray[0], educationArray[1], educationArray[2]));
    educationIterate = listItemsEducation.iterateNext();
  }
  var port = chrome.runtime.connect({ name: "safePort" });
  port.postMessage(new Person(fullname, educationListItems));
})();
