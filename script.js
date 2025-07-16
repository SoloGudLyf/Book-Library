const myLibrary = [];

function Book(name, author, numberOfPages, readBook, ID) {
  if (!new.target) {
    throw Error("You must use the new keyword to use this constructor");
  }

  this.name = name;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.readBook = readBook;
  this.ID = ID;
}

Book.prototype.addBookToLibrary = function () {
  let info = `This book is named ${this.name} and was written by ${this.author} it also has ${this.numberOfPages} pages.`;
  myLibrary.push(this);
  return info;
};

let cockCrow = new Book(
  "Cockcrow",
  "Lawrence Darmani",
  70,
  "I have read the book"
);

// cockCrow.addBookToLibrary();

let structuralAnalysis = new Book(
  "Structural Analysis",
  "R.c Hibbeler",
  700,
  "I haven't read book yet"
);

// structuralAnalysis.addBookToLibrary();

// Letting the user create a book using dialog element

const form = document.querySelector("#newBookForm");
let checkbox;
let deleteBtn;

const dialog = document.getElementById("newBookDialog");
document.getElementById("openDialog").addEventListener("click", () => {
  dialog.showModal();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  let bookName = formData.get("bookName");
  let readBook = "";
  let author = formData.get("author");
  let numberOfPages = formData.get("numberOfPages");
  let newBookCrypto = crypto.randomUUID();
  let newBook = new Book(
    bookName,
    author,
    numberOfPages,
    readBook,
    newBookCrypto
  );
  let bookInfo = newBook.addBookToLibrary();

  // ADDING BOOK TO PAGE

  let grid = document.querySelector(".books");
  let bookItem = document.createElement("p");
  bookItem.setAttribute("class", "book");
  bookItem.setAttribute("id", newBookCrypto);
  bookItem.textContent = bookInfo;

  // ADDING A CHECKBOX FOR READ

  checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("dat-unique-id", newBookCrypto);
  let labelForCheckbox = document.createElement("label");
  labelForCheckbox.textContent = "Read";
  let para = document.createElement("p");
  para.appendChild(checkbox);
  para.appendChild(labelForCheckbox);
  para.setAttribute("class", "readBook");

  bookItem.appendChild(para);

  // ADDING A DELETE BUTTON
  deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.setAttribute("class", "deleteBtn");
  deleteBtn.setAttribute("id", newBookCrypto);

  para.appendChild(deleteBtn);

  grid.appendChild(bookItem);

  discardBtn.click();
});

let discardBtn = document.querySelector(".discard");

discardBtn.addEventListener("click", () => {
  dialog.close();
});

function getBook() {
  for (let book of myLibrary) {
    let read = checkbox.checked;
    if (read) {
      book.readBook = "I have read this book";
      console.log(book.readBook);
    } else {
      book.readBook = "I haven't read this book";
      console.log(book.readBook);
    }
  }
}

let deleteButton = document.querySelector(".deleteBtn");

deleteBtn.addEventListener("click", () => {
  let parentElement = deleteBtn.parentElement;
  if (deleteBtn.id === parentElement.id) {
    parentElement.remove();
  }
});
