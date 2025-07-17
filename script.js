const myLibrary = [];

function Book(
  name,
  author,
  numberOfPages,
  readBook = false,
  Id = crypto.randomUUID()
) {
  if (!new.target) {
    throw Error("This constructor must be called with the new keyword");
  }

  this.name = name;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.readBook = readBook;
  this.Id = Id;
}

let book1 = new Book("My book", "Myself", 34, true);
myLibrary.push(book1);

let closebtn = document.querySelector(".reset");

function displayBookToPage() {
  let parent = document.querySelector(".gridBox");
  parent.innerHTML = "";
  for (let book of myLibrary) {
    let card = document.createElement("article");
    card.classList.add("book");
    card.setAttribute("data-id", book.Id);
    let bookInfo = `<span class="title">Book name : </span><span class="book-info">${
      book.name
    }</span> <br> 
    <span class="title">Author : </span><span class="book-info">${
      book.author
    }</span> <br>
    <span class="title">Number of Pages : </span><span class="book-info">${
      book.numberOfPages
    }</span> <br>
    <label for="readBook">Read <input type="checkbox" name="readBook" id="readBook-${
      book.Id
    }" ${book.readBook ? "checked" : ""}></label> <br>
    <button class="delete-btn" data-id="${book.Id}">Delete Book</button>`;
    card.innerHTML = bookInfo;
    parent.appendChild(card);
  }
  closebtn.click();
  setDeleteListeners();
  toggleReadBook();
  console.log(myLibrary);
}

// Show Dialog and get form data

let form = document.querySelector("form");
let dialog = document.querySelector("dialog");
let openDialog = document.querySelector(".openDialog");
openDialog.addEventListener("click", () => {
  dialog.showModal();
});

function getFormInput() {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let formData = new FormData(form);
    let bookName = formData.get("bookName");
    let author = formData.get("author");
    let numberOfPages = formData.get("numberOfPages");
    let readBook = formData.get("readBook");
    readBook == null ? (readBook = false) : (readBook = true);
    let newBook = new Book(bookName, author, numberOfPages, readBook);
    myLibrary.push(newBook);

    dialog.close();
    displayBookToPage();
  });
}

getFormInput();
displayBookToPage();

// Allow User to toggle read checkbox
function toggleReadBook() {
  let checkbox = document.querySelectorAll(
    "input[type='checkbox'][name='readBook']"
  );
  for (let box of checkbox) {
    box.addEventListener("change", function (e) {
      let checkboxId = e.target.id.split("readBook-")[1];
      if (e.target.checked) {
        for (let book of myLibrary) {
          if (book.Id == checkboxId) {
            book.readBook = true;
          } else {
            book.readBook = false;
          }
        }
      }
    });
  }
}

// Allow user to delete book

function setDeleteListeners() {
  let deleteBtn = document.getElementsByClassName("delete-btn");

  for (let btn of deleteBtn) {
    btn.addEventListener("click", function (e) {
      let btnId = e.target.dataset.id;
      for (let i = 0; i < myLibrary.length; i++) {
        if (btnId == myLibrary[i].Id) {
          myLibrary.splice(i, 1);
          displayBookToPage();
        }
      }
    });
  }
}

// Clear form data and close dialog

form.addEventListener("reset", () => {
  dialog.close();
});
