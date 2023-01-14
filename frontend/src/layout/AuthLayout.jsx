import { Outlet } from 'react-router-dom'

function AuthLayout() {
    return (
        <>
            <h1>Desde auth layout</h1>
            <main className='container mx-auto md:grid md:grid-cols-2 mt-5 gap-12 p-5 '>
                <Outlet />
            </main>
        </>
    )
}

export default AuthLayout