const sqlite3 = require('sqlite3').verbose();
const { v4 } = require('uuid');

class UserCrudService {
  constructor(databaseFilename) {
    this.db = new sqlite3.Database(databaseFilename);
  }

  async createUser(payload) {
    if(!payload.firstName || !payload.lastName || !payload.age || !payload.email) {
      return Promise.reject(new Error('Missing required fields'));
    }

    return new Promise((resolve, reject) => {
      this.db.run(
        `INSERT INTO users (id, firstName, lastName, age, email) VALUES (?, ?, ?, ?, ?)`,
        [v4(), payload.firstName, payload.lastName, payload.age, payload.email],
        (result, error) => {
          if(error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  async getById(userId) {
    if(!userId) {
      return Promise.reject(new Error('Missing required fields'));
    }

    return new Promise((resolve, reject) => {
      this.db.get(
        `SELECT * FROM users WHERE id = ?`,
        [userId],
        (error, row) => {
          if(error) {
            reject(error);
          } else {
            resolve(row);
          }
        }
      );
    });
  }

  async getByEmail(email) {
    if(!email) {
      return Promise.reject(new Error('Missing required fields'));
    }

    return new Promise((resolve, reject) => {
      this.db.get(
        `SELECT * FROM users WHERE email = ?`,
        [email],
        (error, row) => {
          if(error) {
            reject(error);
          } else {
            resolve(row);
          }
        }
      );
    });
  }

  async getAll() {
    return new Promise((resolve, reject) => {
      this.db.all(
        `SELECT * FROM users`,
        (error, rows) => {
          if(error) {
            reject(error);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  async updateById(userId, payload) {
    if(!userId) {
      return Promise.reject(new Error('Missing required fields'));
    }

    if(!payload.firstName || !payload.lastName || !payload.age || !payload.email) {
      return Promise.reject(new Error('Missing required fields'));
    }

    return new Promise((resolve, reject) => {
      this.db.run(
        `UPDATE users SET firstName = ?, lastName = ?, age = ?, email = ? WHERE id = ?`,
        [payload.firstName, payload.lastName, payload.age, payload.email, userId],
        (result, error) => {
          if(error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  async deleteById(userId) {
    if(!userId) {
      return Promise.reject(new Error('Missing required fields'));
    }

    return new Promise((resolve, reject) => {
      this.db.run(
        `DELETE FROM users WHERE id = ?`,
        [userId],
        (result, error) => {
          if(error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  }
}

module.exports = new UserCrudService('database.sqlite');