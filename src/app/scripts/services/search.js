import swal from "sweetalert";


// Función para buscar usuarios por nombre
export const searchUsers = (searchQuery, users) => {
    const query = searchQuery.toLowerCase();
    return users.filter((user) => user.name.toLowerCase().includes(query));
  };
  
  // Función para manejar la búsqueda
  export const handleSearch = (event, users, chatLeft, chatRight, imgProfileUserLogged) => {
    const searchQuery = event.target.value.trim();
    if (searchQuery === "") {
      swal("La consulta de búsqueda está vacía");
      printUsers(users, chatLeft, chatRight, imgProfileUserLogged);
    } else {
      const filteredUsers = searchUsers(searchQuery, users);
      if (filteredUsers.length === 0) {
        swal("No se encontraron contactos con ese nombre");
      }
      printUsers(filteredUsers, chatLeft, chatRight, imgProfileUserLogged);
    }
  };
  