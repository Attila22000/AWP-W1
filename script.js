const breeds = [
  { name: "Golden Retriever", api: "retriever/golden", wiki: "Golden_Retriever" },
  { name: "Labrador", api: "labrador", wiki: "Labrador_Retriever" },
  { name: "Border Collie", api: "collie/border", wiki: "Border_Collie" },
  { name: "German Shepherd", api: "germanshepherd", wiki: "German_Shepherd" },
  { name: "Shiba Inu", api: "shiba", wiki: "Shiba_Inu" }
];

const container = document.getElementById("wiki-container");

async function fetchImage(breed) {
  const url = `https://dog.ceo/api/breed/${breed}/images/random`;
  const response = await fetch(url);
  const data = await response.json();
  return data.message;
}

async function fetchWikiText(title) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.extract || "No information found.";
}

function createWikiItem(name, text, imageUrl) {
  const item = document.createElement("div");
  item.className = "wiki-item";

  const header = document.createElement("h1");
  header.className = "wiki-header";
  header.textContent = name;

  const content = document.createElement("div");
  content.className = "wiki-content";

  const paragraph = document.createElement("p");
  paragraph.className = "wiki-text";
  paragraph.textContent = text;

  const imgContainer = document.createElement("div");
  imgContainer.className = "img-container";

  const img = document.createElement("img");
  img.className = "wiki-img";
  img.src = imageUrl;
  img.alt = name;

  imgContainer.appendChild(img);
  content.appendChild(paragraph);
  content.appendChild(imgContainer);
  item.appendChild(header);
  item.appendChild(content);
  container.appendChild(item);
}

async function init() {
  for (const breed of breeds) {
    try {
      const [img, text] = await Promise.all([
        fetchImage(breed.api),
        fetchWikiText(breed.wiki)
      ]);
      createWikiItem(breed.name, text, img);
    } catch (error) {
      console.error("Error loading breed:", breed.name, error);
    }
  }
}

init();