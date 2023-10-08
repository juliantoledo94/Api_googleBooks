/*
Objetivo: Construir una página web que permita buscar libros por título utilizando la API de Google Books y mostrar los resultados en la página.

Funcionalidad Básica:

Crear una página HTML simple con un campo de entrada de texto y un botón.
Cuando el usuario ingrese el título de un libro y haga clic en el botón, la página deberá hacer una solicitud a la API de Google Books para buscar el libro por título.
Mostrar los resultados de la búsqueda en la página, incluyendo el título del libro, el autor, el año de publicación y una descripción breve si está disponible.
Si el libro no se encuentra, mostrar un mensaje indicando que no se encontraron resultados.
*/

const getBookFromApi = (endpoint) =>{
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${endpoint}`)
    .then(response => response.json())
    
    .then(({ items }) => {
        return items.map(book => {
            const { title, authors } = book.volumeInfo;
            
            return { title, authors };
        });
    });
}

const pageContent = document.querySelector("#bookResults")

const searchButton = document.querySelector("#searchButton");
const searchInput = document.querySelector("#movieTitle");

searchButton.addEventListener("click", () => {
    const title = searchInput.value; // Obtener el valor ingresado en el campo de entrada
    

    // Realizar la solicitud a la API de Google Books con el título ingresado
    getBookFromApi(title)
        .then(books => {
            // Limpiar resultados anteriores
            pageContent.innerHTML = "";

            if (books.length === 0) {
                // Si no se encontraron resultados, mostrar un mensaje
                pageContent.innerHTML = "<p>No se encontraron resultados.</p>";
            } else {
                // Mostrar los resultados en la página
                const template = books
                    .map(libro => createCard(libro))
                    .join("");
                pageContent.innerHTML = template;
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
});


const createCard = ({ title, authors }) => {
    return `
    <div class="row container m-1">
        <div class="col-sm-6 mb-3 mb-sm-0 container">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${authors}</p>
                </div>
            </div>
        </div>
    </div>
    `;
};


/* 

const renderPage = async () =>{
    firstPage = await getBookFromApi(`${valorIngresado}`)
    const template = firstPage
    .map(libro => createCard(libro))
    .join("")
    pageContent.innerHTML= template
    
}

renderPage()
*/