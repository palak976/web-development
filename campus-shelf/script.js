
const books = [
    {
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen",
        subject: "DSA",
        courseCode: "CS201",
        shelf: "A-01",
        available: 2
    },
    {
        title: "Database System Concepts",
        author: "Abraham Silberschatz",
        subject: "DBMS",
        courseCode: "CS202",
        shelf: "B-03",
        available: 1
    },
    {
        title: "Operating System Concepts",
        author: "Abraham Silberschatz",
        subject: "Operating Systems",
        courseCode: "CS203",
        shelf: "C-02",
        available: 0
    },
    {
        title: "Discrete Mathematics",
        author: "Kenneth H. Rosen",
        subject: "Mathematics",
        courseCode: "MA201",
        shelf: "D-01",
        available: 3
    },
    {
        title: "Data Structures Using C",
        author: "Reema Thareja",
        subject: "DSA",
        courseCode: "CS201",
        shelf: "A-02",
        available: 2
    },
    {
        title: "Fundamentals of Database Systems",
        author: "Ramez Elmasri",
        subject: "DBMS",
        courseCode: "CS202",
        shelf: "B-04",
        available: 0
    }
];

const bookList = document.getElementById("book-list");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchMessage = document.getElementById("search-message");

// Display books on the page
function displayBooks(bookArray) {
    bookList.innerHTML = "";

    if (bookArray.length === 0) {
        bookList.innerHTML =
            '<p class="no-results">No matching books found. Try another search.</p>';
        return;
    }

    bookArray.forEach(function(book) {
        const card = document.createElement("div");
        card.className = "book-card";

        let status;

        if (book.available > 0) {
            status = book.available + " copies available";
        } else {
            status = "Currently unavailable";
        }

        card.innerHTML = `
            <p class="book-subject">${book.subject}</p>
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Course: ${book.courseCode}</p>
            <p>Shelf: ${book.shelf}</p>
            <span class="availability">${status}</span>
        `;

        bookList.appendChild(card);
    });
}

// Search books
searchForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const query = searchInput.value.trim().toLowerCase();

    if (query === "") {
        searchMessage.textContent =
            "Please enter a book title, author, or subject.";
        displayBooks(books);
        return;
    }

    const results = books.filter(function(book) {
        return (
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query) ||
            book.subject.toLowerCase().includes(query) ||
            book.courseCode.toLowerCase().includes(query)
        );
    });

    searchMessage.textContent =
        results.length + " matching book(s) found.";

    displayBooks(results);
});

// Filter books by subject
const subjectButtons = document.querySelectorAll(".subject-btn");

subjectButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const subject = button.dataset.subject;

        const results = books.filter(function(book) {
            return book.subject === subject;
        });

        searchInput.value = "";
        searchMessage.textContent = "Showing books for " + subject + ".";

        displayBooks(results);

        document.getElementById("catalog").scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Display all books when the page opens
displayBooks(books);
