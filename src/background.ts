import { REDIRECT_SITES, REDIRECT_TO } from "./config";

chrome.webNavigation.onBeforeNavigate.addListener(
	function (details) {
		if (details.url.match(new RegExp(REDIRECT_SITES.join("|")))) {
			chrome.tabs.update(details.tabId, {
				url: REDIRECT_TO,
			});
		}
	},
	{
		url: [
			{
				urlMatches: REDIRECT_SITES.join("|"),
			},
		],
	}
);
