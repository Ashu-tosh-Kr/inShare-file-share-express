const dropZone = document.querySelector(".drop-zone");
const browseBtn = document.querySelector(".browseBtn");
const fileInput = document.querySelector("#file-input");
const progressContainer = document.querySelector(".progress-container");
const bgProgress = document.querySelector(".bg-progress");
const progessBar = document.querySelector(".progress-bar");
const percentDiv = document.querySelector("#percent");

const host = "http://localhost:8800";
const uploadUrl = host + "/api/v1/files";

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  if (!dropZone.classList.contains("dragged"))
    dropZone.classList.add("dragged");
});

dropZone.addEventListener("dragleave", (e) => {
  dropZone.classList.remove("dragged");
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("dragged");
  if (e.dataTransfer.files.length) {
    fileInput.files = e.dataTransfer.files;
    upLoadFile();
  }
});

fileInput.addEventListener("change", () => {
  upLoadFile();
});

browseBtn.addEventListener("click", () => {
  fileInput.click();
});

const upLoadFile = () => {
  progressContainer.style.display = "block";
  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("file", file);

  // const xhr = new XMLHttpRequest();
  // xhr.onreadystatechange = () => {
  //   if (xhr.readyState === XMLHttpRequest.DONE) {
  //     console.log(xhr.response);
  //     showLink(JSON.parse(xhr.response));
  //   }
  // };

  // xhr.onprogress = updateProgress;

  // xhr.open("POST", uploadUrl);
  // xhr.send(formData);
  axios
    .post(uploadUrl, formData, {
      onUploadProgress: updateProgress,
    })
    .then((res) => console.log(res.data));
};

const updateProgress = (e) => {
  const percent = Math.round((e.loaded / e.total) * 100);
  bgProgress.style.width = `${percent}%`;
  percentDiv.innerText = percent;
  progessBar.style.transform = `scaleX(${percent / 100})`;
};

const showLink = ({ file }) => {
  progressContainer.style.display = "none";
};
