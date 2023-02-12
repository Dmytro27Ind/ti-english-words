// import VolleyPackage from 'com.android.volley.*';
// import VolleyToolbox from 'com.android.volley.toolbox.*';
// import Activity from 'android.app.Activity';

// let queue = undefined;

// Alloy.Globals.startRequest = function(url, winActivity) {
// 	const activity = new Activity(winActivity);
//     Ti.API.debug('Request Queue: ', queue);

//     if (!queue)
//         queue = VolleyToolbox.Volley.newRequestQueue(activity);

// 	const request = new VolleyToolbox.StringRequest(VolleyPackage.Request.Method.GET, url,
// 		new VolleyPackage.Response.Listener({
// 			onResponse: (response) => {
// 				Ti.API.info('Response is: ' + JSON.parse(response)[0].word);
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