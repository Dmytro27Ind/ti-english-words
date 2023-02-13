
//  ____________________  1  ______________________
// $.navWin.open().then(() => {
//     $.tabGroup.open().then((result) => {
//         Ti.API.debug("___________________________________")
//         Ti.API.debug(result)
//         Ti.API.debug($.tabGroup)
//         Ti.API.debug("___________________________________")

//         Ti.API.debug($.tabGroup.theme)
//         // $.tabGroup.theme = 'Theme.MyDarkTheme'
//         $.tabGroup.applyProperties({theme: 'Theme.MyDarkTheme'})
//         Ti.API.debug($.tabGroup.theme)
//         // $.tabGroup.close().then(() => {
//         //     $.tabGroup.open()
//         // })
//     })
// })

//  ____________________  2  ______________________
// let listWords = [ "example", "audio", "get", "definition", "send", "request" ]

// $.win.open().then(() => {
// 	listWords.forEach((word) => {
// 		Alloy.Globals.startRequest("https://api.dictionaryapi.dev/api/v2/entries/en/" + word, $.win.activity)
// 	})
// });

// function clickRequestButton() {
// 	Alloy.Globals.startRequest("https://api.dictionaryapi.dev/api/v2/entries/en/hello", $.win.activity)
// }


//  ____________________  3  ______________________
// $.win.open()
// function setDark() {
//     Ti.API.debug($.win.theme)
//     $.win.applyProperties({theme: 'Theme.MyDarkTheme'})
//     Ti.API.debug($.win.theme)
// }

//  ____________________  4  ______________________
$.tabGroup.open().then(() => {
    // Ti.API.debug("___________________________________")
    // Ti.API.debug($.tabGroup.activity)
    // Ti.API.debug("___________________________________")
    // $.tabGroup.activity.actionBar.title = "Words"
    // Ti.API.debug($.tabGroup.activity)
    // Ti.API.debug("___________________________________")
    // Ti.API.debug("+++++++++", Alloy.Globals.tabGroupActivity)
    Alloy.Globals.tabGroupActivity = $.tabGroup.activity
    // Ti.API.debug("+++++++++", Alloy.Globals.tabGroupActivity)
    // Alloy.Globals.tabGroupActivity.actionBar.title = "My Words"
    // Ti.API.debug($.tabGroup.activity)
    // Ti.API.debug("___________________________________")
})
