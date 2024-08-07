const pool = require("../config");

//---------------------------------------------------- ORDER DATA ----------------------------------------------------\\

const postOrder = async (req, res) => {
  const conn = await pool.getConnection(); // Add 'const' to the conn variable
  const { user_id, total_value, payment_mode, order_status, products } =
    req.body;

  try {
    const myquery = `INSERT INTO order_data (user_id, total_value, order_status, payment_mode) VALUES (?, ?, ?, ?)`;
    const [result] = await conn.execute(myquery, [
      user_id,
      total_value,
      order_status,
      payment_mode,
    ]);
    const order_id = result.insertId;
    console.log("result", order_id);

    const productOrderQuery = `INSERT INTO order_detail (order_id, product_id, product_quantity) VALUES (?, ?, ?)`;

    for (const product of products) {
      const { product_id, product_quantity } = product;
      await conn.execute(productOrderQuery, [
        order_id,
        product_id,
        product_quantity,
      ]);
    }

    res.status(200).json({ status: 1, data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 0, error: err });
  } finally {
    conn.release();
  }
};

const updateOrderStatus = async (req, res) => {
  const conn = await pool.getConnection();
  const { order_id, order_status } = req.body;

  try {
    const query = `UPDATE order_data SET order_status = ? WHERE order_id = ?`;
    const [result] = await conn.execute(query, [order_status, order_id]);

    if (result.affectedRows === 0) {
      res.status(404).json({ status: 0, message: "Order not found" });
    } else {
      res.status(200).json({ status: 1, message: "Order status updated" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 0, error: err });
  } finally {
    conn.release();
  }
};

module.exports = { postOrder, updateOrderStatus };
