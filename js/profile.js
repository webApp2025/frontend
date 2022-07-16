const p_name =   papers.getElementById("p_name");
const p_email =   papers.getElementById("p_email");
const p_image =   papers.getElementById("p_image");
const p_photo =   papers.getElementById("p_photo");
const btn_saveProfileChanges =   papers.getElementById("saveProfileChanges");
// Authorization

const getUserData = async (token) => {
    try {
        const res = await axios({
            method: "get",
            url: "https://missingtest.herokuapp.com/users/profile",
            headers: {
                Authorization: token,
            },
        });
        return res.data.data;
    } catch (error) {
        showAlert("error", "Cannot get Profile");
    }
    // Users/profile
};

const showUserData = (data) => {
    p_name.value = data.name;
    p_email.value = data.email;
    p_image.src = data.photo;
};

(async () => {
    let p_token = getCookie("jwt");
    const haveUser = p_token != "";
    if (haveUser) {
        const user = await getUserData(p_token);
        showUserData(user);
        btn_saveProfileChanges.addEventListener("click", (e) => {
            e.preventDefault();
            const form = new FormData();
            form.append("name", p_name.value);
            form.append("email", p_email.value);
            form.append("photo",   papers.getElementById("p_photo").files[0]);
            changeUserData(form, p_token);
        });
    } else {
        location.assign("/");
    }
})();

const changeUserData = async (data, token) => {
    try {
        const res = await axios({ 
            method: "patch",
            url: "https://missingtest.herokuapp.com/users/update",
            data,
            headers: {
                Authorization: token,
            },
        });
        showAlert("success", "Profile Updated Successfuly");
        setTimeout(() => {
            location.reload(); 
        }, 1000);
    } catch (error) {
        console.log(error);
        showAlert("error", `Cannot update Profile ${error.response}`);
    }
    // updateSettings(form, "data");
};
