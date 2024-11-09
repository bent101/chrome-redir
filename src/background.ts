import { REDIRECT_SITES, REDIRECT_TO } from "./config";

function shouldRedirect(url: string) {
	if (url === REDIRECT_TO) return false; // avoids cluttering logs and infinite loop

	const hostname = new URL(url).hostname.replace(/^www\./, "");
	const shouldRedirect = REDIRECT_SITES.includes(hostname);

	console.table({ url, hostname, shouldRedirect });

	return shouldRedirect;
}

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
	if (details.frameId !== 0) return; // dont redirect iframes

	if (shouldRedirect(details.url)) {
		chrome.tabs.update(details.tabId, {
			url: REDIRECT_TO,
		});
	}
});
