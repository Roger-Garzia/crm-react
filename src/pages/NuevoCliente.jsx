import { useNavigate, Form, useActionData, redirect } from 'react-router-dom'
import { addCustomer } from '../data/clientes'

// Components
import Formulario from '../components/Formulario'
import Error from '../components/Error'

export async function action({ request }) {

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

    await addCustomer(data)
    return redirect('/')
    
}

const NuevoCliente = () => {

    const errores = useActionData()
    const navigate = useNavigate()
    
    return(
        <>
            <h1 className="font-black text-4xl text-blue-900">Nuevos Clientes</h1>
            <p className="mt-3">Registrar nuevos Clientes</p>

            <div className="flex justify-end">
                <button className="bg-blue-800 text-white rounded-md px-3 py-1 font-bold uppercase"
                    onClick={() => navigate(-1)}>Regresar
                </button>
            </div>

            <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">

                {errores?.length && errores.map((e, i) => <Error key={i}>{e}</Error> )}
                
                <Form method="POST" noValidate>
                    <Formulario />
                    <input type="submit" className='rounded-md w-full mt-5 bg-blue-800 p-3 uppercase font-bold text-white text-lg'
                        value="Registrar Nuevo Cliente"
                    />
                </Form>

            </div>
        </>
    )
}


export default NuevoCliente