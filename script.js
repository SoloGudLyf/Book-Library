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
  for (let book of myLibrary) {
    let parent = document.querySelector(".gridBox");
    let card = document.createElement("article");
    card.classList.add("book");
    let bookInfo = `Book name : <span class="book-info¨>${book.name}</span> <br> 
    Author : <span class="book-info">${book.author}</span> <br>
    Number of Pages : <span class="book-info">${book.numberOfPages}</span> <br>
    <label for="readBook">Read </label><input type="checkbox" name="readBook" id="readBook"> <br>
    Book ID : <span class="book-info">${book.Id}</span>`;
    card.innerHTML = bookInfo;
    parent.appendChild(card);
  }
}

displayBookToPage();
