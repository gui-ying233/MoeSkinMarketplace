"use strict";

fetch("https://api.github.com/repos/gui-ying233/MoeSkinMarketplace/contents")
	.then((response) => response.json())
	.then((data) => {
		data.forEach((file) => {
			if (file.type === "dir") {
				console.log(file.name);
			}
			xq;
		});
	})
	.catch((error) => {
		console.error(error);
	});

document.addEventListener("DOMContentLoaded", () => {
	const headingsCounter = new Object();
	const headings = document.body.querySelectorAll("h1, h2, h3, h4, h5, h6");
	for (let i = 0; i < headings.length; i++) {
		if (headingsCounter[headings[i].innerText]) {
			headingsCounter[headings[i].innerText]++;
			headings[i].setAttribute(
				"id",
				encodeURI(headings[i].innerText) +
					"_" +
					headingsCounter[headings[i].innerText]
			);
			headings[i].innerHTML =
				"<a href='#" +
				encodeURI(headings[i].innerText) +
				"_" +
				headingsCounter[headings[i].innerText] +
				"'>" +
				headings[i].innerHTML +
				"</a>";
		} else {
			headings[i].setAttribute("id", encodeURI(headings[i].innerText));
			headings[i].innerHTML =
				"<a href='#" +
				encodeURI(headings[i].innerText) +
				"'>" +
				headings[i].innerHTML +
				"</a>";
			headingsCounter[headings[i].innerText] = 1;
		}
	}

	const pres = [...document.getElementsByTagName("pre")];
	if (pres.length) {
		for (let i = 0; i < pres.length; i++) {
			pres[i].innerHTML =
				"<code class='language-" +
				pres[0].getAttribute("lang") +
				"'>" +
				pres[i].innerHTML +
				"</code>";
		}
		const preScript = document.createElement("script");
		preScript.type = "text/javascript";
		preScript.addEventListener("load", (event) => {
			hljs.highlightAll();
		});
		preScript.src =
			"//unpkg.com/@highlightjs/cdn-assets@11.7.0/highlight.min.js";
		document.head.appendChild(preScript);
	}
});
