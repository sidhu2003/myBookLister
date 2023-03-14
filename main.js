// creating a class book 
class Book{
  constructor(title,author,isbn){
    this.title = title
    this.author = author
    this.isbn = isbn 
  }
}
// creating class UI 
class UI{
  static displayBooks() {
    const books = storedBooks
    books.forEach((book) => UI.addBook(book));
  }
  static addBook(book){
    const list = document.querySelector('#book-list')
    // creating 'tr' tag 
    const row = document.createElement('tr')
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `
    list.appendChild(row)
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields()
  {
    document.querySelector('#title').value = ''
    document.querySelector('#author').value = ''
    document.querySelector('#isbn').value = ''
  }
  static deleteBook(el){
    if(el.classList.contains('delete')){
      el.parentElement.parentElement.remove()
    }
  }
}


// Event : Display books 
document.addEventListener('DOMContentLoaded',UI.displayBooks)

// Event : add books 
document.querySelector('#book-form').addEventListener('submit',e=>{
  e.preventDefault()
  // get values from form 
  const title = document.querySelector('#title').value
  const author = document.querySelector('#author').value
  const isbn = document.querySelector('#isbn').value

  if (title === '' || author === '' || isbn === ''){
    UI.showAlert('Please fill in all fields', 'danger');
  }
  else{
  const book = new Book(title,author,isbn)

  // success 
  UI.showAlert('Book Added','success');

  // adding book 
  UI.addBook(book)

  // clear fields 
  UI.clearFields()
  } 
})

// delete book
document.querySelector('#book-list').addEventListener('click',e=>{
  UI.deleteBook(e.target)
  UI.showAlert('Book is removed', 'danger');
}
)
