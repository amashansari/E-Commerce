const pool = require("../config");

//---------------------------------------------- GET PRODUCT_DATA ----------------------------------------------\\

const getAllProduct = async (req, res) => {
  const conn = await pool.getConnection();

  try {
    let myquery = `SELECT * FROM product_data`;
    let [result] = await conn.execute(myquery);

    res.status(200).json({ status: 1, data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 0, error: err });
  } finally {
    conn.release();
  }
};

const addProductsToCatelogue = async (req, res) => {
  const conn = await pool.getConnection();
  const { title, description, price, brand, category, thumbnail } = req.body;

  try {
    const myquery = `INSERT INTO product_data (title, description, price, brand, category, thumbnail) VALUES(?,?,?,?,?,?)`;
    const [result] = await conn.execute(myquery, [
      title,
      description,
      price,
      brand,
      category,
      thumbnail,
    ]);
    res.status(200).json({ status: 1, data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 0, error: err });
  } finally {
    conn.release();
  }
};

module.exports = { getAllProduct, addProductsToCatelogue };
