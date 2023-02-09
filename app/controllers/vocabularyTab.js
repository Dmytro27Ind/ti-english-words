
let wordsList = [ "example", "audio", "get", "definition", "send", "request"]

var url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

var client = Ti.Network.createHTTPClient({
    onload : function(e) {
        Ti.API.info("Received text: " + this.responseText);

        let myWords = Alloy.Collections.words;
        Ti.API.debug("collection without fetch(): ", myWords)
        myWords.fetch();
        Ti.API.debug("collection after fetch(): ", myWords)

        let wordModel = Alloy.createModel('words', {
            word: "my",
            phonetic: "mai"
        });
        Ti.API.debug("model without save()", wordModel)
        wordModel.save();       // add the alloy_id attribute
        Ti.API.debug("model after save()", wordModel)

        myWords.add(wordModel)
    },
    onerror : function(e) {
        Ti.API.debug(e.error);
    },
    timeout : 5000
});

client.open("GET", url + wordsList[0]);
client.send();
setTimeout(() => {
    Ti.API.debug(Alloy.Collections.words)
}, 2000)
