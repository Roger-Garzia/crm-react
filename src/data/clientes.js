export async function getCustomers() {
    const res = await fetch(import.meta.env.VITE_API_URL_DEV)
    const data = res.json()

    return data
}

export async function getCustomerById(id) {
    const res = await fetch(`${import.meta.env.VITE_API_URL_DEV}/${id}`)
    const data = res.json()

    return data
}

export async function addCustomer(datos) {
    try {
        const res = await fetch(import.meta.env.VITE_API_URL_DEV, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: { 'Content-Type': 'application/json'}
        })

        await res.json()
        
    }catch (error) {
        console.log(error)
    }
}

export async function editCustomer(id, datos) {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL_DEV}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(datos),
            headers: { 'Content-Type': 'application/json'}
        })

        await res.json()
        
    }catch (error) {
        console.log(error)
    } 
}

export async function deleteCustomer(id) {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL_DEV}/${id}`, {
            method: 'DELETE'
        })
    
        await res.json()
        
    }catch (error) {
        console.log(error)
    } 
}