

async function validateLogin(username, password){
    const response = await fetch("https://fitness-app-396719.ew.r.appspot.com/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });
    const data = await response.json();
    console.log(data)
    return data;
}

export default validateLogin;