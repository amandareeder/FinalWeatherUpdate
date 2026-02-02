const apiKey = "7b0d58637c1c36b220915d55f06438df";

const weatherURL =
  `https://api.openweathermap.org/data/2.5/weather?q=Tooele&units=imperial&appid=${apiKey}`;

fetch(weatherURL)
  .then(response => response.json())
  .then(data => {
    document.getElementById("five-city").textContent = data.name;
    document.getElementById("current-desc").textContent = data.weather[0].description;
    document.getElementById("current-temp").textContent = Math.round(data.main.temp);
    document.getElementById("current-feelsLike").textContent = Math.round(data.main.feels_like);
    document.getElementById("current-humid").textContent = data.main.humidity;
    document.getElementById("current-windSpeed").textContent = Math.round(data.wind.speed);

    const temp = data.main.temp;
    const speed = data.wind.speed;

    let windChill = "N/A";
    if (temp <= 50 && speed > 3) {
      windChill = Math.round(
        35.74 +
        0.6215 * temp -
        35.75 * Math.pow(speed, 0.16) +
        0.4275 * temp * Math.pow(speed, 0.16)
      );
    }

    document.getElementById("current-windChill").textContent = windChill;
  })
  .catch(error => console.error("Weather API Error:", error));


/*
 NEWS API
 */
const newsApiKey = "610ccf5d18b145d5b18addf795d5d6c2";

const newsURL =
  `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${newsApiKey}`;

fetch(newsURL)
  .then(response => response.json())
  .then(data => {
    const newsContainer = document.getElementById("news-container");

    data.articles.forEach(article => {
      const articleDiv = document.createElement("div");
      articleDiv.classList.add("news-article");

      if (article.urlToImage) {
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;
        articleDiv.appendChild(img);
      }

      const titleLink = document.createElement("a");
      titleLink.href = article.url;
      titleLink.target = "_blank";
      titleLink.textContent = article.title;

      const desc = document.createElement("p");
      desc.textContent = article.description || "No description available.";

      articleDiv.appendChild(titleLink);
      articleDiv.appendChild(desc);

      newsContainer.appendChild(articleDiv);
    });
  })
  .catch(error => console.error("News API Error:", error));
