const KEY = 'books';
var gBooksSort = 'id'
var gNextId = 110;
var pageIdx = 0;
const PAGE_SIZE = 3;

var gBooks = [{
    id: 101,
    title: 'Winnie The Pooh',
    price: 10,
    pic: `<img class="book-image" src="pic/Winnie The Pooh.jpeg" alt="">`,
    rate: 0
},
{
    id: 102,
    title: 'Harry Potter',
    price: 13,
    pic: `<img class="book-image" src="pic/Harry Potter.jpeg" alt="">`,
    rate: 0
},
{
    id: 103,
    title: 'The Cat In The Hat',
    price: 9,
    pic: `<img class="book-image" src="pic/The Cat In The Hat.png" alt="">`,
    rate: 0
},
{
    id: 104,
    title: 'Honey & Co.',
    price: 24,
    pic: `<img class="book-image" src="pic/Honey & Co.jpg" alt="">`,
    rate: 0
},
{
    id: 105,
    title: 'Miles Davis',
    price: 145,
    pic: `<img class="book-image" src="pic/Miles Davis.png" alt="">`,
    rate: 0
},
{
    id: 106,
    title: 'Dan Ariely',
    price: 99,
    pic: `<img class="book-image" src="pic/Dan Ariely.jpg" alt="">`,
    rate: 0
},
{
    id: 107,
    title: 'Savoy Cocktail Book',
    price: 60,
    pic: `<img class="book-image" src="pic/Savoy Cocktail Book.png" alt="">`,
    rate: 0
},
{
    id: 108,
    title: 'Reading For Dummies',
    price: 555,
    pic: `<img class="book-image" src="pic/Reading For Dummies.png" alt="">`,
    rate: 0
},
{
    id: 109,
    title: 'The Bible',
    price: 90210,
    pic: `<img class="book-image" src="pic/Bible.jpeg" alt="">`,
    rate: 0
},
]

function getBooks() {
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        books = gBooks
    }
    if (pageIdx === -1)  return books;
    
    var startIdx = pageIdx * PAGE_SIZE;
    return books.slice(startIdx, startIdx + PAGE_SIZE)

}


function removeBook(bookId) {
    console.log(bookId)
    var currBookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id
    });
    console.log(currBookIdx)
    gBooks.splice(currBookIdx, 1)
    _saveBooksToStorage()
}


function addBook(newBookName, newBookNPrice) {
    var newBookObj = {
        id: gNextId++,
        title: newBookName,
        price: newBookNPrice,
        pic: `<img class="book-image" src="pic/NewBook.jpeg" alt="">`,
        rate: 0

    }
    gBooks.push(newBookObj)
    _saveBooksToStorage()
}

function updateBook(bookId, UpdateBookPrice) {
    var currBookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id
    });
    gBooks[currBookIdx].price = UpdateBookPrice;
    _saveBooksToStorage()
}



function getBookById(bookId) {
    var currBookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id
    });
    return gBooks[currBookIdx]
}


function _saveBooksToStorage() {
    saveBooksToStorage(KEY, gBooks)
}

function changeRating(id, arg) {
    var currBook = getBookById(id)
    if ((arg === 1) && (currBook.rate > 0)) currBook.rate--
    if ((arg === 2) && (currBook.rate < 10)) currBook.rate++
    _saveBooksToStorage()
    renderBooks()
}

function sortBooksFirst(sortBy) {
    gBooksSort = sortBy

    if (gBooksSort === 'bookName') {
        gBooks.sort(function (a, b) {
            var bookNameA = a.title.toUpperCase();
            var bookNameB = b.title.toUpperCase();
            if (bookNameA < bookNameB) {
                return -1;
            }
            if (bookNameA > bookNameB) {
                return 1;
            }
            return 0;
        });
    } else {
        gBooks.sort(function (a, b) {
            return a[gBooksSort] - b[gBooksSort];
        });
    }
    _saveBooksToStorage()
}


function sortBooksLast(sortBy) {
    gBooksSort = sortBy

    if (gBooksSort === 'bookName') {
        gBooks.sort(function (a, b) {
            var bookNameA = a.title.toUpperCase();
            var bookNameB = b.title.toUpperCase();
            if (bookNameA > bookNameB) {
                return -1;
            }
            if (bookNameA < bookNameB) {
                return 1;
            }
            return 0;
        });
    } else {
        gBooks.sort(function (a, b) {
            return b[gBooksSort] - a[gBooksSort];
        });
    }
    _saveBooksToStorage()
}


function setPageIdx(arg) {
    console.log(arg)
    // if ((arg === 'down') && (pageIdx > 0)) pageIdx-- ;
    // else if ((arg === 'up')  && (pageIdx < 2)) pageIdx++ ;
    // else {
    //     if (arg === 1 || 2 || 3) pageIdx = arg - 1
    // }
    if (arg === 'all') {
        pageIdx = -1
        return
    }
    if (arg === 'down') {
         if (pageIdx > 0) pageIdx--;
         return
    } 
    else if (arg === 'up') {
       if (pageIdx < 2) pageIdx++;
    } 
    else {
        if (arg === 1 || 2 || 3) pageIdx = arg - 1
    }

}


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}