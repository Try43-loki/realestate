const formLogin = document.querySelector("#formLogin");
const btnSubmit = document.querySelector("#submit");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const loading = document.querySelector(".loading");
btnSubmit.addEventListener("click", () => {
  if (username.value == "Real Estate Admin" && password.value == "We are team 6") {
    loading.innerHTML = `<dotlottie-player
      src="https://lottie.host/abb82141-80a1-44e8-a5f7-59245072b031/ZO9nXM2CDb.lottie"
      background="transparent"
      speed="1"
      style="width: 300px; height: 300px"
      loop
      autoplay
      ></dotlottie-player>`;
    setTimeout(() => {
      loading.classList.add("activeLoading");
    }, 400);
    setTimeout(() => {
      loading.innerHTML = "";
      window.location.href = "data.html";
    }, 2600);
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  }
  username.value = "";
  password.value = "";
});

const lockIcon = document.querySelector("#pws");
const showPassword = () => {
  if (password.type == "password") {
    password.type = "text";
    lockIcon.innerHTML = `<i class="fa-classic fa-solid fa-unlock fa-fw" ></i>`;
    console.log(password.type);
  } else {
    password.type = "password";
    lockIcon.innerHTML = `<i class="fa-solid fa-lock"></i>`;
  }
};
lockIcon.addEventListener("click", showPassword);
// input data

