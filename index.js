const apiUri = 'http://localhost:8080/';

function login(usernameField, passwordField) {

    const url = apiUri + 'login',
        formData = {
            email: usernameField.value,
            password: passwordField.value
        };

        doPost(url, formData, "welcome.html");
}

function register(emailField, namefield, surnameField, numberField, passwordField) {
    
    const url = apiUri + 'register',
        formData = {
            email: emailField.value,
            name: namefield.value,
            surname: surnameField.value,
            phoneNumber: numberField.value,
            password: passwordField.value
        };

        doPost(url, formData, "index.html");
}


function doPost(url, formData, navigateTo) {

    if(!validate(formData)) {
        document.getElementById('error').innerHTML = "Some fields are invalid"; 
        return false;
    }

    postData(url, formData)
        .then(data => {
            window.location.href = navigateTo;
        })
        .catch(error => {
            document.getElementById('error').innerHTML = error.message; 
            return false;
        });
}

async function postData(url = ``, data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(data),
    });

    if(response.ok) {
        return await response.json();
    } 
    else {
        throw await response.json();
    }
  }

  function validate(formData) {
    for(let prop in formData) {
        if(formData[prop] == "" || formData[prop] == undefined) {
            return false;
        }
        if(prop == 'email' && (formData[prop].indexOf("@") < 1 || formData[prop].indexOf(".") < 3)) {
            return false;
        }
    }
    return true;
  }