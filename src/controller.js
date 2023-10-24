import {pool} from './database.js';

class LibroController {
    async getAll(req, res) {
        const [result] = await pool.query('SELECT * FROM Libros');
        res.json(result);
    }

    async getOne(req, res) {
        try {
            const libro = req.body;
            const [result] = await pool.query(`SELECT * FROM Libros WHERE id = ${libro.id}`);
            if (result.length === 0) {
                throw new Error('Libro no encontrado');
            }
            res.json(result[0]);
        } catch (error) {
            console.log(error);
            res.status(404).json({error: 'id inexistente'});
        }
        
    }

    async addOne(req, res) {
        try {
            const libro = req.body;
            const [result] = await pool.query(`INSERT INTO Libros (nombre, autor, categoria, añoPublicacion, ISBN) VALUES (?, ?, ?, ?, ?)`, [libro.nombre, libro.autor, libro.categoria, libro.añoPublicacion, libro.ISBN]);
            res.json({"id insertado": result.insertId});
        } catch (error) {
            console.log(error);
            res.status(404).json({error: 'Atributos incorrectos o nulos'});
        }

    }

    async deleteOne(req, res) {
        try {
            const libro = req.body;
            const [result] = await pool.query(`DELETE FROM Libros WHERE ISBN=(?)`, [libro.ISBN]);
            if (result.affectedRows === 0) {
                throw new Error('Libro no encontrado');
            }
            res.json({"Registros eliminados": result.affectedRows});
        } catch (error) {
            console.log(error);
            res.status(404).json({error: 'ISBN inexistente'});
        }

    }

    async updateOne(req, res) {
        try {
            const libro = req.body;
            const [result] = await pool.query(`UPDATE Libros SET nombre=(?), autor=(?), categoria=(?), añoPublicacion=(?), ISBN=(?) WHERE id=(?)`, [libro.nombre, libro.autor, libro.categoria, libro.añoPublicacion, libro.ISBN, libro.id]);
            if (result.changedRows === 0 || libro.id === "") {
                throw new Error('Libro no encontrado');
            }
            res.json({"Registros actualizados": result.changedRows});
        } catch (error) {
            console.log(error);
            res.status(404).json({error: 'id inexistente'});
        }

    }
}

export const libro = new LibroController();