// const pool = require("../config");

//---------------------------------------------------- CART DATA ----------------------------------------------------\\

// const cartData = async (req, res) => {
//   const { user_id, products } = req.body;
//   let conn;

//   try {
//     conn = await pool.getConnection();

//     const myquery = `INSERT INTO cart_data (user_id) VALUES (?)`;
//     const [result] = await conn.execute(myquery, [user_id]);

//     const cart_id = result.insertId;
//     console.log("cart_id ",cart_id);

//     const cartOrderQuery = `INSERT INTO cart_detail (cart_id, product_id, product_quantity) VALUES (?, ?, ?)`;


//     for (const product of products) {
//       const {product_id, product_quantity} =product;

//       await conn.execute(cartOrderQuery, [
//         cart_id,
//         product_id,
//         product_quantity,
//       ]);
//     }



//     res.status(200).json({ status: 1, data: result });
//   } catch (err) {
//     console.error("Error inserting cart data:", err);
//     res.status(500).json({ status: 0, error: err.message });
//   } finally {
//     if (conn) {
//       conn.release();
//     }
//   }
// };

// module.exports = { cartData };
