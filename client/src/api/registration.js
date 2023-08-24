

async function validateRegistration(username, password, email){
    const response = await fetch("http://localhost:5000/users/registration", {
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