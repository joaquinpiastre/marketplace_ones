
import axios from 'axios';
import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


export const AddProduct = () => {

    const navigate = useNavigate();

    const initialValues = {
        name: '',
        price: '',
        stock:'',
        description:''
    }

    const handleSubmit = async( values) => {
        
        try {
            const response = await axios.post('http://localhost:5000/products', values)
            console.log(response.data)
            Swal.fire({
                icon: 'success',
                title: 'Agregado correctamente',
                showConfirmButton: false,
                timer: 1800
            })
            navigate('/home')
            } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <div className='row justify-content-center'> 
            <div className='col-md-6'>
            <h1>Crear oferta de Producto</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                <Form> 
                    <div className="form-floating">
                        <Field 
                        type="text" 
                        className="form-control" 
                        id="floatingName" 
                        placeholder="Nombre producto" 
                        name='name'
                        />
                        <label htmlFor="floatingName">Nombre del producto</label>
                    </div>
                    <div className="form-floating">
                        <Field 
                        type="text" 
                        className="form-control" 
                        id="floatingInput" 
                        placeholder="descripción"
                        name='price'
                        />
                        <label htmlFor="floatingInput">Precio unitario</label>
                    </div>
                    <div className="form-floating">
                        <Field 
                        type="text" 
                        className="form-control" 
                        id="floatingInput" 
                        placeholder="experiencia"
                        name='stock'
                        />
                        <label htmlFor="floatingInput">Stock</label>
                    </div>
                    <div className="form-floating">
                        <Field 
                        type="text" 
                        className="form-control" 
                        id="floatingName" 
                        placeholder="Nombre producto" 
                        name='description'
                        />
                        <label htmlFor="floatingName">Descripción del Producto</label>
                    </div>
                    <button className="btn btn-primary w-100 py-2" type="submit" onClick={handleSubmit}>Agregar Producto</button>
                </Form>
            </Formik>
            </div>
        </div> 
    </div>
  )
}