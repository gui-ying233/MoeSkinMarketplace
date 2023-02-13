fetch("https://api.github.com/repos/gui-ying233/MoeSkinMarketplace/contents")
	.then((response) => response.json())
	.then((data) => {
		data.forEach((file) => {
			if (file.type === "dir") {
				console.log(file.name);
			}
		});
	})
	.catch((error) => {
		console.error(error);
	});
