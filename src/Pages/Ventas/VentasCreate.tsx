import { Form, FormField } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { useFetch } from '../../Hooks/useFetch';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Table } from '../../components/Table/Table';
import { TablePr } from '../../components/Table/TablePr';

export const VentasCreate = () => {
	const navigate = useNavigate();
	const [controlErrors, setControlErrors] = useState({});
	const { error, setBodyRequest } = useFetch({url:'https://coffevart.onrender.com/api/ventas', method: 'POST', headers: { 'Content-Type': 'application/json' } });

	function handleRegisterShop(e: any) {
		e.preventDefault();
		const Factura = e.target.Factura.value;
		const Cliente = e.target.Cliente.value;
		const Producto = e.target.Producto.value;
		const Cantidad= e.target.Cantidad.value;
        const Estado= e.target.Estado.Value;

		if (Factura === '') {
			setControlErrors({ ...controlErrors, Factura: 'El Factura es requerida' });
			return;
		} else if (Cliente === '') {
			setControlErrors({
				...controlErrors,
				Cliente: 'El cliente es requerido',
			});
			return;
		} else if (Producto === '') {
			setControlErrors({ ...controlErrors, Producto: 'El Producto es requerido' });
			return;
		} else if (Cantidad === '') {
			setControlErrors({
				...controlErrors,
				Cantidad: 'La cantidad es requerida',
			}
			
			);
			return;
		}else if(Estado== ''){
			setControlErrors({...controlErrors, Cantidad: 'La cantidad es requerida'});
			return;
		}

        Swal.fire({
			title: 'Confirmar',
			text: '¿Deseas crear la venta?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Sí',
			cancelButtonText: 'No',
		}).then((result) => {
			if (result.isConfirmed) {
				const ventas = {
					Factura,
                    Cliente,
					Producto,
					Cantidad,
					Estado,
                    
				};
				Swal.fire("Venta creada con éxito!", "", "success");
				setBodyRequest(ventas); 
				if (!error) {
					navigate('/admin/ventas');
				}
			}
		});

		console.log(error)

        // console.log(error);

        // console.log(user);
        // console.log(data);

	}
	function handleSecondFormSubmit(e: any) {
		// ... Lógica para manejar la presentación del segundo formulario - si es necesario ...
	}
	const segundoFormFields: FormField[] = [
		{
			name: 'Campo1',
			type: 'text',
			label: 'Campo 1',
		},
		{
			name: 'Campo2',
			type: 'text',
			label: 'Campo 2',
		},
		// Agrega aquí los campos adicionales que desees en el segundo formulario
	];
	const ventasFields: FormField[] = [
		{
			name: 'Factura',
			type: 'text',
			label: 'Factura',
		},
		{
			name: 'Cliente',
			type: 'text',
			label: 'Cliente',
		},
		{
			name: 'Telefono',
			type: 'number',
			label: 'Telefono',
		},
		{
			name: 'Producto',
			type: 'select',
			label: 'Producto',
			options: [
				{ value: 'Cafe Amargo', label: 'Cafe Amargo' },
				{ value: 'Cafe Dulce', label: 'Cafe Dulce' },
			],
		},
		{
			name: 'Cantidad',
			type: 'number',
			label: 'Cantidad',
		},
		{
			name: 'Estado',
			type: 'select',
			label: 'Estado',
			options: [
				{ value: 'en proceso', label: 'En proceso' },
				{ value: 'Enviado', label: 'Enviado' },
				{ value: 'Recibido', label: 'Recibido' },

			],
		},
	];
	return (
		<>
		  <Form
			fields={ventasFields}
			title='Crear Venta'
			onSubmit={handleRegisterShop}
			button={<Button text={'Registrar Venta'} onClick={() => null} />}
			errors={controlErrors}
			extraElements={<TableCreateCompra />}
			
		  />

		</>
	  );
 }
	

	const TableCreateCompra = () => {
		const segundoFormFields: FormField[] = [
			{
				name: 'Campo1',
				type: 'text',
				label: 'Campo 1',
			},
			{
				name: 'Campo2',
				type: 'text',
				label: 'Campo 2',
			},
			// Agrega aquí los campos adicionales que desees en el segundo formulario
		];
	
		return (
			
			<><Button text='Agregar Producto' onClick={() => null} />
				<TablePr
					columns={['id', 'Producto', 'Categoria' , 'Cantidad' ,'Subtotal', 'IVA ', 'Total']}
					data={[
						{
							id: 1,
							Producto: 'Café Oscuro Amargo 300 Gr',
                            Categoria: 'Grano',
							Cantidad: '- 15 +',
                            Subtotal: 5340,
                            IVA: "19%",
                            Total: 5890,
						},
						{
							
							id: 2,
							Producto: 'Café Oscuro Dulce 300 Gr',
                            Categoria: 'Molido',
							Cantidad: '- 15 +',
                            Subtotal: 5340,
                            IVA: "19%",
                            Total: 5890,
						}
					]}
					
					
					dbColumns={['id', 'Producto', 'Categoria' , 'Cantidad' ,'Subtotal', 'IVA ', 'Total']}
					deleteFunction={()=>null}
					editButton={false}
					actionsTableOptions={false}
					tituloDocumento=''
					nombreArchivo=''
					showLogoutButton={false}
				/>
				<Form
			fields={segundoFormFields}
			title='Crear Venta'
			onSubmit={()=>null}
			button={<Button text={'Registrar Venta'} onClick={() => null} />}
			extraElements={<TableCreateCompra />}
			/>
			</>
			

		);

		
	};
	




	
	