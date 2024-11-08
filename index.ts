import { writeFileSync } from "fs";
import { REDIRECT_SITES, REDIRECT_TO } from "./src/config";

writeFileSync(
	"manifest.json",
	JSON.stringify(
		{
			manifest_version: 3,
			name: "Focus Redirect",
			version: "1.0",
			description: "Redirects social media sites to BlueSky",
			permissions: [
				"webNavigation",
				"webRequest",
				"declarativeNetRequest",
			],
			host_permissions: REDIRECT_SITES.map((site) => `*://*.${site}/*`),
			background: {
				service_worker: "background.js",
			},
			declarative_net_request: {
				rule_resources: [
					{
						id: "ruleset",
						enabled: true,
						path: "rules.json",
					},
				],
			},
		},
		null,
		2
	)
);

writeFileSync(
	"rules.json",
	JSON.stringify(
		[
			{
				id: 1,
				priority: 1,
				action: {
					type: "redirect",
					redirect: {
						url: REDIRECT_TO,
					},
				},
				condition: {
					urlFilter: REDIRECT_SITES.join("|"),
					resourceTypes: ["main_frame"],
				},
			},
		],
		null,
		2
	)
);

console.log("Extension files generated successfully!");
