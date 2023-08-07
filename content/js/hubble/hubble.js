hljs.registerLanguage('srt', function (hljs) {
  return {
    contains: [
      {
        className: 'comment',
        begin: '([0-9]{2}:){2}[0-9]{2},[0-9]{3} --> ([0-9]{2}:){2}[0-9]{2},[0-9]{3}',
        relevance: 10
      },
      {
        className: 'comment',
        begin: '\\d+$',
        relevance: 10
      },
      {
        className: 'text',
        begin: '^[^\\d]+',
        relevance: 0
      }
    ]
  };
});

function preload_image(img_url) {
  let img = new Image();
  img.src = img_url;
}

const images = ["hubble-1.png", "hubble-2.png", "hubble-3.png", "hubble-4.png", "hubble-5.png", "hubble-6.png", "hubble-7.png", "hubble-8.png", "hubble-9.png"];
for (image of images) {
  preload_image("../../img/hubble/" + image);
}

let currentImageIndex = 0;
const imageElement = document.querySelector("#image-container img");
const replayButton = document.querySelector("#replay-link");

function isImageFullyVisible() {
  const rect = imageElement.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= windowHeight &&
    rect.right <= windowWidth
  );
}

window.addEventListener("scroll", function() {
  console.log(replayButton.style.display);
  if (isImageFullyVisible() && replayButton.style.display === "") {
    replayButton.style.display = "none";
    console.log("Image is fully visible!");
    changeImage();
  }
});

function changeImage() {
  if (currentImageIndex < images.length - 1) {
    currentImageIndex++;
    imageElement.src = "../../img/hubble/" + images[currentImageIndex];
    setTimeout(changeImage, 500);
  } else {
    replayButton.style.display = "block";
  }
}

replayButton.addEventListener("click", function(event) {
  event.preventDefault(); // prevent the default behavior of the link element
  currentImageIndex = 0;
  imageElement.src = "../../img/hubble/" + images[currentImageIndex];
  replayButton.style.display = "";
});
