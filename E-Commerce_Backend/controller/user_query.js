const pool = require("../config");

const postUserQuery = async (req, res) => {
  const conn = await pool.getConnection();
  const { user_id, query_type, query_description } = req.body;

  try {
    const myquery = `INSERT INTO user_query (user_id, query_type, query_description) VALUES (?, ?, ?)`;
    const [result] = await conn.execute(myquery, [
      user_id,
      query_type,
      query_description,
    ]);
    res.status(200).json({ status: 1, data: result });
  } catch (err) {
    res.status(500).json({ status: 0, erro: err });
  }
};

const getUserQuery = async (req, res) => {
  const conn = await pool.getConnection();
  const { user_id } = req.params;

  try {
    const myquery = `SELECT * FROM user_query WHERE user_id = ? `;
    const [result] = await conn.execute(myquery, [user_id]);
    res.status(200).json({ status: 1, data: result });
  } catch (err) {
    res.status(500).json({ status: 0, erro: err });
  }
};

const getAllUserQuery = async (req, res) => {
  const conn = await pool.getConnection();

  try {
    const myquery = `SELECT UQ.query_id, UQ.user_id, UQ.query_type, UQ.query_description, UQ.query_date, UL.username FROM user_query UQ JOIN users_login UL ON UL.id = UQ.user_id; `;
    const [result] = await conn.execute(myquery);
    res.status(200).json({ status: 1, data: result });
  } catch (err) {
    res.status(500).json({ status: 0, erro: err });
  }
};


const updateQueryStatus = async (req, res) => {
  const conn = await pool.getConnection();
  const { query_id, query_status, query_status_date } = req.body;

  try {
    let myquery = `UPDATE user_query SET query_status = ?, query_status_date = ? WHERE query_id = ?`;
    let [result] = await conn.execute(myquery, [query_status, query_status_date, query_id]);
    res.status(200).json({ status: 1, data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 0, error: err });
  } finally {
    conn.release();
  }
};


module.exports = { postUserQuery, getUserQuery, getAllUserQuery, updateQueryStatus };
