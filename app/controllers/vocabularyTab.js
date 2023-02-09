
let wordsList = [ "example", "audio", "get", "definition", "send", "request"]

var url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

var client = Ti.Network.createHTTPClient({
    onload : function(e) {
        let wordModel = Alloy.createModel('words', {
            word: JSON.parse(this.responseText)[0].word,
            phonetic: JSON.parse(this.responseText)[0].phonetic
        });
        wordModel.save();       // add the alloy_id attribute
        Alloy.Collections.words.add(wordModel)
    },
    onerror : function(e) {
        Ti.API.debug(e.error);
    },
    timeout : 5000
});

wordsList.forEach((word) => {
    client.open("GET", url + word);
    client.send();
})

// collection log
setTimeout(() => {
    let myWords = Alloy.Collections.words;
    myWords.fetch()
    Ti.API.debug(myWords)
}, 10000)
