const pool = require("../config");

//---------------------------------------------- GET USERS_LOGIN ----------------------------------------------\\

const getUsers_login = async (req, res) => {
  const conn = await pool.getConnection();

  try {
    let myquery = `SELECT * FROM users_login`;
    let [result] = await conn.execute(myquery);

    res.status(200).json({ status: 1, data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 0, error: err });
  } finally {
    conn.release();
  }
};

//---------------------------------------------- GET USER BY ID ----------------------------------------------\\

const getUserById = async (req, res) => {
  const { id } = req.params;

  const conn = await pool.getConnection();
  try {
    let myquery = `SELECT * FROM users_login WHERE id = ?`;
    let [result] = await conn.execute(myquery, [id]);
    res.status(200).json({ status: 1, data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 0, error: err });
  } finally {
    conn.release();
  }
};

//---------------------------------------------- POST USERS_LOGIN ----------------------------------------------\\

const addUser_login = async (req, res) => {
  const conn = await pool.getConnection();
  const {username, email_id, email_pass, account_created } = req.body;

  try {
    let myquery = `INSERT INTO users_login (username, email_id, email_pass, account_created ) VALUES (?, ?, ?, ?) `;
    let [result] = await conn.execute(myquery, [
      username,
      email_id,
      email_pass,
      account_created
    ]);
    console;
    res.status(200).json({ status: 1, data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 0, error: err });
  } finally {
    conn.release();
  }
};

//---------------------------------------------- VERIFY EXISTING USER ----------------------------------------------\\

const verify_user = async (req, res) => {
  const conn = await pool.getConnection();
  const { email_id, email_pass } = req.body;

  try {
    let myquery = `SELECT id FROM users_login WHERE email_id = ? AND email_pass = ? `;
    let [result] = await conn.execute(myquery, [email_id, email_pass]);

    if (result) {
      const userId = result[0].id;
      res.status(200).json({ message: "Login successful.", userId: userId });
    } else {
      res.status(400).json({ message: "Invalid email or password." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 0, error: err });
  } finally {
    conn.release();
  }
};


module.exports = { getUsers_login, addUser_login, verify_user, getUserById };
