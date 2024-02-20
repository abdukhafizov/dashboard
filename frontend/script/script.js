const modalAdd = document.querySelector('#modalAdd')
const AddTaskBtn = document.querySelector('.add')
const closeAddTask = document.querySelector('.crossAdd')
const tbody = document.querySelector("tbody")

const form = document.forms.addForm
const BASE_URL = "http://localhost:8080"

let all_about_boxes = document.querySelector(".all_about_boxes")
let tableView = document.querySelector("#tableView")
let plateView = document.querySelector("#plateView")
let all_table = document.querySelector(".all_table")
let boxes = document.querySelector(".boxes")

tableView.onclick = () =>{
    boxes.classList.add('hiden')
    all_table.classList.remove("hiden")
    tableView.classList.add("active-view")
    plateView.classList.remove("active-view")
}

plateView.onclick = () =>{
    all_table.classList.add('hiden')
    boxes.classList.remove("hiden")
    plateView.classList.add("active-view")
    tableView.classList.remove("active-view")
}

form.onsubmit = (e) => {
    e.preventDefault()

    const user = {
        name: new FormData(form).get("name"),
        description: new FormData(form).get("description"),
        time: new FormData(form).get("time"),
        date: new FormData(form).get("date"),
        status: new FormData(form).get("status")
    }
    console.log("User:", user); // Добавьте эту строку для отладки


    fetch(BASE_URL + "/users", {
        method: "post",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(res => console.log(res))
}

function getData() {
    fetch(BASE_URL + "/users")
        .then(res => res.json())
        .then(res => {
            reload(res)
            gridreload(res, all_about_boxes)
        })
}

getData()

function reload(arr) {
    const place = tbody; // Присвоим tbody к переменной place, если tbody доступен глобально
    place.innerHTML = ""
    for (let item of arr) {
        let tr = document.createElement('tr')
        let titleView = document.createElement('td')
        let descView = document.createElement('td')
        let dateView = document.createElement('td')
        let timeView = document.createElement('td')
        let statusView = document.createElement('td')
        let delView = document.createElement('td')
        let delbtn = document.createElement("button")
        // descView.classList.add('desc')
        delbtn.classList.add("delete_button")

        place.append(tr)
        tr.append(titleView, descView, dateView, timeView, statusView, delView)
        delView.append(delbtn)

        titleView.innerHTML = item.name
        descView.innerHTML = item.description
        dateView.innerHTML = item.date
        timeView.innerHTML = item.time
        statusView.innerHTML = item.status

        if (item.status === "new") {
            statusView.innerHTML = "Не завершено"
            statusView.style.color = "#ff3f3f"
        } else if (item.status === "progress") {
            statusView.innerHTML = "В прогрессе"
            statusView.style.color = "#007FFF"
        } else if (item.status === "done") {
            statusView.innerHTML = "Готово"
            statusView.style.color = "#000"
        }


        delbtn.onclick = () => {
            deleteUser(item.id)
        }
        tr.ondblclick = () => {
            deleteUser(item.id)
        }
    }
}

function gridreload(arr, place) {
    place.innerHTML = ""

    for (let item of arr) {
        let box = document.createElement("div")
        let h4 = document.createElement("h4")
        let description = document.createElement("p")
        let dates = document.createElement("div")
        let date = document.createElement("p")
        let times = document.createElement("p")
        let stat = document.createElement("div")

        box.classList.add("box")
        description.classList.add("description")
        dates.classList.add("dates")
        date.classList.add("date")
        times.classList.add("time")
        stat.classList.add("stat")

        h4.innerHTML = item.name
        description.innerHTML = item.description
        date.innerHTML = item.date
        times.innerHTML = item.time
        stat.innerHTML = item.status

        place.append(box)
        box.append(h4,description,dates,stat)
        dates.append(date,times)
     
        
        if (item.status === "new") {
            stat.innerHTML = "Не завершено"
            stat.style.color = "#ff3f3f"
        } else if (item.status === "progress") {
            stat.innerHTML = "В прогрессе"
            stat.style.color = "#007FFF"
        } else if (item.status === "done") {
            stat.innerHTML = "Готово"
            stat.style.color = "#000"
        }

        box.ondblclick = () => {
            deleteUser(item.id)
        }
    }

}

function deleteUser(id) {
    fetch(BASE_URL + "/users/" + id, {
        method: "delete"
    }).then(res => {
        if (res.status === 200 || res.status == 201) {
            getData()
        }
    }
    )
}

// reload()

AddTaskBtn.onclick = () => {
    modalAdd.showModal()
}

closeAddTask.onclick = () => {
    modalAdd.close()
}