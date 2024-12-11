import { writeFileSync } from "fs";
import { BLOCKED_SITES, REDIRECT_TO } from "./config";

writeFileSync(
	"./dist/manifest.json",
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
				"tabs",
			],
			host_permissions: BLOCKED_SITES.map((site) => `*://*.${site}/*`),
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
	"./dist/rules.json",
	JSON.stringify(
		REDIRECT_TO
			? [
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
							urlFilter: `||${BLOCKED_SITES.join("|")}`,
							resourceTypes: ["main_frame"],
						},
					},
			  ]
			: [],
		null,
		2
	)
);

console.log("Extension files generated successfully!");
