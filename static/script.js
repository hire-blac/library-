const newBookForm = document.querySelector('.new-book');
const newBookButton = document.querySelector('.add-new-book');
const cancelButton = document.querySelector(".cancel");
const bookForm = document.getElementById('book-form');
const ul = document.getElementById('books');


// factory method to create a new book object
const bookFactory = (author, title, numOfPages, hasRead=false) => {
  const getAuthor = () => author;
  const getTitle = () => title;
  const getPages = () => numOfPages;
  const info = () => {
    return `${title} by ${author}, ${numOfPages} pages . ${hasRead ? ' read' : ' not yet read'}`;
  }

  return {
    getAuthor,
    getTitle,
    getPages,
    info
  };
}

// new book form
newBookButton.addEventListener('click', () => {
  bookForm.style.display = "block";
})

// close new book form
cancelButton.addEventListener('click', () => {
  newBookForm.style.display = "none";
})

// function to display books
function displayBooks(){

  // clear the list of books
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
 
  let count = 0;

  myLibrary.forEach(book => {
    const li = document.createElement('li');
    const btn = document.createElement('button');

    btn.textContent = "remove book";
    btn.setAttribute('id', `book ${count}`);
    btn.addEventListener('click', e=>removeBook(e.target));

    li.textContent = book.info();
    btn.style.margin = "0 10px";
    li.style.margin = "15px";

    li.appendChild(btn);

    li.setAttribute('id', count);
    ul.appendChild(li);
    count +=1;
  });
}

// function to add books to library
function addBookToLibrary(book) {
  myLibrary.push(book)
}

// remove book from library
function removeBook(target){
  myLibrary.splice(target.id.split(' ')[1], 1);

  //  display list of books
 displayBooks()

}

// library array containing book objects
let myLibrary = []

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

bookForm.addEventListener('submit', e => {
  e.preventDefault()
  let title = e.target['title'].value;
  let author = e.target['author'].value;
  let numPages = e.target['numPages'].value;
  let hasRead = e.target['hasRead'].checked;
  let newBook = bookFactory(author, title, numPages, hasRead);
  
  addBookToLibrary(newBook);

  displayBooks();
});

displayBooks();