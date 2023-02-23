"use strict";

fetch(
	"https://api.github.com/repos/gui-ying233/MoeSkinMarketplace/contents/goods/" +
		window.location.pathname.slice(1, -5)
)
	.then((response) => response.json())
	.then((data) => {
		data.forEach((file) => {
			if (file.type === "dir") {
				const good = document.createElement("a");
				good.classList.add("good");
				good.href =
					"goods/" +
					window.location.pathname.slice(1, -5) +
					"/" +
					file.name +
					"/main.html";
				good.innerText = file.name;
				document.getElementById("goods").appendChild(good);
			}
		});
	})
	.catch((error) => {
		console.error(error);
	});
