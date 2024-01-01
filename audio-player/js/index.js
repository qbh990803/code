function parseLrc(lrc = "") {
  const data = lrc.split("\n");

  const result = data.map((i) => {
    const arr = i.split("]");

    return {
      time: parseTime(arr[0].slice(1)),
      words: arr[1],
    };
  });

  return result;
}

function parseTime(timeStr = "00:00.00") {
  const arr = timeStr.split(":");

  const sec = +arr[0] * 60 + +arr[1];

  return sec;
}

const lrcData = parseLrc(lrc);

console.log("lrcData", lrcData);

const doms = {
  audio: document.querySelector("audio"),
  ul: document.querySelector(".lrc-list"),
  container: document.querySelector(".container"),
};

function findIndex(data = lrcData, time = doms.audio.currentTime) {
  const index = data.findIndex((i) => i.time > time);
  let result = index - 1;

  if (result === -2) {
    result = data.length - 1;
  }

  return result;
}

function createLrcElement(data = lrcData, container = doms.ul) {
  const fragment = document.createDocumentFragment();

  data.forEach((i) => {
    const li = document.createElement("li");
    li.textContent = i.words;
    fragment.appendChild(li);
  });

  container.appendChild(fragment);
}

createLrcElement();

const containerHeight = doms.container.clientHeight;
const liHeight = doms.ul.children[0].clientHeight;
const maxOffset = doms.ul.clientHeight - doms.container.clientHeight;

function offset() {
  const index = findIndex();
  if (index === -1) return;

  let offset = index * liHeight + liHeight / 2 - containerHeight / 2;
  if (offset < 0) {
    offset = 0;
  } else if (offset > maxOffset) {
    offset = maxOffset;
  }

  const li = doms.ul.querySelector(".active");
  if (li) {
    li.classList.remove("active");
  }

  console.log("index", index);
  console.log("offset", offset);
  doms.ul.style.transform = `translateY(${-offset}px)`;
  doms.ul.children[index].classList.add("active");
}

doms.audio.addEventListener("timeupdate", offset);
