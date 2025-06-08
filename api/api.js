const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Připojení k DB a načtení schématu
const db = new sqlite3.Database('./database.sqlite');
const schema = fs.readFileSync(path.join(__dirname, '..', 'database/schema.sql'), 'utf8');
db.exec(schema);

// ZAPARKOVÁNÍ
router.post('/zaparkovat', (req, res) => {
  const { parkovaci_misto, patro, SPZ, typ, majitel, barva } = req.body;
  const cas_zaparkovani = new Date().toISOString();

  // Validace vstupních dat
  if (
    !parkovaci_misto ||
    !patro ||
    !SPZ ||
    !typ ||
    !majitel ||
    !barva
  ) {
    return res.status(400).json({ error: 'Chybí povinné údaje.' });
  }

  db.serialize(() => {
    db.run(
      `INSERT INTO parkovani (parkovaci_misto, patro, zabrano) VALUES (?, ?, ?)`,
      [parkovaci_misto, patro, true],
      function (err) {
        if (err) return res.status(500).json({ error: 'Chyba zápisu místa.' });

        const parkovaniId = this.lastID;

        db.run(
          `INSERT INTO auto (parkovani_id, SPZ, typ, majitel, barva) VALUES (?, ?, ?, ?, ?)`,
          [parkovaniId, SPZ, typ, majitel, barva]
        );

        db.run(
          `INSERT INTO cas (parkovani_id, cas_zaparkovani, cas_odjezdu) VALUES (?, ?, NULL)`,
          [parkovaniId, cas_zaparkovani]
        );

        res.json({ message: 'Auto zaparkováno.', id: parkovaniId });
      }
    );
  });
});

// SEZNAM MÍST
router.get('/parkovani', (req, res) => {
  db.all(`SELECT * FROM parkovani`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// DETAIL MÍSTA
router.get('/detail/:id', (req, res) => {
  const id = req.params.id;

  db.get(
    `
    SELECT 
      p.*, 
      a.SPZ, a.typ, a.majitel, a.barva,
      c.cas_zaparkovani, c.cas_odjezdu
    FROM parkovani p
    LEFT JOIN auto a ON a.parkovani_id = p.id
    LEFT JOIN cas c ON c.parkovani_id = p.id
    WHERE p.id = ?
    `,
    [id],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Záznam nenalezen.' });
      res.json(row);
    }
  );
});

// ODJEZD
router.put('/odjet/:id', (req, res) => {
  const id = req.params.id;
  const cas_odjezdu = new Date().toISOString();

  db.serialize(() => {
    db.run(`UPDATE parkovani SET zabrano = 0 WHERE id = ?`, [id]);
    db.run(`UPDATE cas SET cas_odjezdu = ? WHERE parkovani_id = ?`, [cas_odjezdu, id]);

    res.json({ message: 'Auto odjelo z místa.' });
  });
});

// SMAZÁNÍ
router.delete('/smazat/:id', (req, res) => {
  const id = req.params.id;

  db.serialize(() => {
    db.run(`DELETE FROM auto WHERE parkovani_id = ?`, [id]);
    db.run(`DELETE FROM cas WHERE parkovani_id = ?`, [id]);
    db.run(`DELETE FROM parkovani WHERE id = ?`, [id]);

    res.json({ message: 'Záznam byl smazán.' });
  });
});

module.exports = router;
