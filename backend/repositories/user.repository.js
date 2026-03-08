const db = require("../config/database").getConnection();

class UserRepository {
  getAll(search) {
    return new Promise((resolve, reject) => {
      if (search) {
        db.query(
          "SELECT * FROM users WHERE nombre LIKE ? OR apellidos LIKE ? OR dni LIKE ?",
          [`%${search}%`, `%${search}%`, `%${search}%`],
          (err, results) => {
            if (err) reject(err);
            else resolve(results);
          }
        );
      } else {
        db.query("CALL GetUsers()", (err, results) => {
          if (err) reject(err);
          else resolve(results[0]);
        });
      }
    });
  }

  create(user) {
    return new Promise((resolve, reject) => {
      db.query(
        "CALL InsertUser(?, ?, ?, ?, ?, ?, ?, ?)",
        [
          user.nombre,
          user.apellidos,
          user.dni,
          user.direccion,
          user.telefono,
          user.correo,
          user.categoria,
          user.estado
        ],
        (err) => {
          if (err) reject(err);
          else resolve({ message: "Usuario creado" });
        }
      );
    });
  }

  update(id, user) {
    return new Promise((resolve, reject) => {
      db.query(
        "CALL UpdateUser(?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          id,
          user.nombre,
          user.apellidos,
          user.dni,
          user.direccion,
          user.telefono,
          user.correo,
          user.categoria,
          user.estado
        ],
        (err) => {
          if (err) reject(err);
          else resolve({ message: "Usuario actualizado" });
        }
      );
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      db.query("CALL DeleteUser(?)", [id], (err) => {
        if (err) reject(err);
        else resolve({ message: "Usuario eliminado" });
      });
    });
  }

  getTotalUsers() {
    return new Promise((resolve, reject) => {
      db.query("CALL GetTotalUsers()", (err, results) => {
        if (err) reject(err);
        else resolve(results[0][0]);
      });
    });
}

  getUsersByEstado() {
    return new Promise((resolve, reject) => {
      db.query("CALL GetUsersByEstado()", (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  }

  getUsersByCategoria() {
    return new Promise((resolve, reject) => {
      db.query("CALL GetUsersByCategoria()", (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  }

  getLastInserted() {
    return new Promise((resolve, reject) => {
      db.query("CALL GetLastInserted()", (err, results) => {
        if (err) reject(err);
        else resolve(results[0][0]);
      });
    });
  }

  getLastUpdated() {
    return new Promise((resolve, reject) => {
      db.query("CALL GetLastUpdated()", (err, results) => {
        if (err) reject(err);
        else resolve(results[0][0]);
      });
    });
}
}

module.exports = new UserRepository();