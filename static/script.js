const newBookForm = document.querySelector('.new-book');
const newBookButton = document.querySelector('.add-new-book');
const cancelButton = document.querySelector(".cancel");
const bookForm = document.getElementById('book-form');
const ul = document.getElementById('books');


newBookButton.addEventListener('click', () => {
  bookForm.style.display = "block";
})

cancelButton.addEventListener('click', () => {
  newBookForm.style.display = "none";
})

let myLibrary = []

function Book(author, title, numOfPages,hasRead=false) {
  this.author = author
  this.title = title
  this.numOfPages = numOfPages
  this.hasRead = hasRead
}

// prototype function for Book
Book.prototype.info = function() {
  return `${this.title} by ${this.author}, ${this.numOfPages} pages, ${this.hasRead ? 'has read' : 'not read yet'}`
}

// factory method to create a new book object
const bookFactory = (author, title, numOfPages, hasRead=false) => {
  const info = () => {
    return `${title} by ${author}, ${numOfPages} pages. ${hasRead} ? read : not yet read`;
  }

  return {author, title, numOfPages, hasRead, info};
}

// function to add books to library
function addBookToLibrary(book) {
  myLibrary.push(book)
}

// create new book objects
let book1 = bookFactory('Sydney Sheldon', 'Windmill of the gods', 356, true)
let book2 = bookFactory('Etaski', 'Sufferance', 1722, true)
let book3 = bookFactory('Antiproton', 'A Dragon\'s tale', 1342, true)
let book4 = bookFactory('Robert Ludlum', 'Borne Supremacy', 752)
let book5 = bookFactory('Jazz Cullen', 'Storm of Shadows', 752)

// add books to library
addBookToLibrary(book1)
addBookToLibrary(book2)
addBookToLibrary(book3)
addBookToLibrary(book4)
addBookToLibrary(book5)


function displayBooks(){
  let count = 0;

    myLibrary.forEach(book => {
      const li = document.createElement('li');
      const btn = document.createElement('button');

      btn.addEventListener('click', e=>removeBook(e.target));

      li.textContent = book.info();
      btn.textContent = "remove book";
      btn.style.margin = "0 10px";
      li.style.margin = "15px";

      li.appendChild(btn);

      li.setAttribute('id', book.title);
      btn.setAttribute('data-book-id', count);
      ul.appendChild(li);
      count +=1;
    });
}

function addBook(){
    let title = document.getElementById('title').value
    let author = document.getElementById('author').value
    let numPages = document.getElementById('numPages').value
    let hasRead = document.getElementById('hasRead').checked
    let book = new Book(author, title, numPages,hasRead)
    addBookToLibrary(book)
}

function removeBook(target){
   myLibrary.splice(target.dataset.bookId, 1);

  // clear the list of books
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  displayBooks()
}

displayBooks()