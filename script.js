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

console.log(myLibrary);
