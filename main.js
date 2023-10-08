/*
Objetivo: Construir una página web que permita buscar libros por título utilizando la API de Google Books y mostrar los resultados en la página.

Funcionalidad Básica:

Crear una página HTML simple con un campo de entrada de texto y un botón.
Cuando el usuario ingrese el título de un libro y haga clic en el botón, la página deberá hacer una solicitud a la API de Google Books para buscar el libro por título.
Mostrar los resultados de la búsqueda en la página, incluyendo el título del libro, el autor, el año de publicación y una descripción breve si está disponible.
Si el libro no se encuentra, mostrar un mensaje indicando que no se encontraron resultados.
*/

const getBookFromApi = (endpoint) =>{
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=el%20señor%20de%20los%20anillos`)
    .then(response => response.json())
    .then(({items}) => items.map((books)=>{
        const{volumeInfo} = books
        console.log(volumeInfo)
        return {volumeInfo}
    }))
    
    
}

const pageContent = document.querySelector("#bookResults")
console.log(pageContent)



getBookFromApi()

