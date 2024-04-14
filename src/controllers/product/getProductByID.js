import { Product } from "../../database/index.js";

const getProductByID = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ msg: "ID no válido" });
    }

    const product = await Product.findOne({
      where: { id },
    });

    return product
      ? res.status(200).json(product)
      : res.status(404).json({ message: "No encontrado" });
  } catch (error) {
    return res.status(500).json({
      msg: `Error interno en el servidor: ${error.message}`,
    });
  }
};
export default getProductByID;
