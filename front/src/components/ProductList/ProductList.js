import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/UserContext'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';



export const ProductList = () => {

    const { user } = useContext(UserContext);

    const [products, setProducts] = useState([]);

    const [editedProduct, setEditedProduct] = useState({ id: 0, name: '', price: '', stock:'', description: '' });

    const navigate = useNavigate();

    useEffect(() => {
        fetchProduct();
      }, []);

    const fetchProduct = async () => {
        try {
            const response = await axios.get('http://localhost:5000/products');
            console.log(response)
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const onBuyProduct = async (productId) => {
        const values = {
            userId: user.id,
            productId: productId
        };
        try{
            const response = await axios.post('http://localhost:5000/buys', values);
            console.log(response.data)
            Swal.fire({
                icon: 'success',
                title: 'Compra realizada',
                showConfirmButton: false,
                timer: 1800
            })
        navigate("/myBuys")
        }catch(error){
            console.log(error)
        }
      };

      const deleteProduct = async (productId) => {
        try{
            const response = await axios.delete(`http://localhost:5000/product/${productId}` );
            if (response.data){
                fetchProduct();
            }
        }
        catch(error){
            console.log(error)
        }
      };


    const onEditProduct = (product) => {
        setEditedProduct(product);
    };

    const handleInputChange = (e) => {
        console.log('valor de e.target.name', e.target.name)
        console.log('valor de e.target.value', e.target.value)
        setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
    };
    

    const handleUpdateProduct = async () => {

        try {
          await axios.put(`http://localhost:5000/product/${editedProduct.id}`, editedProduct);
          fetchProduct();
          setEditedProduct({ id: 0, name: '', price: '', stock:'', description: ''});
          Swal.fire({
            icon: 'success',
            title: 'Editado correctamente',
            showConfirmButton: false,
            timer: 1800
          })
          navigate('/products')
        } catch (error) {
          console.error(error);
        }
    };

    return (
        <div>
            <h1>Productos</h1>
            <div className='row'>
                <div className='col-md-6'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Nombre del producto</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Descripcion</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.stock}</td>
                                        <td>{product.description}</td>
                                        {
                                            // usuario comun solo puede postularse a la oferta(Funcionan las rutas pero es unicamente para admin)
                                            user.role === '2' ? (
                                                <div>
                                                    <td> 
                                                        <button type="button" className="btn btn-success" onClick={() => onBuyProduct(product.id)} > Comprar </button>
                                                    </td>
                                                </div>
                                            // admin puede editar y eliminar
                                            ):(

                                                <div>
                                                    <td> 
                                                        <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editProduct" onClick={() => onEditProduct(product)}> Editar </button>
                                                    </td>
                                                    <td> 
                                                        <button type="button" className="btn btn-danger" onClick={() => deleteProduct(product.id)}> Eliminar </button>
                                                    </td>  
                                                </div>
                                            )
                                        }
                                    </tr>
                                ))
                            }  
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="modal fade" id="editProduct"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Editar producto</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='row'>
                                <div className='col-md-4'>
                                    <label>Nombre</label><br></br>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editedProduct.name}
                                        onChange={handleInputChange}
                                        placeholder="Nombre"
                                    />
                                </div>
                                <div className='col-md-2'></div>
                                <div className='col-md-4'>
                                    <label>Descripción</label><br></br>
                                    <input
                                        type="text"
                                        name="description"
                                        value={editedProduct.description}
                                        onChange={handleInputChange}
                                        placeholder="Descripción"
                                    />
                                </div>
                                <div className='col-md-2'></div>
                                <div className='col-md-4'>
                                    <label>Precio</label><br></br>
                                    <input
                                        type="text"
                                        name="price"
                                        value={editedProduct.price}
                                        onChange={handleInputChange}
                                        placeholder="Precio"
                                    />
                                </div>
                                <div className='col-md-2'></div>
                                <div className='col-md-4'>
                                    <label>Stock</label><br></br>
                                    <input
                                        type="text"
                                        name="stock"
                                        value={editedProduct.stock}
                                        onChange={handleInputChange}
                                        placeholder="Stock"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleUpdateProduct}> Editar </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductList;