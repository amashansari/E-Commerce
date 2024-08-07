const pool = require("../config");

//---------------------------------------------- REGISTER ADMIN ----------------------------------------------\\

const registeAdmin = async (req, res) => {
  const conn = await pool.getConnection();
  const { email_id, email_pass } = req.body;

  try {
    let myquery = `INSERT INTO admin_login (email_id, email_pass ) VALUES ( ?, ?) `;
    let [result] = await conn.execute(myquery, [email_id, email_pass]);
    console;
    res.status(200).json({ status: 1, data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 0, error: err });
  } finally {
    conn.release();
  }
};

//---------------------------------------------- VERIFY EXISTING ADMIN ----------------------------------------------\\

const verifyAdmin = async (req, res) => {
  const conn = await pool.getConnection();
  const { email_id, email_pass } = req.body;

  try {
    let myquery = `SELECT id FROM admin_login WHERE email_id =? and email_pass=? `;
    let [result] = await conn.execute(myquery, [email_id, email_pass]);

    if (result.length > 0) {
      const adminId = result[0].id;
      res.status(200).json({ message: "Login successful.", adminId: adminId });
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

module.exports = { registeAdmin, verifyAdmin };
