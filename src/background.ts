import { BLOCKED_SITES, REDIRECT_TO } from "./config";

function shouldBlock(url: string) {
	if (REDIRECT_TO && url === REDIRECT_TO) return false;
	const hostname = new URL(url).hostname.replace(/^www\./, "");
	return BLOCKED_SITES.includes(hostname);
}

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
	if (details.frameId !== 0) return; // dont redirect iframes -- causes false positives on google search results

	if (shouldBlock(details.url)) {
		if (REDIRECT_TO === null) {
			chrome.tabs.remove(details.tabId);
		} else {
			chrome.tabs.update(details.tabId, {
				url: REDIRECT_TO,
			});
		}
	}
});
