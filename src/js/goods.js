"use strict";

fetch(
	`https://api.github.com/repos/gui-ying233/MoeSkinMarketplace/contents/goods/${document.URL.replace(
		/.+\/(css|js).html/,
		"$1"
	)}`
)
	.then((response) => {
		if (response.status !== 200) {
			document.getElementById(
				"goods"
			).innerHTML = `<p style="text-indent:0;">${String(
				response.status + response.statusText
			)}</p>`;
		}
		return response.json();
	})
	.then((data) => {
		data.forEach((file) => {
			if (file.type === "dir") {
				const good = document.createElement("a");
				good.classList.add("good");
				good.href = `./goods/${document.URL.replace(
					/.+\/(css|js).html/,
					"$1"
				)}/${file.name}/main.html`;
				fetch(
					`../goods/${document.URL.replace(
						/.+\/(css|js).html/,
						"$1"
					)}/${file.name}/banner.png`
				).then((response) => {
					if (response.ok) {
						good.innerHTML += `<img src="../goods/${document.URL.replace(
							/.+\/(css|js).html/,
							"$1"
						)}/${file.name}/banner.png" alt="${file.name}">`;
					}
					good.innerHTML += `<p>${file.name}</p>`;
				});
				document.getElementById("goods").appendChild(good);
			}
		});
	})
	.catch((error) => {
		console.error(error);
	});
