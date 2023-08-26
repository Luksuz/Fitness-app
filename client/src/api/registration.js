

async function validateRegistration(username, password, email){
    const response = await fetch("https://fitness-app-396719.ew.r.appspot.com/users/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password, email: email }),
    });
    const data = await response.json();
    return data;
}

export default validateRegistration;