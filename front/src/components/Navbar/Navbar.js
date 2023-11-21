
import { Link } from 'react-router-dom'
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import './Navbar.css'
export const Navbar = () => {
    const { user,setUser } = useContext(UserContext);
    const handleLogOut = () => {
        setUser(false)
        console.log('salir')
    }

    return (
        <div>
            <div class="header_section">
                <div class="container">
                    <nav className="navbar navbar-expand-lg navbar-light" data-bs-theme="dark">
                        <a className="navbar-braknd" href="/login" > </a> 
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            {
                                //administrador
                                user.role === '1' ? (
                                    <ul className="navbar-nav ms-auto">
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/UserList">Lista de Usuarios</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/products">Productos</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/AddProduct">Crear Producto</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/Home">Home</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/" onClick={handleLogOut} >Salir</Link>
                                        </li>
                                    </ul>
                                //usuario
                                ) : user.role === '2' ? (
                                    <ul className="navbar-nav ms-auto">
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/myBuys">Mis compras</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/products">Productos</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/Home">Home</Link>
                                        </li>
                                        
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/" onClick={handleLogOut} >Salir</Link>
                                        </li>
                                    </ul>
                                ):(
                                    <ul className="navbar-nav ms-auto">
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/home">Home</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" exact='true' to="/login">Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/register">Registro</Link>
                                            
                                        </li>
                                    </ul>
                                ) 
                            }           
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}