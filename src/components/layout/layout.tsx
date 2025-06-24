import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        // <Navbar/>
        <main>
            <Outlet />
        </main>
        //   <Footer />
    )
}

export default Layout