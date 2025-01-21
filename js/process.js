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
// update the company
const UpdateTitle = document.querySelector("#titleUpdate");
const btnUpdate = document.querySelector("#btnUpdate");
// type to count
const goldCount = document.querySelector("#goldCount");
const landCount = document.querySelector("#landCount");
const financeCount = document.querySelector('#financeCount');
const totalType = document.querySelector('#totalCount');

// sort by category
const sortByType = document.querySelector('#sortByType');
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
    if(validationForm()){
      companies.push(company);
    }
    goldCountCompanies();
    landCountCompanies();
    financeCountCompanies();
    countAllCompanies();
  }
  renderCompany(companies);
  setItemInStorage();
  clearForm();
});
document.addEventListener("DOMContentLoaded", () => {
  getItemInStorage();
  renderCompany(companies);
  goldCountCompanies();
  landCountCompanies();
  financeCountCompanies();
  countAllCompanies();
});
// set data in localStorage
const setItemInStorage = () => {
  localStorage.setItem("lists", JSON.stringify(companies));
};
// render data from localStorage
const getItemInStorage = () => {
  const storedLists = localStorage.getItem("lists");
  if (storedLists) {
    companies = JSON.parse(storedLists);
    renderCompany(companies);
  }
};
// clear form after input
const clearForm = () => {
  inputName.value = "";
  owner.value = "";
  email.value = "";
  address.value = "";
  phone.value = "";
  currentEditIndex = null;
};
// logout dashboard
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
// total number of gold companies
const goldCountCompanies =()=>{
  let selectCompanies =  companies.filter((e)=> e.category === "Gold");
  goldCount.innerHTML = selectCompanies.length;
}
// total number of land companies
const landCountCompanies = ()=>{
  let selectCompanies =  companies.filter((e)=> e.category === "Land");
  landCount.innerHTML = selectCompanies.length;
}
// total number of finances
const financeCountCompanies = ()=>{
  let selectCompanies =  companies.filter((e)=> e.category === "Finance");
  financeCount.innerHTML = selectCompanies.length;
}
// total number of companies
const countAllCompanies = ()=>{
  totalType.innerHTML = companies.length;
}
// sort by type
sortByType.addEventListener("change",(e)=>{

  const type = e.target.value;
  const filterCompany = companies.filter((com)=>{
    return com.category === type;
  })
  if( type === "ALL"){
    renderCompany(companies)
  }else{
    renderCompany(filterCompany)
  }
  
})
// show on html page
const renderCompany = (arrayProducts) => {
  const displayProduct = arrayProducts;
  tbody.innerHTML = "";
  displayProduct.forEach((item, index) => {
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
    tbody.appendChild(tr);

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
            renderCompany(companies);
            setItemInStorage();
            goldCountCompanies();
            landCountCompanies();
            financeCountCompanies();
            countAllCompanies();
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
      viewBtn(viewButton,item);
    }

  })
    
}
// detail view of company
const viewBtn =(btn,item)=>{
  btn.addEventListener("click", () => {
    viewCompany.innerHTML = item.name;
    viewOwner.innerHTML = item.owner;
    viewAddress.innerHTML = item.address;
    viewNumber.innerHTML = item.phone;
    viewEmail.innerHTML = item.email;
    viewType.innerHTML = item.category;
  });

}
// sort by name
const sortByName = document.querySelector("#sortByName");
sortByName.addEventListener("change",(e)=>{

  const nameCompany = e.target.value;
  if(nameCompany === 'A-Z'){
    companies.sort((a, b) => a.name.localeCompare(b.name));
    renderCompany(companies);
  }else{
    
    companies.sort((a, b) => a.name.localeCompare(b.name));
    renderCompany(companies.reverse());
  }

})
// search company 
const searchCompany = document.querySelector("#search");
searchCompany.addEventListener("keyup",()=>{
  const searchValue = searchCompany.value.toLowerCase();
  const result = companies.filter((com) => com.name.toLowerCase().includes(searchValue));
  renderCompany(result);
})
// Validation form
const validationForm =()=>{
  const nameValue = inputName.value.trim();
  const ownerValue = owner.value.trim();
  const emailValue = email.value.trim();
  const addressValue = address.value.trim();
  const phoneValue = phone.value.trim();
  const categoryValue = category.value;
  if(nameValue === "" || ownerValue === "" || emailValue === "" || addressValue === "" || phoneValue === "" || categoryValue === ""){
    Swal.fire({
      title: "Error!",
      text: "Please fill in all fields",
      icon: "error",
    });
    return false;
  }else{
    return true;
  }
}