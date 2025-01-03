// Input Data
const formData = document.querySelector("#formData");
const inputName = document.querySelector("#fullname");
const owner = document.querySelector("#owner");
const email = document.querySelector("#email");
const address = document.querySelector("#address");
const phone = document.querySelector("#phone");
const category = document.querySelector("#categorys");
const btnCloseModal = document.querySelector("#btnCloseModal");
var companies = [];
let currentEditIndex = null;
// View the company information
const viewCompany = document.querySelector(".viewNameCompany");
const viewOwner = document.querySelector(".viewNameOwner");
const viewAddress = document.querySelector(".viewAddress");
const viewNumber = document.querySelector(".viewNumber");
const viewEmail = document.querySelector(".viewEmail");
const viewType = document.querySelector(".viewType");
// update teh company
const UpdateTitle = document.querySelector("#titleUpdate");
const btnUpdate = document.querySelector("#btnUpdate");

formData.addEventListener("submit", (e) => {
  e.preventDefault();
  const company = {
    name: inputName.value,
    owner: owner.value,
    email: email.value,
    address: address.value,
    phone: phone.value,
    category: category.value,
  };
  if (currentEditIndex !== null) {
    // Update existing company
    Swal.fire({
      title: "success",
      text: "Company has been Update",
      icon: "success",
    });
    UpdateTitle.innerHTML = "Add Company";
    btnUpdate.innerHTML = "Save";
    companies[currentEditIndex] = company;
    currentEditIndex = null; // Reset the edit mode
  } else {
    // Add new company
    Swal.fire({
      title: "success",
      text: "Company has been added",
      icon: "success",
    });
    companies.push(company);
  }
  renderCompany();
  setItemInStorage();
  clearForm();
});
document.addEventListener("DOMContentLoaded", () => {
  getItemInStorage();
  renderCompany();
});
const renderCompany = () => {
  const tbody = document.querySelector("#tbody");
  if (!tbody) {
    console.error("Error: The element with id 'tbody' was not found.");
    return;
  }

  // Clear existing rows in the table body
  tbody.innerHTML = "";

  // Loop through the companies array to create table rows dynamically
  companies.forEach((item, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
          <td>${index + 1}</td>
          <td>${item.name}</td>
          <td>${item.owner}</td>
          <td>${item.address}</td>
          <td>${item.email}</td>
          <td class="d-flex gap-2">
            <button
              class="btn btn-sm btn-primary btn-view"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              View
            </button>
            <button
              class="btn btn-sm btn-success btn-update"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Update
            </button>
            <button class="btn btn-sm btn-danger btn-delete">
              Delete
            </button>
          </td>
        `;

    // Append the new row to the table body
    tbody.appendChild(tr);

    // Add event listeners for buttons (optional)
    const deleteButton = tr.querySelector(".btn-delete");
    const updateButton = tr.querySelector(".btn-update");
    const viewButton = tr.querySelector(".btn-view");

    if (deleteButton) {
      deleteButton.addEventListener("click", () => {
        // Handle delete logic here
        Swal.fire({
          title: "Are you sure?",
          text: "You want to delete this item?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            companies.splice(index, 1);
            renderCompany();
            setItemInStorage();
          }
        });
        // Example: Remove the item from the array and re-render
      });
    }

    if (updateButton) {
      updateButton.addEventListener("click", () => {
        btnCloseModal.addEventListener("click", () => {
          Swal.fire({
            title: "Are you sure?",
            text: "You don't want to update this item?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I don't",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Success!",
                text: "Your process was well.",
                icon: "success",
              });
              UpdateTitle.innerHTML = "Add Company";
              btnUpdate.innerHTML = "Save";
              clearForm();
            }
          });
        });
        UpdateTitle.innerHTML = "Update Company";
        btnUpdate.innerHTML = "Update";
        const correctIndex = companies.findIndex((c) => c.name === item.name);
        if (correctIndex > -1) {
          const correctItem = companies[correctIndex];
          // Populate the form with the selected item's data
          inputName.value = correctItem.name;
          owner.value = correctItem.owner;
          email.value = correctItem.email;
          address.value = correctItem.address;
          phone.value = correctItem.phone;
          category.value = correctItem.category;

          // Set the currentEditIndex to the item's index
          currentEditIndex = correctIndex;
        }
      });
    }

    if (viewButton) {
      viewButton.addEventListener("click", () => {
        viewCompany.innerHTML = item.name;
        viewOwner.innerHTML = item.owner;
        viewAddress.innerHTML = item.address;
        viewNumber.innerHTML = item.phone;
        viewEmail.innerHTML = item.email;
        viewType.innerHTML = item.category;
      });
    }
  });
};

const setItemInStorage = () => {
  localStorage.setItem("lists", JSON.stringify(companies));
};
const getItemInStorage = () => {
  const storedLists = localStorage.getItem("lists");
  if (storedLists) {
    companies = JSON.parse(storedLists);
    renderCompany();
  }
};
const clearForm = () => {
  inputName.value = "";
  owner.value = "";
  email.value = "";
  address.value = "";
  phone.value = "";
  currentEditIndex = null;
};
const btnOut = document.querySelector("#btnOut");
btnOut.addEventListener("click", () => {
  let timerInterval;
  Swal.fire({
    title: "Ready to logout!",
    html: "it will close in <b></b> milliseconds.",
    timer: 1500,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector("b");
      timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      window.location.href = "index.html";
    }
  });
});
