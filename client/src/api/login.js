

async function validateLogin(username, password){
    const response = await fetch("http://localhost:5000/users/login", {
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