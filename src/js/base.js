"use strict";

document.addEventListener("DOMContentLoaded", () => {
	const themeStyle = document.createElement("style");
	themeStyle.id = "theme";
	const themeCookie = document.cookie.replace(
		/(?:(?:^|.*;\s*)theme\s*=\s*([^;]*).*$)|^.*$/,
		"$1"
	);
	fetch(
		`/MoeSkinMarketplace/src/css/theme/${themeCookie || "default"}.css`
	).then((response) => {
		response.text().then((data) => {
			themeStyle.innerHTML = data;
		});
	});
	document.head.appendChild(themeStyle);
	const header = document.createElement("header");
	header.innerHTML =
		'<nav><a href="/MoeSkinMarketplace">首页</a><a href="/MoeSkinMarketplace/css.html">CSS</a><a href="/MoeSkinMarketplace/js.html">JS</a><label id="themeSelector" for="theme-select">主题：</label></nav>';
	document.body.prepend(header);
	const themes = document.createElement("select");
	themes.name = "theme-select";
	themes.id = "theme-select";
	fetch(
		"https://api.github.com/repos/gui-ying233/MoeSkinMarketplace/contents/src/css/theme"
	)
		.then((response) => response.json())
		.then((data) => {
			for (const f of data) {
				const theme = document.createElement("option");
				theme.value = f.name.slice(0, -4);
				theme.text = f.name.slice(0, -4);
				theme.translate = false;
				if (theme.value === themeCookie) {
					theme.selected = true;
				}
				themes.appendChild(theme);
			}
		})
		.catch((error) => {
			console.error(error);
		});
	themes.addEventListener("change", (event) => {
		fetch(
			`/MoeSkinMarketplace/src/css/theme/${event.target.value}.css`
		).then((response) => {
			response.text().then((data) => {
				document.getElementById("theme").innerHTML = data;
			});
		});
		document.cookie = `theme=${event.target.value}`;
		setTimeout(() => {
			for (
				let i = 0;
				i < [...document.body.querySelectorAll("pre")].length;
				i++
			) {
				document.body.querySelectorAll("pre")[i].style.color =
					document.defaultView.getComputedStyle(
						document.body.querySelectorAll("pre > code.hljs")[i]
					).color;
			}
		}, 100);
	});
	document.body.getElementsByTagName("nav")[0].appendChild(themes);

	const headingsCounter = new Object();
	const headings = document.body.querySelectorAll("h1, h2, h3, h4, h5, h6");
	for (let i = 0; i < headings.length; i++) {
		if (headingsCounter[headings[i].innerText]) {
			headingsCounter[headings[i].innerText]++;
			headings[i].setAttribute(
				"id",
				`${encodeURI(headings[i].innerText)}_${
					headingsCounter[headings[i].innerText]
				}`
			);
			headings[i].innerHTML = `<a href='#${encodeURI(
				headings[i].innerText
			)}_${headingsCounter[headings[i].innerText]}'>${
				headings[i].innerHTML
			}</a>`;
		} else {
			headings[i].setAttribute("id", encodeURI(headings[i].innerText));
			headings[i].innerHTML = `<a href='#${encodeURI(
				headings[i].innerText
			)}'>${headings[i].innerHTML}</a>`;
			headingsCounter[headings[i].innerText] = 1;
		}
	}

	const pres = [...document.getElementsByTagName("pre")];
	if (pres.length) {
		for (let i = 0; i < pres.length; i++) {
			pres[i].innerHTML = `<code class='language-${pres[0].getAttribute(
				"lang"
			)}'>${pres[i].innerHTML}</code>`;
		}
		const preScript = document.createElement("script");
		preScript.type = "text/javascript";
		preScript.addEventListener("load", () => {
			hljs.highlightAll();
			window.onload = () => {
				for (
					let i = 0;
					i < [...document.body.querySelectorAll("pre")].length;
					i++
				) {
					document.body.querySelectorAll("pre")[i].style.color =
						document.defaultView.getComputedStyle(
							document.body.querySelectorAll("pre > code.hljs")[i]
						).color;
				}
			};
		});
		preScript.src =
			"//unpkg.com/@highlightjs/cdn-assets@11.7.0/highlight.min.js";
		document.head.appendChild(preScript);
	}
});
