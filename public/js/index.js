const dropZone = document.querySelector(".drop-zone");
const browseBtn = document.querySelector(".browseBtn");
const fileInput = document.querySelector("#file-input");
const progressContainer = document.querySelector(".progress-container");
const bgProgress = document.querySelector(".bg-progress");
const progessBar = document.querySelector(".progress-bar");
const percentDiv = document.querySelector("#percent");
const fileUrl = document.querySelector("#fileURL");
const sharingContainer = document.querySelector(".sharing-container");
const copyBtn = document.querySelector("#copyBtn");
const emailForm = document.querySelector("#emailForm");
const toast = document.querySelector(".toast");
const maxAllowedSize = 10 * 1024 * 1024;

const host = "https://inshare.onrender.com";
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

copyBtn.addEventListener("click", () => {
  fileUrl.select();
  document.execCommand("copy");
  showToast("Link Copied");
});

emailForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = {
    uuid: fileUrl.value.split("/").splice(-1, 1)[0],
    emailTo: emailForm.elements["to-email"].value,
    emailFrom: emailForm.elements["from-email"].value,
  };

  axios
    .post(host + "/api/v1/mail", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      if (res.status === 200) {
        sharingContainer.style.display = "none";
        showToast("Email Sent");
      }
    })
    .catch((err) => console.log(err));
});

const upLoadFile = () => {
  if (fileInput.files.length > 1) {
    showToast("Only upload one file");
    fileInput.value = "";
    return;
  }
  const file = fileInput.files[0];

  if (file.size > maxAllowedSize) {
    showToast("File size greater than 10MB");
    fileInput.value = "";
    return;
  }
  progressContainer.style.display = "block";
  const formData = new FormData();
  formData.append("file", file);

  axios
    .post(uploadUrl, formData, {
      onUploadProgress: updateProgress,
    })
    .then((res) => {
      onUploadSuccess(res.data);
    })
    .catch((err) => {
      fileInput.value = "";
      showToast(err.message);
    });
};

const updateProgress = (e) => {
  const percent = Math.round((e.loaded / e.total) * 100);
  bgProgress.style.width = `${percent}%`;
  percentDiv.innerText = percent;
  progessBar.style.transform = `scaleX(${percent / 100})`;
};

const onUploadSuccess = ({ file: url }) => {
  fileInput.value = "";
  progressContainer.style.display = "none";
  fileUrl.value = url;
  sharingContainer.style.display = "block";
};

let toastTimer;
const showToast = (msg) => {
  clearTimeout(toastTimer);
  toast.innerText = msg;
  toast.style.transform = "translate(50%,0)";
  toastTimer = setTimeout(() => {
    toast.style.transform = "translate(50%,160px)";
  }, 2000);
};
