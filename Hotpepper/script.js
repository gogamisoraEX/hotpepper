const API_KEY = "80a343317afa3b8e"
const API_URL = "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/"

document.getElementById("search-form"),addEventListener("submit", async (event) => {
    console.log(API_KEY);
    event.preventDefault();
    const keyword = document.getElementById("keyword").value;
    document.getElementById("results").innerHTML = keyword;
    //CORS回避用のプロキシURL
    const proxyUrl = "https://api.allorigins.win/raw?url=";
    const url = `${proxyUrl}${encodeURIComponent(`${API_URL}?key=${API_KEY}&format=json&keyword=${encodeURIComponent(keyword)}&count=10`)}`;
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`HTTPエラー: ${response.status}`);
        }
        const data = await response.json();
        displayResults(data.results.shop);
    }
    catch (error) {
        document.getElementById("results").innerHTML = "データ取得に失敗しました。";
        console.error("データ取得に失敗しました。");
    }
});

function displayResults(shops) {
    const resultsDiv = document.getElementById("results");
    if(shops && shops.length > 0) {
        shops.forEach(shop => {
            const shopDiv = document.createElement("div");
            shopDiv.innerHTML = `
                <h2>${shop.name}</h2>
                <p>住所:${shop.address}</p>
                <p><a href = "http://${shop.log_image}">${shop.log_image}</a></p>
                <hr>
            `;
            resultsDiv.appendChild(shopDiv);
        });
    }
    else {
        resultsDiv.innerHTML = "該当する店舗がありませんでした。";
    }
}