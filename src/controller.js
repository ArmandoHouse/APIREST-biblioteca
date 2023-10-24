import {pool} from './database.js';

class LibroController {
    async getAll(req, res) {
        const [result] = await pool.query('SELECT * FROM Libros');
        res.json(result);
    }

    async getOne(req, res) {
        const id = 2;
        const [result] = await pool.query(`SELECT * FROM Libros WHERE id = ${id}`);
        res.json(result);
    }

    async addOne(req, res) {
        const libro = req.body;
        const [result] = await pool.query(`INSERT INTO Libros (nombre, autor, categoria, añoPublicacion, ISBN) VALUES (?, ?, ?, ?, ?)`, [libro.nombre, libro.autor, libro.categoria, libro.añoPublicacion, libro.ISBN]);
        res.json({"id insertado": result.insertId});
    }

    async deleteOne(req, res) {
        const libro = req.body;
        const [result] = await pool.query(`DELETE FROM Libros WHERE ISBN=(?)`, [libro.ISBN]);
        res.json({"Registros eliminados": result.affectedRows});
    }
}

export const libro = new LibroController();