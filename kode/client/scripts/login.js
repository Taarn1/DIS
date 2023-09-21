function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const user = {
    username,
    password,
  };

  axios
    .post("http://localhost:3000/customer/login", user)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function storage() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const user = {
    username,
    password,
  };

  axios
    .post("http://localhost:3000/customer/localstorage", user)
    .then(function (response) {
      console.log(response);
      localStorage.setItem("data", response.data.username);
    })
    .catch(function (error) {
      console.log(error);
    });
}
