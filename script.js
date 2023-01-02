const submitBtn = document.querySelector("#submitBtn");

function setLocalStorage() {
  if (localStorage.getItem("userData")) {
    let showDiv = document.querySelector("#show");
    showDiv.innerHTML = "";

    let arr = JSON.parse(localStorage.getItem("userData"));

    //Here data  get to render
    arr.forEach((user, id) => {
      let newDiv = document.createElement("div");

      newDiv.setAttribute("class", "newData");

      let htmlData = `
      <div class="inside_newData">

      <div class="name">
      
            Name :- <span>${user.name}</span>
      </div>

      <div class="name1">
       
           Password :- <span>${user.password}</span>
      </div>
      
      <div>

      </div class="btn_section">
      
      <button onClick="onDelete(${id})" >Delete</button>
      <button onClick="onEdit(${id})" id="btnEdit">Edit</button>
      </div>

        `;

      //How the the should be showing
      newDiv.insertAdjacentHTML("afterbegin", htmlData);
      showDiv.insertAdjacentElement("afterbegin", newDiv);
    });
    //
  } else {
    let arr = [];
    let arrData = {
      name: "",
      password: "",
    };
    arr.push(arrData);
    localStorage.setItem("userData", JSON.stringify(arr));
    // alert("Data is pushed");
  }
}
//
setTimeout(() => {
  setLocalStorage();
}, 30);

//CRUD operation add submit / add function----------------------------------
submitBtn.addEventListener("click", (e) => {
  e.preventDefault(); //stops the automatic form refresh

  let arr = JSON.parse(localStorage.getItem("userData"));

  let name = document.querySelector("#name").value; // got the value of input

  let password = document.querySelector("#password").value; // got the value of input

  if (name.length <= 0 && password.length <= 0) {
    alert("Empty todo can't be submitted");
  } else if (name.length > 0 && password.length > 0) {
    let arrData = {
      name: name,
      password: password,
    };
    arr.push(arrData);
    localStorage.setItem("userData", JSON.stringify(arr));
    setLocalStorage();
    alert("Data added successfully");
  } else {
    alert("Empty todo can't be submitted");
  }
});

//delete opeartion----------------------------------------------------

function onDelete(id) {
  let arr = JSON.parse(localStorage.getItem("userData")); //access all data

  let deleteData = [...arr]; // spred all data

  deleteData.splice(id, 1); //select particular data on the basis of "id"

  arr = [...deleteData]; // spred all data

  localStorage.setItem("userData", JSON.stringify(arr)); //update the localStorage

  setLocalStorage(); //call the function
}

//Edit operation---------------------------------------------------------------------------

function onEdit(id) {
  // alert("JG")
  let arr = JSON.parse(localStorage.getItem("userData")); //access all data

  let name = (document.querySelector("#name").value = arr[id].name); //access name

  let password = (document.querySelector("#password").value = arr[id].password); //access password

  submitBtn.setAttribute("disabled", true); //disable submit form button because we not allow user to submit to during modifucation of existing todo data

  let editBtn = document.createElement("button"); //create new button

  let form = document.querySelector("#form"); //access the form

  let btnEdit = document.querySelectorAll("#btnEdit");

  editBtn.innerHTML = "UPDATE";

  btnEdit.forEach((element) => {
    element.setAttribute("disabled", true);
  });
  form.insertAdjacentElement("beforeend", editBtn);

  editBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let newName = document.querySelector("#name");
    let newPassword = document.querySelector("#password");

    arr.splice(id, 1, { name: newName.value, password: newPassword.value });

    localStorage.setItem("userData", JSON.stringify(arr));

    setLocalStorage();

    newName.value = "";

    newPassword.value = "";

    form.removeChild(form.lastElementChild);

    submitBtn.removeAttribute("disabled");
  });
}
