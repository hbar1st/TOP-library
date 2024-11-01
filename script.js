"use strict";
let myLibrary = [];
const bookSectionEl = document.querySelector("section");
const dialog = document.querySelector("dialog");
const closeButton = document.querySelector("dialog button");
const addButton = document.querySelector("dialog>form>button");
const nameField = document.querySelector("#name");
const authorField = document.querySelector("#author");
const idField = document.querySelector("#id");
const pagesField = document.querySelector("#pages");
const readFlagField = document.querySelector("#read-flag");
const requiredMsg = document.querySelector('#required');


function Book(title, author, id, pages, readFlag) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readFlag = readFlag;
    this.id = id;

    this.info = () => {
        return `title: ${this.title}, author: ${this.author}, id: ${this.id}, pages: ${this.pages}, read: ${this.readFlag}`;
    };

    this.toDiv = () => {
        return `<div><p><strong>Title:</strong> ${this.title}</p><p><strong>Author:</strong> ${this.author}</p><p><strong>Pages:</strong> ${this.pages}</p><p class=${this.readFlag ? "read" : "unread"}><strong>Read:</strong></p></div>`;
    }
}

function addBookToLibrary(title, author, id, pages, readFlag) {

    //we assume that all ids are unique!! if id exists, then old book is removed first
    myLibrary = myLibrary.filter(el => el.id !== id);
    const book = new Book(title, author, id, pages, readFlag);
    myLibrary.push(book);
    return book;
}

function displayMyLibrary() {

    myLibrary.forEach(book => {
        displayNewBook(book);
    });

}

function displayNewBook(book) {
    const i = book.id;
    bookSectionEl.innerHTML += `<article class="letter" data-index="${i}">` + book.toDiv() +
        `<div><button data-index="${i}" data-type="toggle" type="button">Toggle Read</button><button data-index="${i}" data-type="delete" type="button">Delete Book</button></div></article>`;
}

addBookToLibrary("My First Book", "Its Author", 111, 111, true);

displayMyLibrary();
closeButton.addEventListener("click", e => {
    console.log(e.target);
    dialog.close();
});

addButton.addEventListener("click", e => {
    e.preventDefault();
    const name = nameField.value;
    const author = authorField.value;
    const id = idField.value;
    const pages = pagesField.value;
    const readFlag = readFlagField.checked;

    if (name && author && id && pages) {
        const book = addBookToLibrary(name, author, parseInt(id), parseInt(pages), readFlag);
        displayNewBook(book);
        requiredMsg.classList.remove("highlighted");
        dialog.close();
    } else {
        requiredMsg.classList.add("highlighted");
    }
});

document.addEventListener("click", (e) => {
    if (e.target.getAttribute("id") === "add-book") {
        dialog.showModal();
    } else if (e.target.getAttribute("data-type")) {
        const action = e.target.getAttribute("data-type");
        const children = bookSectionEl.childNodes;
        let nodeNotFound = true;
        let c = 0;

        const index = parseInt(e.target.getAttribute("data-index"));

        do {
            const bookEl = children[c];
            if (bookEl.nodeType && bookEl.nodeType === 1) {
                if (action === "delete") {
                    const newLib = myLibrary.filter(el => el.id !== index);
                    bookSectionEl.removeChild(bookEl);
                    myLibrary = newLib;
                    nodeNotFound = false;
                } else { //assume it is a toggle request
                    if (parseInt(bookEl.getAttribute("data-index")) === index) {
                        //found the book in the DOM that we need to toggle readFlag for
                        // now find the same book in myLibrary
                        const bookIndex = myLibrary.findIndex(el => el.id === index);
                        const book = myLibrary[bookIndex];
                        book.readFlag = !book.readFlag;
                        if (book.readFlag) {
                            bookEl.firstElementChild.lastElementChild.classList.replace("unread", "read");
                        } else {
                            bookEl.firstElementChild.lastElementChild.classList.replace("read", "unread");
                        }
                        nodeNotFound = false;
                    }

                }
            }
            c++;
        } while (nodeNotFound || c > children.length);

    }

});