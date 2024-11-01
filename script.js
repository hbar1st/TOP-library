"use strict";
const myLibrary = [];
const bookSectionEl = document.querySelector("section");

function Book(title, author, pages, readFlag) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readFlag = readFlag;

    this.info = () => {
        return `title: ${this.title}, author: ${this.author}, pages: ${this.pages}, read: ${this.readFlag}`;
    };

    this.toDiv = () => {
        return `<div><p><strong>Title:</strong> ${this.title}</p><p><strong>Author:</strong> ${this.author}</p><p><strong>Pages:</strong> ${this.pages}</p><p class=${this.readFlag ? "read" : "unread"}><strong>Read:</strong></p></div>`;
    }
}

function addBookToLibrary(title, author, pages, readFlag) {
    myLibrary.push(new Book(title, author, pages, readFlag));
}

function displayMyLibrary() {

    myLibrary.forEach((book, i) => {
        bookSectionEl.innerHTML += `<article data-index="${i}">` + book.toDiv() +
            `<div><button data-index="${i}" data-type="toggle" type="button">Toggle Read</button><button data-index="${i}" data-type="delete" type="button">Delete Book</button></div></article>`;
    });

}

addBookToLibrary("My First Book", "Its Author", 111, true);

displayMyLibrary();

document.addEventListener("click", (e) => {
    if (e.target.getAttribute("id") === "add-btn") {

    } else if (e.target.getAttribute("data-type")) {
        const action = e.target.getAttribute("data-type");
        const index = parseInt(e.target.getAttribute("data-index"));
        const children = bookSectionEl.childNodes.values();

        if (action === "delete") {
            const newLib = myLibrary.filter((el, i) => i !== index);
            for (const el in children) {
                if (el.nodeType === 1 && el.getAttribute("data-index")) {
                    bookSectionEl.removeChild(el);
                    myLibrary = newLib;
                    break;
                }
            }
        }

    }

});