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




/** Enables ListView's editing mode for multi-selection, if not done already. */
function enableSelectionMode() {
	// Do not continue if already in edit mode.
	if ($.listView.editing) {
		return;
	}
	// Enable edit mode.
	$.listView.editing = true;

	// Show selection options in top title bar.
	const selectedMessage = `${$.listView.selectedItems.length} Selected`;
	if (OS_ANDROID) {
		$.editToolbar.title = selectedMessage;
		$.editToolbar.visible = true;
		$.mainToolbar.visible = false;
		Alloy.Globals.tabGroupActivity.setSupportActionBar($.editToolbar);
	}
}

/** Disables ListView's editing mode, if not done already. */
function disableSelectionMode() {
	// Do not continue if edit mode is already disabled.
	if ($.listView.editing === false) {
		return;
	}

	// Disable edit mode.
	$.listView.editing = false;

	// Hide selection options in top title bar.
	if (OS_ANDROID) {
		$.editToolbar.visible = false;
		$.mainToolbar.visible = true;
		Alloy.Globals.tabGroupActivity.setSupportActionBar($.mainToolbar);
	}
}

/** Enables ListView edit mode and selects all items. */
function selectAll() {
	enableSelectionMode();
	for (let sectionIndex = 0; sectionIndex < $.listView.sectionCount; sectionIndex++) {
		const section = $.listView.sections[sectionIndex];
		for (let itemIndex = 0; itemIndex < section.itemCount; itemIndex++) {
			$.listView.selectItem(sectionIndex, itemIndex);
		}
	}
}

/** Asks user if okay to delete, then deletes all selected items, and disables edit mode. */
function deleteSelectedItems() {
	// Fetch all selected items. Do not continue if no selection was made.
	const selectedItems = $.listView.selectedItems;
	if (selectedItems.length <= 0) {
		return;
	}

	// Ask the end-user if it's okay to delete the selected items.
	const dialog = Ti.UI.createAlertDialog({
		message: 'Are you sure you want to delete the selected items?',
		buttonNames: [ 'Yes', 'No' ],
	});
	dialog.addEventListener("click", function(e) {
		// Do not continue unless "Yes" was selected.
		if (e.index != 0) {
			return;
		}

		// Reverse sort the selected items.
		selectedItems.sort((item1, item2) => {
			if (item1.sectionIndex != item2.sectionIndex) {
				return item2.sectionIndex - item1.sectionIndex;
			}
			return item2.itemIndex - item1.itemIndex;
		});

		// Delete all selected items.
		for (const nextItem of selectedItems) {
			nextItem.section.deleteItemsAt(nextItem.itemIndex, 1, { animated: false });
		}

		// Remove empty sections.
		for (let sectionIndex = $.listView.sectionCount - 1; sectionIndex >= 0; sectionIndex--) {
			const section = $.listView.sections[sectionIndex];
			if (section.itemCount <= 0) {
				$.listView.deleteSectionAt(sectionIndex);
			}
		}

		// Disable selection mode.
		disableSelectionMode();
	});
	dialog.show();
}

/** Called when the window has been opened. */
function onWindowOpen() {
	if (OS_ANDROID) {
		$.win.activity.actionBar.displayHomeAsUp = true;
		$.win.activity.actionBar.onHomeIconItemSelected = () => {
			if ($.mainToolbar.visible) {
				$.win.close();
			} else {
				disableSelectionMode();
			}
		};
	}
}

/** Called when the Android back button was pressed. */
function onAndroidBack() {
	if ($.listView.editing) {
		disableSelectionMode();
	} else {
		$.win.close();
	}
}

/** Called on Android when ListView has been long-pressed. Enables "edit" mode. */
function onLongPressed(e) {
	if (OS_ANDROID && e.section && !$.listView.editing) {
		enableSelectionMode();
		$.listView.selectItem(e.sectionIndex, e.itemIndex);
	}
}

/** Called when a ListView item has been selected/checked in "edit" mode. */
function onItemsSelected(e) {
	const message = `${e.selectedItems.length} Selected`;
	if (OS_ANDROID) {
		// Update selection count in top toolbar.
		$.editToolbar.title = message;

		// Disable "edit" mode once all items have been unselected.
		if (e.selectedItems.length <= 0) {
			disableSelectionMode();
		}
	}
}

/** Called when a ListView item has been tapped on while "edit" mode is disabled. */
function onItemClicked(e) {
	if (!$.listView.editing) {
		alert('Tapped on...');
		Ti.API.debug(Alloy.Globals.tabGroupActivity)
		// Alloy.Globals.tabGroupActivity.actionBar.title = "My Words Tapped"
	}
}

// Initialize Android ActionBar, Toolbars, and menu items.
if (OS_ANDROID) {
	$.win.activity.supportToolbar = $.mainToolbar;
	$.editToolbar.navigationIcon = Ti.App.Android.R.drawable.ic_baseline_close_24;
	$.win.activity.onCreateOptionsMenu = (e) => {
		if ($.mainToolbar.visible) {
			const selectMenuItem = e.menu.add({
				title: 'Select',
				showAsAction: Ti.Android.SHOW_AS_ACTION_NEVER,
			});
			selectMenuItem.addEventListener('click', enableSelectionMode);
		} else {
			const deleteMenuItem = e.menu.add({
				title: 'Delete',
				titleCondensed: '',
				icon: Ti.App.Android.R.drawable.ic_baseline_delete_24,
				showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM,
			});
			deleteMenuItem.addEventListener('click', deleteSelectedItems);
		}
		const selectAllMenuItem = e.menu.add({
			title: 'Select All',
			showAsAction: Ti.Android.SHOW_AS_ACTION_NEVER,
		});
		selectAllMenuItem.addEventListener('click', selectAll);
	};
}