function share() {
    let btn = document.getElementById("btn-share");

    btn.addEventListener("click", (e) => {
        let jsonobj = StorageAPI.getItems();
        let queryString = Object.keys(jsonobj)
            .map((key) => key + "=" + jsonobj[key])
            .join("&");
        let url = `${window.location.origin}${window.location.pathname}?${queryString}`;
        // let url = encodeURI(`${window.location.href}?${queryString}`);
        // url 在不同瀏覽器有長度限制，超過改為下載檔案
        if (url.length > 8000) {
            let jsonse = JSON.stringify(jsonobj);
            var blob = new Blob([jsonse], { type: "application/json" });
            var url2 = URL.createObjectURL(blob);

            let btn = document.getElementById("btn-download");
            btn.href = url2;
            btn.download = "ddtools_callStorage.json";
            btn.click();
        } else {
            navigator.share({
                title: document.title,
                text: "DD Tools Json File",
                url: url,
            });
        }
    });
}

export { share }

<button id="btn-share" class="button is-white mb-0">
<span class="icon">
  <i class="material-symbols-outlined">
    share
  </i>
</span>
</button>