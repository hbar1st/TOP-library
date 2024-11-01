"use strict";
let myLibrary = [];
const bookSectionEl = document.querySelector("section");

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
    myLibrary.push(new Book(title, author, id, pages, readFlag));
}

function displayMyLibrary() {

    myLibrary.forEach(book => {
        const i = book.id;
        bookSectionEl.innerHTML += `<article data-index="${i}">` + book.toDiv() +
            `<div><button data-index="${i}" data-type="toggle" type="button">Toggle Read</button><button data-index="${i}" data-type="delete" type="button">Delete Book</button></div></article>`;
    });

}

addBookToLibrary("My First Book", "Its Author", 111, 111, true);

displayMyLibrary();

document.addEventListener("click", (e) => {
    if (e.target.getAttribute("id") === "add-btn") {

    } else if (e.target.getAttribute("data-type")) {
        const action = e.target.getAttribute("data-type");
        const children = bookSectionEl.childNodes;
        let nodeNotFound = true;
        let c = 0;


        do {
            const bookEl = children[c];
            if (bookEl.nodeType === 1) {
                const index = parseInt(bookEl.getAttribute("data-index"));
                if (action === "delete") {
                    const newLib = myLibrary.filter(el => el.id !== index);
                    bookSectionEl.removeChild(bookEl);
                    myLibrary = newLib;
                } else { //assume it is a toggle request
                    myLibrary.forEach((book, i) => {
                        if (book.id === index) {
                            book.readFlag = !book.readFlag;
                            if (book.readFlag) {
                                bookEl.firstElementChild.lastElementChild.classList.replace("unread", "read");
                            } else {
                                bookEl.firstElementChild.lastElementChild.classList.replace("read", "unread");
                            }
                        }
                    });
                }
                nodeNotFound = false;
            }
            c++;
        } while (nodeNotFound);

    }

});