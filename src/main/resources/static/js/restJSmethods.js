const REST_URL = 'http://localhost:8080/api';

async function getUsers() {
    try {
        const response = await fetch(REST_URL, {
            method: 'GET',
            headers: {
                accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (err) {
        console.log(err);
    }
}

async function getCurrentUser() {
    try {
        const response = await fetch(REST_URL + '/user', {
            method: 'GET',
            headers: {
                accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (err) {
        console.log(err);
    }
}

async function getUserById(id) {

    try {
        const response = await fetch(REST_URL + "/" + id, {
            method: 'GET',
            headers: {
                accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (err) {
        console.log(err);
    }
}

async function deleteUserById(id) {
    try {
        const response = await fetch(REST_URL + "/" + id, {
            method: 'DELETE',
            headers: {
                accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (err) {
        console.log(err);
    }
}

async function createUser(user) {
    try {
        const response = await fetch(REST_URL, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (err) {
        console.log(err);
    }
}

async function editUser(user, id) {

    try {
        const response = await fetch(REST_URL + "/" + id, {
            method: 'PATCH',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (err) {
        console.log(err);
    }

}

const columns = 8
const userBlank = {
    username: "username",
    lastname: "lastname",
    age: 1,
    email: "email",
    password: "password",
    roles: [{
        id: 0,
        name: "ROLE_USER"
    }]
}

//Заполение таблицы пользователей
function createTableBody() {
    console.log("createTableBody start")
    let usersList = getUsers()
    usersList.then(array => {
        let rows = array.length;
        let table = document.getElementById("allUsersTable");
        for (let i = 0; i < rows; i++) {
            let user = array[i];
            console.log(user)
            let row = table.insertRow(-1);
            let cellId = row.insertCell(0);
            let cellUsername = row.insertCell(1);
            let cellLastname = row.insertCell(2);
            let cellAge = row.insertCell(3);
            let cellEmail = row.insertCell(4);
            let cellRole = row.insertCell(5);
            let cellEditButton = row.insertCell(6);
            let cellDeleteButton = row.insertCell(7);
            cellId.innerHTML = user.id;
            cellUsername.innerHTML = user.username;
            cellLastname.innerHTML = user.lastname;
            cellAge.innerHTML = user.age;
            cellEmail.innerHTML = user.email;
            let userRole = "";
            for (let k = 0; k < user.roles.length; k++) {
                userRole = userRole + "  " + convertRole(user.roles[k].name);
            }
            cellRole.innerHTML = userRole;
            cellEditButton.appendChild(createButton("edit", user.id));
            cellDeleteButton.appendChild(createButton("delete", user.id));
        }
        console.log("createTableBody ends")
    })
}
function createTitle() {
    let user = getCurrentUser()
    user.then((user) => {
        let title = document.querySelector("#title")
        title.innerHTML=`${user.email} with role ${user.roles.length === 2 ? "Admin" : "User"}`
    })
}

function createCurrentUserTable() {
    let user = getCurrentUser()
    user.then((user) => {
        console.log(user)
        let table = document.querySelector("#currentUserTable")
        let row = table.insertRow(-1);
        let cellId = row.insertCell(0);
        let cellUsername = row.insertCell(1);
        let cellLastname = row.insertCell(2);
        let cellAge = row.insertCell(3);
        let cellEmail = row.insertCell(4);
        let cellRole = row.insertCell(5);
        cellId.innerHTML = user.id;
        cellUsername.innerHTML = user.username;
        cellLastname.innerHTML = user.lastname;
        cellAge.innerHTML = user.age;
        cellEmail.innerHTML = user.email;
        let userRole = "";
        for (let k = 0; k < user.roles.length; k++) {
            userRole = userRole + "  " + convertRole(user.roles[k].name);
        }
        cellRole.innerHTML = userRole;
    })
}

function createButton(operation, id) {
    let button = document.createElement("button");

    button.setAttribute("class", "btn btn-primary");
    button.setAttribute("type", "button");
    button.setAttribute("data-bs-toggle", "modal");
    button.setAttribute("data-bs-target", "#" + operation + "ModalForm");
    button.setAttribute("id", operation + "Button");
    button.textContent = operation;
    button.setAttribute("data-whatever", `${id}`)

    return button;
}
//Просто удаляю и создаю заного таблицу
function updateTable() {
    console.log("nachalo update table")
    let usersList = getUsers()
    usersList.then((array) => {
        let rows = array.length
        let table = document.getElementById("allUsersTable");
        for (let i = 0; i < rows; i++) {
            console.log("Ydalenie stroki s id polzovatelya")
            console.log(array[i].id)
            table.deleteRow(-1)
        }
        createTableBody()
    })
    console.log("konec update table")
}

//модальное окно удаления
$('#deleteModalForm').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget)
    let recipient = button.data('whatever')
    let modal = $(this)
    let userData = getUserById(recipient)
    userData.then((user) => {
        modal.find('#disabledIdDelete').val(user.id)
        modal.find('#disabledFirstName').val(user.username)
        modal.find('#disabledSecondName').val(user.lastname)
        modal.find('#disabledAge').val(user.age)
        modal.find('#disabledEmail').val(user.email)
        let form = document.querySelector('#deleteForm')
        console.log(
            form
        )
        $("#deleteForm").unbind('submit').on("submit", (event) => {
            event.preventDefault()
            deleteUserById(user.id)
                .then(response => console.log(response.json))
                .then(data => console.log(data))
                .then(() => {
                    let table = document.getElementById("allUsersTable")
                    table.deleteRow(-1)
                    updateTable()
                })
                .catch(error => console.error(error));
            $('#deleteModalForm').modal('hide')
        })
    })
})
//Модальное окно изменения
$('#editModalForm').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget)
    let recipient = button.data('whatever')
    let modal = $(this)
    let userData = getUserById(recipient)
    userData.then((user) => {
        modal.find('#disabledIdInput').val(user.id)
        modal.find('#editFirstName').val(user.username)
        modal.find('#editLastname').val(user.lastname)
        modal.find('#editAge').val(user.age)
        modal.find('#editEmail').val(user.email)
        modal.find('#editPassword').val(user.password)

        if (user.roles.length === 1) {
            modal.find('#editRole').selectedIndex = 0
        } else {
            modal.find('#editRole').selectedIndex = 1
        }
        let form = document.querySelector('#editForm')
        console.log(form)
        $("#editForm").unbind('submit').on("submit", (event) => {
            console.log("submit of delete button start")
            event.preventDefault()
            const data = new FormData(form)
            const entrData = Object.fromEntries(data.entries())
            entrData.roles = JSON.parse(entrData.roles)
            editUser(entrData, user.id)
                .then(response => console.log(response.json))
                .then(data => console.log(data))
                .then(() => updateTable())
                .catch(error => console.error(error));
            $('#editModalForm').modal('toggle')
            console.log("submit delete button end")
        })
    })
})


//код формы добавления пользователя
const inputForm = document.querySelector("#createUserForm")
const inputRole = document.querySelector("#inputRole")
let inputOpt = inputRole.options
const ROLE_USER = [{"id": 1, "name": "ROLE_USER"}]
const ROLE_ADMIN = [{"id": 1, "name": "ROLE_USER"}, {"id": 2, "name": "ROLE_ADMIN"}]
inputOpt[0].value = JSON.stringify(ROLE_USER)
inputOpt[1].value = JSON.stringify(ROLE_ADMIN)
inputForm.addEventListener("submit", function (event) {
    event.preventDefault()
    const data = new FormData(inputForm);
    const entrData = Object.fromEntries(data.entries())
    entrData.roles = JSON.parse(entrData.roles)
    createUser(entrData)
        .then(response => console.log(response.json)
        )
        .then(data => console.log(data))
        .then(() => updateTable())
        .catch(error => console.error(error));
    //updateTable()
    document.querySelector("#profile").setAttribute("class", "tab-pane fade")
    document.querySelector("#home").setAttribute("class", "tab-pane fade active show")
    document.querySelector("#home-tab").setAttribute("class","nav-link active")
    document.querySelector("#profile-tab").setAttribute("class", "nav-link")
})


//значения опций ролей на модели изменения
const editRole = document.getElementById("editRole")
const editOpt = editRole.options
editOpt[0].value = JSON.stringify(ROLE_USER)
editOpt[1].value = JSON.stringify(ROLE_ADMIN)

const deleteRole = document.getElementById("disabledRole")
const deleteOpt = deleteRole.options
deleteOpt[0].value = JSON.stringify(ROLE_USER)
deleteOpt[1].value = JSON.stringify(ROLE_ADMIN)

function convertRole(fullRole) {
    if (fullRole === "ROLE_USER") {
        return "USER"
    } else {
        return "ADMIN"
    }
}


