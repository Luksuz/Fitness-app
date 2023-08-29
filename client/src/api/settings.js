

async function changePassword(id, newPassword){
    const response = await fetch("https://fitness-app-396719.ew.r.appspot.com/users/changePassword", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "id": id, "password": newPassword}),
    });
    const data = await response.json();
    return data;
}

async function deleteUser(id, password){
    const response = await fetch("https://fitness-app-396719.ew.r.appspot.com/users/deleteUser", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "id": id, "password": password}),
    });
    const data = await response.json();
    return data;
}

export { changePassword, deleteUser };