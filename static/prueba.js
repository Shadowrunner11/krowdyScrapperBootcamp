let title = document.querySelector('body > main > h1')?.textContent
let port = chrome.runtime.connect({name:'safePort'})
port.postMessage({title})

