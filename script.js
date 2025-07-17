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

function displayBookToPage() {
  let parent = document.querySelector(".gridBox");
  parent.innerHTML = "";
  for (let book of myLibrary) {
    let card = document.createElement("article");
    card.classList.add("book");
    let bookInfo = `Book name : <span class="book-info">${
      book.name
    }</span> <br> 
    Author : <span class="book-info">${book.author}</span> <br>
    Number of Pages : <span class="book-info">${book.numberOfPages}</span> <br>
    <label for="readBook">Read </label><input type="checkbox" name="readBook" id="readBook-${
      book.Id
    }" ${book.readBook ? "checked" : ""}> <br>
    Book ID : <span class="book-info">${book.Id}</span>`;
    card.innerHTML = bookInfo;
    parent.appendChild(card);
  }
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
