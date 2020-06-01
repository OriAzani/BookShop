'use strict'


renderBooks()

function renderBooks() {
    var books = getBooks()
    var strHtmls = books.map(function(book) {
        return `<tr>
            <td class="book-id">${book.id}</td>
            <td class="book-title">${book.title}</td>
            <td class="book-id">${book.price}</td>
            <td class="book-pic">${book.pic}</td>
            <td class="book-rate"> <span class="arrow" onclick="onChangeRating(${book.id},1)">🔽</span>${book.rate}</span> <span class="rating">  <span class="arrow" onclick="changeRating(${book.id}, 2 )"><span>🔼</span></td>
            <td> <botton class="read-btn" onclick="onBookDetails(${book.id})">Read</botton> </td>
            <td> <botton class="update-btn" onclick="onUpdateBook(${book.id})">Update</botton> </td>
            <td> <botton class="delete-btn" onclick="onRemoveBook(${book.id})">Delete</botton> </td>
         </tr>
         `
    });

    var tableContent = strHtmls.join('')
    var elTableBody = document.querySelector('.books-table tbody')
    elTableBody.innerHTML = tableContent
}

function onRemoveBook(bookId) {
    console.log(bookId)
    removeBook(bookId)
    // _saveBooksToStorage()
    renderBooks();
}

// function onAddBook() {
//     var newBookName = prompt('What is the title of the book?');
//     var newBookPrice = +prompt('What is the price of the book?');
//     addBook(newBookName, newBookPrice);
// }

function onAddBook() {
    var elNewBookName = document.querySelector('input[name=add]');
    var elNewBookPrice = document.querySelector('input[name=price]');
    var newBookName = elNewBookName.value
    var newBookPrice = elNewBookPrice.value
    addBook(newBookName, newBookPrice);
    elNewBookName.value = '';
    elNewBookPrice.value = '';
   // _saveBooksToStorage()
    renderBooks();
}

function onUpdateBook(bookId) {
    var UpdateBookPrice = +prompt('What is the Updated price of the book?');
    updateBook(bookId, UpdateBookPrice)
    _saveBooksToStorage()
    renderBooks();
}

function onBookDetails(bookId) {
    var book = getBookById(bookId)
        // book = JSON.stringify(book);
        //  console.log(book);

    var elModal = document.querySelector('.modal')
    elModal.querySelector('h5').innerText = book.title
    elModal.querySelector('span').innerHTML = book.pic
    elModal.querySelector('p').innerText = 'details of the book. great book.read it'
    elModal.hidden = false;

}

function onCloseModal() {
    var elModal = document.querySelector('.modal')
    elModal.hidden = true;

}

function onChangeRating(element, arg) {
   // console.log(arg)
    changeRating(element, arg)
    renderBooks();
}


function onSetSortFirst(sortBy) {
    //console.log('sort by '+ sortBy)
    sortBooksFirst(sortBy);
    _saveBooksToStorage()
    renderBooks();
}


function onSetSortLast(sortBy) {
    sortBooksLast(sortBy);
    _saveBooksToStorage()
    renderBooks();
}

function onPageIdx(arg){
setPageIdx(arg)
renderBooks()
}

