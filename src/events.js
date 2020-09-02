const express = require('express');

function createRouter(db) {
  const router = express.Router();

  router.post('/event', (req, res, next) => {
    db.query(
      'INSERT INTO events (owner, name, description) VALUES (?,?,?)',
      [req.body.owner, req.body.name, req.body.description],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.get('/event', function (req, res, next) {
    db.query(
      'SELECT * FROM tokens',
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });
  
  router.get('/event/:name', function (req, res, next) {
    db.query(
      'SELECT * FROM events WHERE name=?',
      [req.body.name,],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.put('/event/:name', function (req, res, next) {
   
    db.query(
      'UPDATE events SET owner=? name=?, description=? WHERE name=?',
      [req.body.owner,req.body.name, req.body.description, req.body.name,],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.delete('/event/:name', function (req, res, next) {
    db.query(
      'DELETE FROM events WHERE name=?',
      [req.body.name],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  return router;
}

module.exports = createRouter;
