import { Form, FormField } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { Form2, FormField2 } from '../../components/Form/Form2';
import { useFetch } from '../../Hooks/useFetch';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Table } from '../../components/Table/Table';
import { TablePr } from '../../components/Table/TablePr';

export const ContratosCreate = () => {
	const navigate = useNavigate();
	const [controlErrors, setControlErrors] = useState({});
	const {error, setBodyRequest } = useFetch({
		url: 'https://coff-v-art-api.onrender.com/api/contract',
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	});

	function handleRegisterContract(e: any) {
		e.preventDefault();
		const nombreEmpresa = e.target.nombreEmpresa.value;
		const NIT = e.target.NIT.value;
		const direccion = e.target.direccion.value;
		const nombreRepresentante = e.target.nombreRepresentante.value;
		const correoRepresentante = e.target.correoRepresentante.value;
		const duracion = e.target.duracion.value;
		const cobro = e.target.cobro.value;
		const comision = e.target.comision.value;
		//const fechaInicio = e.target.fechaInicio.value;
		//const fechaFin = e.target.fechaFin.value;
		//const fecha = e.target.fecha.value;
		const producto = e.target.producto.value;
		const estado = e.target.estado.value;
		if (nombreEmpresa === '') {
			setControlErrors({
				...controlErrors,
				nombreEmpresa: 'El nombre de la empresa es requerido',
			});
			return;
		} else if (NIT === '') {
			setControlErrors({
				...controlErrors,
				NIT: 'El NIT es requerido',
			});
			return;
		} else if (direccion === '') {
			setControlErrors({
				...controlErrors,
				direccion: 'La dirección es requerida',
			});
			return;
		} else if (nombreRepresentante === '') {
			setControlErrors({
				...controlErrors,
				nombreRepresentante: 'El nombre del representante es requerido',
			});
			return;
		} else if (correoRepresentante === '') {
			setControlErrors({
				...controlErrors,
				correoRepresentante: 'El correo es requerido',
			});
			return;
		} else if (producto === '') {
			setControlErrors({
				...controlErrors,
				producto: 'El producto es requerido',
			});
			return;
		} else if (cobro === '') {
			setControlErrors({ ...controlErrors, cobro: 'El cobro es requerido' });
			return;
		}
		const contract = {
			nombreEmpresa,
			NIT,
			direccion,
			nombreRepresentante,
			correoRepresentante,
			duracion,
			cobro,
			comision,
			fechaInicio:'2023-05-27',
			fechaFin:'2023-07-27',
			//fecha,
			producto,
			estado,
		};
		Swal.fire({
			title: 'Confirmar',
			text: '¿Deseas crear el contrato?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Sí',
			cancelButtonText: 'No',
		}).then((result) => {
			if (result.isConfirmed) {
			setBodyRequest(contract);
		Swal.fire("Contrato creado con éxito!", "", "success");
				 
				if (!error) {
					setTimeout(() => {
					navigate('/admin/contratos');
				}, 200);
				}
			}
		});
		
	}
	

	const contratosFields: FormField[] = [
		{
			name: 'nombreEmpresa',
			type: 'text',
			label: 'Nombre Empresa',
		},
		{
			name: 'NIT',
			type: 'text',
			label: 'NIT',
		},
		{
			name: 'direccion',
			type: 'text',
			label: 'Dirección',
		},
		{
			name: 'nombreRepresentante',
			type: 'text',
			label: 'Nombre de representante',
		},
		{
			name: 'correoRepresentante',
			type: 'text',
			label: 'Correo de representante',
		},
		
		
		{
			name: 'duracion',
			type: 'select',
			label: 'Duración',
			options: [{ value: '1mes', label: '1 mes' },{ value: '3mes', label: '3 meses' },{ value: '6mes', label: '6 mes' },{ value: '1ano', label: '1 año' }],
		},
		{
			name: 'cobro',
			type: 'select',
			label: 'Cobro',
			options: [
				{ value: 'quincenal', label: 'Quincenal' },
				{ value: 'mensual', label: 'Mensual' },
			],
		},
		{
			name: 'comision',
			type: 'text',
			label: 'Comisión (%)'
		},
		//{
		//	name: 'fecha',
		//	type: 'date',
		//	label: 'Fecha de Contrato',
		//},
		{
			name: 'fechaInicio',
			type: 'date',
			label: 'Fecha inicio del contrato ',
		},
		{
			name: 'fechaFin',
			type: 'date',
			label: 'Fecha fin del contrato ',
		},
		/*{
			name: 'estado',
			type: 'select',
			label: 'Estado',
			options: [
				{ value: 'Activo', label: 'Activo' },
				{ value: 'Cancelado', label: 'Cancelado' },
			],
		},*/
		{
			name: 'producto',
			type: 'select',
			label: 'Producto',
			options: [
				{ value: 'cafetostadooscuro250gr', label: 'Café tostado oscuro 250gr' },
				{ value: 'cafetostadomolido500gr', label: 'Café tostado molido 500gr' },
			],
		},
	];

	return (
		<>
			<Form
				fields={contratosFields}
				title='Crear Contrato'
				onSubmit={handleRegisterContract}
				button={<Button text={'Registrar Contrato'} onClick={() => null} />}
				errors={controlErrors}
				extraElements={<TableCreateContrato />}
			/>
		</>
	);
}
const TableCreateContrato = () => {
	// const [data, setData] = useState<any[]>([]);
	// const tableCreate: FormField[] = [
	//     {
	//         name: 'permisos',
	//         type: 'select',
	//         label: 'Permisos',
	//         options: [
	//             { value: '1', label: 'Permiso 1' },
	//             { value: '2', label: 'Permiso 2' },
	//             { value: '3', label: 'Permiso 3' },
	//             { value: '4', label: 'Permiso 4' },
	//         ]
	//     }
	// ]

	// function handleDelete(id: string) {

	//     const newData = data.filter((item: any) => item.id !== id);

	//     setData(newData);

	// }

	return (
		<>
			<Button text='Agregar Producto' onClick={() => null} />
			<TablePr
				columns={[
					'Categoría',
					'Producto',
					'Cantidad',
					'Costo',
					'Sub-Total',
					'Iva',
					'SubTotal IVA',
					'Total',
				]}
				data={[
					{
						Categoría: 'Café en grano',
						Insumo: 'Café en grano 250gr',
						Cantidad: '- 15 +',
						Costo: '15.000',
						SubTotal: '150.000',
						Iva: '8%',
						SubTotalIVA: '185.000',
						Total: '200.000',
					},
					{
						Categoría: 'Café en polvo',
						Insumo: 'Café en polvo 1kg',
						Cantidad: '- 15 +',
						Costo: '15.000',
						SubTotal: '150.000',
						Iva: '8%',
						SubTotalIVA: '185.000',
						Total: '200.000',
					},
				]}
				dbColumns={[
					'Categoría',
					'Insumo',
					'Cantidad',
					'Costo',
					'SubTotal',
					'Iva',
					'SubTotalIVA',
					'Total',
				]}
				deleteFunction={() => null}
				editButton={false}
				actionsTableOptions={false}
				tituloDocumento=''
				nombreArchivo=''
				showLogoutButton={false}
			/>
				<Form2
			title='Total'
				fields={[
					{
						name: 'Monto',
						type: 'text',
						label: 'SubTotal',
					},
					{
						name: 'SubTotalIva',
						type: 'text',
						label: 'SubTotal Iva',
						readonly: true,
					},
					{
						name: 'Total',
						type: 'text',
						label: 'Total',
					},
				]}
				onSubmit={()=>null}
				errors={{}}
				cancelButton={false}
				buttonstay={false}
				// extraElements={<TableCreateCompra />}
			/>
		</>
	);
};

