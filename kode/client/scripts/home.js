let responseDom = document.getElementById("response");

function getUsers() {
  axios
    .get("http://localhost:3000/customer")
    .then(function (response) {
      // handle success
      console.log(response.data);
      responseDOM.innerHTML = "All users available in console";
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
}

function saveUser() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = {
    username,
    email,
    password,
  };

  axios
    .post("http://localhost:3000/customer", user)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
