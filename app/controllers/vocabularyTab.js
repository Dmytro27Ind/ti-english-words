// import VolleyPackage from 'com.android.volley.*';
// import VolleyToolbox from 'com.android.volley.toolbox.*';
// import Activity from 'android.app.Activity';

// Ti.API.debug("START 1 ______________________________________________________________")


// let wordsList = [ "example", "audio", "get", "definition", "send", "request"]

// var url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

// function startRequest(url) {
//     Ti.API.debug("START 2 ______________________________________________________________")

// 	const activity = new Activity($.win.activity);
//     Ti.API.debug("activity: ", activity)

// 	const queue = VolleyToolbox.Volley.newRequestQueue(activity);

//     Ti.API.debug("START 3 ______________________________________________________________")

// 	const request = new VolleyToolbox.StringRequest(VolleyPackage.Request.Method.GET, url,
// 		new VolleyPackage.Response.Listener({
// 			onResponse: (response) => {
// 				Ti.API.info('Response is: ' + response);
// 				alert('Request completed!');
// 			}
// 		}),
// 		new VolleyPackage.Response.ErrorListener({
// 			onErrrorResponse: (error) => {
// 				Ti.API.error('HTTP error');
// 			}
// 		})
// 	);
// 	queue.add(request);
// }

// startRequest(url + wordsList[0])
// // startRequest(url + wordsList[1])
// // startRequest(url + wordsList[2])
// // startRequest(url + wordsList[3])

// Ti.API.debug($.vocabularyTab)

let myWords = Alloy.Collections.words;
myWords.fetch();

let wordModel = Alloy.createModel('words', {
	word: "my",
	phonetic: "mai"
});
// wordModel.save();
myWords.add(wordModel)

wordModel = Alloy.createModel('words', {
	word: "hello",
	phonetic: "helou"
});
// wordModel.save();
myWords.add(wordModel)

wordModel = Alloy.createModel('words', {
	word: "type",
	phonetic: "tajp"
});
// wordModel.save();
myWords.add(wordModel)

wordModel = Alloy.createModel('words', {
	word: "do",
	phonetic: "du"
});
// wordModel.save();
myWords.add(wordModel)

Ti.API.debug(myWords)