document.getElementById("modal-overlay").addEventListener("click", closeModal);

function closeModal() {
  const modal = document.getElementById("modal");
  const modalOverlay = document.getElementById("modal-overlay");
  modal.classList.remove("show-modal");
  modalOverlay.classList.remove("show-overlay");

  clearModalData();
}

function showModal() {
  clearModalData();

  const modal = document.getElementById("modal");
  modal.classList.add("show-modal");

  const modalOverlay = document.getElementById("modal-overlay");
  modalOverlay.classList.add("show-overlay");

  const modalClose = document.createElement("div");
  const modalCloseText = document.createTextNode("✖");
  modalClose.appendChild(modalCloseText);
  modalClose.id = "modal-close";
  modalClose.addEventListener("click", closeModal);
  modal.appendChild(modalClose);
}

function clearModalData() {
  const modal = document.getElementById("modal");
  let child = modal.lastElementChild;
  while (child) {
    modal.removeChild(child);
    child = modal.lastElementChild;
  }
}

function showModalMessage(message) {
  const modal = document.getElementById("modal");
  showModal();

  const confirmMessageDiv = document.createElement("div");
  confirmMessageDiv.id = "confirm-message-div";
  const confirmMessage = document.createTextNode(message);
  confirmMessageDiv.appendChild(confirmMessage);

  modal.appendChild(confirmMessageDiv);
}
