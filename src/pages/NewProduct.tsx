import { Link, Form, useActionData, ActionFunctionArgs, redirect } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { addProduct } from "../services/ProductService"
import ProductForm from "../components/ProductForm"

export async function action({request} : ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())
    /* console.log(data); */

    let error = ''
    if(Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
    }
    if(error.length) {
        return error
    }
    
    await addProduct(data)
    
    return redirect('/')
}

const NewProduct = () => {
  const error = useActionData() as string


  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-600">
          Ingresar producto
        </h2>
        <Link
          to="/"
          className="rounded-md bg-slate-700 p-3 text-sm font-bold text-white shadow-sm hover:bg-slate-500"
        >
          Volver
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

{/* Formulario */}

      <Form className="mt-10"
            method="POST"
      >
        <ProductForm />
        <input
          type="submit"
          className="w-full bg-slate-700 p-2 text-white font-bold text-lg cursor-pointer rounded hover:bg-slate-500"
          value="Registrar Producto"
        />
      </Form>
    </>
  );
};

export default NewProduct;
