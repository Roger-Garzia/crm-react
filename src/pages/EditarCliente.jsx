import { Form, useNavigate, useLoaderData, useActionData, redirect } from 'react-router-dom'
import Formulario from '../components/Formulario'
import Error from '../components/Error'
import { getCustomerById, editCustomer } from '../data/clientes'

export async function loader({params}) {
    
    const cliente = await getCustomerById(params.clienteId)

    if(Object.values(cliente).length === 0) {
        throw new Response('', {
            status: 404,
            statusText: 'No se encontraron resultados'
        })
    }

    return cliente
}

export async function action({request, params}) {

    const  regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    const email = formData.get('email')

    // Validacion de Datos en el Formulario
    const errores = []
    if(Object.values(data).includes('')) {
        errores.push('Todos los Campos son Obligatorios')
    }

    if(!regex.test(email)) {
        errores.push('El email no es válido')
    }

    if(Object.keys(errores).length) {
        // En caso de uno o mas Errores retornar todos los Mensajes de error
        return errores
    }

    // Actualizar el cliente seleccionado
    await editCustomer(params.clienteId, data)

    return redirect('/')
}


const EditarCliente = () => {

    const navigate = useNavigate()
    const cliente = useLoaderData()
    const errores = useActionData()
    
    return(
        <>
            <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
            <p className="mt-3">Seccion para Edicion de Clientes</p>

            <div className="flex justify-end">
                <button className="bg-blue-800 text-white rounded-md px-3 py-1 font-bold uppercase"
                    onClick={() => navigate(-1)}>Regresar
                </button>
            </div>

            <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">

                {errores?.length && errores.map((e, i) => <Error key={i}>{e}</Error> )}
                
                <Form method="POST" noValidate>
                    <Formulario cliente={cliente} />
                    <input type="submit" className='rounded-md w-full mt-5 bg-blue-800 p-3 uppercase font-bold text-white text-lg'
                        value="Editar Cliente"
                    />
                </Form>

            </div>
        </>        
    )
}


export default EditarCliente