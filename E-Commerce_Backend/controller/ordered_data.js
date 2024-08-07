const pool = require("../config");

//--------------------------------------------------- ORDERED DATA ---------------------------------------------------\\

const orderedData = async (req, res) => {
  const conn = await pool.getConnection();
  const { id } = req.params;

  try {
    const myquery = `
      SELECT 
    O.order_id, 
    O.total_value,
    O.order_status,
    CONCAT('[', GROUP_CONCAT(
        CONCAT(
            '{',
            '"product_id": ', OD.product_id,
            ', "product_quantity": ', OD.product_quantity,
            ', "id": ', PD.id,
            ', "title": "', PD.title,
            '", "description": "', PD.description,
            '", "price": ', PD.price,
            ', "brand": "', PD.brand,
            '", "category": "', PD.category,
            '", "thumbnail": "', PD.thumbnail,
            '"}'
        )
        ORDER BY OD.product_id SEPARATOR ', '), ']') AS products
FROM 
    order_data O 
JOIN 
    order_detail OD ON OD.order_id = O.order_id 
JOIN 
    product_data PD ON PD.id = OD.product_id 
JOIN 
    users_login UL ON UL.id = O.user_id 
WHERE 
    UL.id = ?
GROUP BY 
    O.order_id;


    `;
    const [result] = await conn.execute(myquery, [id]);
console.log("single",result);
    let formattedResult = result.map((value) => ({
      ...value,
      products: value.products ? JSON.parse(value.products) : [],
    }));

    res.status(200).json({ status: 1, data: formattedResult });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 0, error: err });
  } finally {
    conn.release();
  }
};

const orderedDataForAllUsers = async (req, res) => {
  const conn = await pool.getConnection();

  try {
    const myquery = `
      SELECT 
        O.order_id, 
        O.total_value,
        O.order_status,
        CONCAT('[', GROUP_CONCAT(
            CONCAT(
                '{',
                '"product_id": ', OD.product_id,
                ', "product_quantity": ', OD.product_quantity,
                ', "id": ', PD.id,
                ', "title": "', PD.title,
                '", "description": "', PD.description,
                '", "price": ', PD.price,
                ', "brand": "', PD.brand,
                '", "category": "', PD.category,
                '", "thumbnail": "', PD.thumbnail,
                '"}'
            )
            ORDER BY OD.product_id SEPARATOR ', '), ']') AS products,
        UL.id AS user_id,
        UL.username AS username
      FROM 
        order_data O 
      JOIN 
        order_detail OD ON OD.order_id = O.order_id 
      JOIN 
        product_data PD ON PD.id = OD.product_id 
      JOIN 
        users_login UL ON UL.id = O.user_id 
      GROUP BY 
        O.order_id, UL.id, UL.username;
    `;
    const [result] = await conn.execute(myquery);
    console.log("all",result);

    let formattedResult = result.map((value) => ({
      ...value,
      products: value.products ? JSON.parse(value.products) : [],
    }));

    res.status(200).json({ status: 1, data: formattedResult });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 0, error: err });
  } finally {
    conn.release();
  }
};

module.exports = { orderedData, orderedDataForAllUsers };
