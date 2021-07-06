const body = document.querySelector("body");

const apiUrl = "https://connectup-backend.herokuapp.com";
// const apiUrl = "http://localhost:8000";

window.addEventListener("load", () => {
  body.classList.add("visible");
});

const signUpForm = document.querySelector(".signup-form");

signUpForm.addEventListener("submit", event => {
  event.preventDefault();

  const email = document.querySelector(".signup-email").value;
  const username = document.querySelector(".signup-username").value;
  const password = document.querySelector(".signup-password").value;
  const confPassword = document.querySelector(".signup-confpassword").value;

  if (password !== confPassword) {
    alert("The passwords don't match");
    return;
  }

  fetch(`${apiUrl}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  })
    .then(res => res.json())
    .then(data => {
      const { token } = data;

      if (token) {
        localStorage.setItem("jwt", token);
        location.href = "/profile/profile.html";
      } else {
        alert("Please sign up again");
      }
    })
    .catch(err => {
      alert("There was an error in sign up, please retry");
      console.log(err);
    });
});
