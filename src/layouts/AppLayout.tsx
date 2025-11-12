import { Link, Outlet, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from '@/components/Logo'
import NavMenu from '@/components/NavMenu'
import { useAuth } from '@/hooks/useAuth'
import { Puff } from 'react-loader-spinner'

export default function AppLayout() {
    const {data, isError, isLoading} = useAuth()
    if (isLoading) {
        return (
        <div className="flex flex-col justify-center items-center h-screen space-y-5">
            <Puff
            height={100}
            width={100}
            color="#a855f7"
            ariaLabel="puff-loading"
            />
            <p className="text-gray-500 text-xl font-semibold animate-pulse">
                Cargando...
            </p>
        </div>
        );
    }
    if(isError) {
        return <Navigate to='/auth/login'/>
    }
    if(data) return (
        <>
            <header className='bg-gray-800 py-5'>
                <div className='max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center'>
                    <div className='w-64'>
                        <Link to={'/'}><Logo/></Link>
                    </div>

                    <NavMenu
                        name={data.name}
                    />
                </div>
            </header>

            <section className='max-w-screen-2xl mx-auto mt-10 p-5'>
                <Outlet/>
            </section>
            

            <footer className='py-5'>
                <p className='text-center'>&copy;Pedev {new Date().getFullYear()} - Todos los derechos reservados</p>
            </footer>

            <ToastContainer
                position="top-center"
                pauseOnFocusLoss={false}
                pauseOnHover={false}
                theme="dark"
            />
        </>
        
    )
}
