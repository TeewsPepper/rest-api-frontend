import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom";
import { getProducts, updateProductAvailability } from "../services/ProductService";
import ProductsDetails from "../components/ProductsDetails";
import { Product } from "../types";

export async function loader() {
  const products = await getProducts();
  return products;
}

export async function action({request} : ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())
        await updateProductAvailability(+data.id)
        
  return{}
}

const Products = () => {
  const products = useLoaderData() as Product[]

  return (
    <>
      <div className="w-full flex justify-start gap-4">
        <h2 className="text-2xl font-black text-slate-600">Inventario</h2>
        <Link
          to="productos/nuevo"
          className="rounded-md bg-slate-700 p-2 text-sm font-bold text-white shadow-sm hover:bg-slate-500"
        >
          Agregar
        </Link>
      </div>

      <div className="sm:w-full md:w-full bg-slate-400 sm:flex justify-center mt-2 p-4">
        <table className="w-2/4 mt-5 mx-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-1">Producto</th>
              <th className="p-1">Precio</th>
              <th className="p-1">Disponibilidad</th>
              <th className="p-1">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product =>(
              <ProductsDetails 
                key={product.id}
                product={product}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Products;
