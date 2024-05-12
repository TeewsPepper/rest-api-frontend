import { Form, useNavigate, ActionFunctionArgs, redirect, useFetcher } from 'react-router-dom'
import { Product } from "../types";
import { formatCurrency } from "../utils";
import { deleteProduct } from '../services/ProductService';

type ProductDetailProps = {
  product: Product;
};

export async function action({params} : ActionFunctionArgs) {
  if(params.id !== undefined) {
    await deleteProduct(+params.id)

    return redirect('/')
  }
      
}

export default function ProductsDetails({ product }: ProductDetailProps) {

    const fetcher = useFetcher()
    const navigate = useNavigate()
    const isAvailable = product.availability

  return (
    <tr className="border-b ">
      <td className="p-3 text-sm text-gray-800">{product.name}</td>
      <td className="p-3 text-sm text-gray-800">{formatCurrency(product.price)}</td>
      <td className="p-3 text-sm text-gray-800">

        <fetcher.Form method='POST'>
          <button
            className={`${isAvailable ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black hover:cursor-pointer `}
            type='submit'
            name='id'
            value={product.id}
          >
              {isAvailable ? 'Disponible' : 'No disponible'}    
          </button>
        </fetcher.Form>
        
        
      </td>
      <td className="p-3 text-gray-800 ">
        <div className="flex gap-2 items-center">
          <button 
              onClick={() => navigate(`/productos/${product.id}/editar`)}
              className='bg-slate-300 text-indigo-600 rounded-lg w-full p-2 uppercase font-bold text-xs text-center'
              >Editar
          </button>

          <Form className='w-full'
                method='POST'
                action={`productos/${product.id}/eliminar`}
                onSubmit={ (e) => {
                    if( !confirm('¿Eliminar registro?')) {
                      e.preventDefault()
                    }
                }}
          >
            <input 
              className='bg-slate-300 text-red-600 rounded-lg w-full p-2 uppercase font-bold text-xs text-center hover:cursor-pointer'
              type='submit'
              value='Eliminar'
            />
          </Form>
        </div>
      </td>
    </tr>
  );
}
