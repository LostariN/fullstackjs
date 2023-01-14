import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <>
            <div className=" flex items-center">
                <h1 className="text-indigo-600 text-4xl" >Inicia Sesión y Administra tus <span className="font-black">Pacientes</span> </h1>
            </div>

            <div className="[&>*:nth-child]:ml-5 mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                <form action="">
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                        <input type="email" placeholder="Email de registro"
                            className="border w-full p-3 my-3 bg-gray-100 rounded-xl" />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                        <input type="password" placeholder="tu password"
                            className="border w-full p-3 my-3 bg-gray-100 rounded-xl" />
                    </div>

                    <input type="submit"
                        className="bg-indigo-700 hover:bg-indigo-600 w-full py-3 rounded-xl text-white font-bold uppercase mt-10 hover:cursor-pointer md:w-auto px-10 "
                        value="Iniciar Sesión"
                    />
                </form>
                <nav className='mt-10 lg:flex lg:justify-between'>
                    <Link
                        className='block text-gray-500 text-center my-5'
                        to="/registrar">¿No tienes una cuenta?! Registrate!</Link>
                    <Link
                        className='block text-gray-500 text-center my-5'
                        to="/olvide-cuenta">Recupera tu cuenta!!</Link>
                </nav>
            </div>
        </>
    )
}

export default Login