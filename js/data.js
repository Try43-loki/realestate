// let btnUpdate = document.querySelector("#btnUpdate");

// let btnUpdateform = document.querySelector(".btn-update");
// let titleUpdate = document.querySelector("#titleUpdate");

// btnUpdateform.addEventListener("click", () => {
//   btnUpdate.innerHTML = "Update";
//   titleUpdate.innerHTML = "Update Company";
// });
// const btnAdd = document.querySelector("#btnAdd");
// btnAdd.addEventListener("click", () => {
//   btnUpdate.innerHTML = "Save";
//   titleUpdate.innerHTML = "Add Company";
// });
// btnUpdate.addEventListener("click", () => {
//   const textBtn = btnUpdate.innerHTML;
//   if (textBtn == "Save") {
//     Swal.fire({
//       title: "success",
//       text: "Company has been added",
//       icon: "success",
//     });
//   } else {
//     Swal.fire({
//       title: "success",
//       text: "Company has been Update",
//       icon: "success",
//     });
//   }
// });
// const btnOut = document.querySelector("#btnOut");
// btnOut.addEventListener("click", () => {
//   let timerInterval;
//   Swal.fire({
//     title: "Ready to logout!",
//     html: "it will close in <b></b> milliseconds.",
//     timer: 1500,
//     timerProgressBar: true,
//     didOpen: () => {
//       Swal.showLoading();
//       const timer = Swal.getPopup().querySelector("b");
//       timerInterval = setInterval(() => {
//         timer.textContent = `${Swal.getTimerLeft()}`;
//       }, 100);
//     },
//     willClose: () => {
//       clearInterval(timerInterval);
//     },
//   }).then((result) => {
//     /* Read more about handling dismissals below */
//     if (result.dismiss === Swal.DismissReason.timer) {
//       window.location.href = "index.html";
//     }
//   });
// });
// const btnDelete = document.querySelector(".btn-delete");
// btnDelete.addEventListener("click", () => {
//   Swal.fire({
//     title: "Are you sure?",
//     text: "You want to delete this item?",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Yes, delete it!",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       Swal.fire({
//         title: "Deleted!",
//         text: "Your file has been deleted.",
//         icon: "success",
//       });
//     }
//   });
// });




