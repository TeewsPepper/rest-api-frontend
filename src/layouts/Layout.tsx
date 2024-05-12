import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <>
     <header className="bg-slate-700 ">
      <div className="mx-auto w-full p-4">
        <h1 className="text-xl text-center font-extrabold text-white">Administrador de stock</h1>
      </div>
     </header>
      <main className="mx-auto mt-10 sm:w-full md:w-3/4 p-4 bg-slate-300 shadow">
         <Outlet />
      </main>
    </>
  )
}
        

export default Layout