
// let listWords = [ "example", "audio", "get", "definition", "send", "request" ]

// $.win.open().then(() => {
// 	listWords.forEach((word) => {
// 		Alloy.Globals.startRequest("https://api.dictionaryapi.dev/api/v2/entries/en/" + word, $.win.activity)
// 	})
// });

// function clickRequestButton() {
// 	Alloy.Globals.startRequest("https://api.dictionaryapi.dev/api/v2/entries/en/hello", $.win.activity)
// }

$.tabGroup.open()