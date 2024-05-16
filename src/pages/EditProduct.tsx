import {
  Link,
  Form,
  useActionData,
  ActionFunctionArgs,
  redirect,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import {
  getProductById,
  updateProduct,
} from "../services/ProductService";
import { Product } from "../types";
import ProductForm from "../components/ProductForm";

export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id !== undefined) {
    const product = await getProductById(+params.id);
    if (!product) {
      /* throw new Response('', {status: 404, statusText: 'No Encontrado'}) */
      return redirect("/");
    }
    return product;
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  /* console.log(data); */

  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }
  if (error.length) {
    return error;
  }

  if (params.id !== undefined) {
    await updateProduct(data, +params.id);
    return redirect("/");
  }
}

const availabilityOptions = [
  { name: "Disponible", value: true },
  { name: "No Disponible", value: false },
];

const EditProduct = () => {
  const product = useLoaderData() as Product;
  const error = useActionData() as string;
  /*   const {state}= useLocation()


  console.log(state); */

  return (
    <>
      <div className="flex justify-around items-center">
        <h2 className="text-2xl font-black text-slate-600">Editar producto</h2>
        <Link
          to="/"
          className="rounded-md bg-slate-600 p-2 text-sm font-bold text-white shadow-sm hover:bg-slate-500"
        >
          Volver
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {/* Formulario */}

      <Form className="mt-10" method="POST">

        <ProductForm 
          product={product}
        />
        
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="availability">
            Disponibilidad:
          </label>
          <select
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="availability"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type="submit"
          className="mt-5 w-full bg-slate-700 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Guardar Cambios"
        />
      </Form>
    </>
  );
};

export default EditProduct;
