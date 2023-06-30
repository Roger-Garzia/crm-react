import { useLoaderData } from 'react-router-dom'
import { getCustomers } from '../data/clientes'
import Cliente from '../components/Cliente';

export function loader() {
    const allCustomers = getCustomers()

    return allCustomers
}


const Index = () => {

    const allCustomers = useLoaderData();
    
    return(
        <>
            <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
            <p className="mt-3">Administra tus Clientes</p>
            { allCustomers.length ? (
                <table className="w-full bg-white shadow mt-5 table-auto">
                    <thead className="bg-blue-800 text-white">
                    <tr>
                        <th className="p-2">Cliente</th>
                        <th className="p-2">Contacto</th>
                        <th className="p-2">Actividades</th>
                        <th className="p-2">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                        {allCustomers.map(cliente => (
                            <Cliente 
                                key={cliente.id}
                                cliente={cliente}
                            />
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className='text-center mt-10'>No hay Clientes aún</p>
            )}
        </>
    )
}

export default Index