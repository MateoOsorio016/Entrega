import { Form, FormField } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { useFetch } from '../../Hooks/useFetch';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Table } from '../../components/Table/Table';

export const ContratosEdit = () => {

	const navigate = useNavigate()

	const { id } = useParams<{ id: string }>();

	const [controlErrors, setControlErrors] = useState({});
	const { data, error, setBodyRequest, setMethodState, setUrlState } = useFetch({ url: `https://coff-v-art-api.onrender.com/api/contract/${id}`, method: 'GET', headers: { 'Content-Type': 'application/json' } })

	const contract = data.contract || data;

	function handleRegisterContract(e: any) {
		e.preventDefault();
		const nombreEmpresa = e.target.nombreEmpresa.value;
		const NIT= e.target.NIT.value;
		const direccion= e.target.direccion.value;
		const nombreRepresentante= e.target.nombreRepresentante.value;
		const correoRepresentante= e.target.correoRepresentante.value;
		const producto= e.target.producto.value;
		const comision= e.target.comision.value;
		const duracion= e.target.duracion.value;
		const cobro= e.target.cobro.value;
		//const fecha= e.target.fecha.value=new Date();
		const estado= e.target.estado.value;

		let contract = {};

		if (nombreEmpresa === '') {
			setControlErrors({ ...controlErrors, nombreEmpresa: 'El nombre de la empresa es requerido' });
			return;
		} else if (NIT === '') {
			setControlErrors({
				...controlErrors,
				NIT: 'El NIT es requerido',
			});
			return;
		} else if (direccion === '') {
			setControlErrors({ ...controlErrors, direccion: 'La dirección es requerida' });
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
			setControlErrors({ ...controlErrors, producto: 'El producto es requerido' });
			return;
		} else if (cobro === '') {
			setControlErrors({ ...controlErrors, cobro: 'El cobro es requerido' });
			return;
		}else {
            contract = {
                _id: id,
                nombreEmpresa,
			    NIT,
			    direccion,
			    nombreRepresentante,
			    correoRepresentante,
			    producto,
			    comision,
			    duracion,
			    cobro,
				fecha: new Date(),
			    estado
            }
        }
		

		setUrlState(`https://coff-v-art-api.onrender.com/api/contract/`);
		setMethodState('PUT');
		setBodyRequest(contract);

		if (!error) {
			Swal.fire({
				icon: 'success',
				title: 'Éxito',
				text: 'El contrato se ha editado con éxito',
				showConfirmButton: false,
				timer: 1500,
				timerProgressBar: true,
			}).then(() => {
				navigate('/admin/contratos');
			});
		}

		console.log(error);

		console.log(contract);
		console.log(data);

	}

	console.log(data?.contract)


	const contratosFields: FormField[] = [
		{
            name: '_id',
            type: 'text',
            value: contract?._id,
            label: 'ID Contrato',
        },
		{
			name: 'nombreEmpresa',
			type: 'text',
			value: contract?.nombreEmpresa,
			label: 'Nombre Representante'
		},
		{
			name: 'NIT',
			type: 'text',
			value: contract?.NIT,
			label: 'NIT',
		},
		{
			name: 'direccion',
			type: 'text',
			value: contract?.direccion,
			label: 'Dirección',
		},
		{
			name: 'nombreRepresentante',
			type: 'text',
			value: contract?.nombreRepresentante,
			label: 'Nombre de representante',
		},
		{
			name: 'correoRepresentante',
			type: 'text',
			value: contract?.correoRepresentante,
			label: 'Correo de representante',
		},
		{
			name: 'producto',
			type: 'select',
			value: contract?.producto,
			label: 'Producto',
			options: [
				{ value: 'cafetostadooscuro250gr', label: 'Café tostado oscuro 250gr' },
				{ value: 'cafetostadomolido500gr', label: 'Café tostado molido 500gr' },
			],
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
		//	value: contract?.fecha,
		//	label: 'Fecha de Contrato',
		//},
		{
			name: 'estado',
			type: 'select',
			value: contract?.estado,
			label: 'Estado',
			options: [
				{ value: 'Activo', label: 'Activo' },
				{ value: 'Cancelado', label: 'Cancelado' },
			],
		},
	];
	return (
		<>
			<Form
				fields={contratosFields}
				title='Editar Contrato'
				onSubmit={handleRegisterContract}
				button={<Button text={'Editar Contrato'} onClick={() => null} />}
				errors={controlErrors}
				editable={true}
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
		<><Button text='Agregar Producto' onClick={()=> null}/>
			<Table
				columns={['ID', 'Producto', 'Valor Unitario']}
				data={[
					{
						id: 1,
						producto: 'Café Oscuro Amargo 300 Gr',
						valorU: '15.000'
					},
					{
						id: 2,
						producto: 'Café Oscuro Dulce 300 Gr',
						valorU: '25.000'
					}
				]}
				dbColumns={['id', 'producto', 'valorU']}
				deleteFunction={()=>null}
				editButton={false}
				actionsTableOptions={false}
				tituloDocumento=''
				nombreArchivo=''
				showLogoutButton={false}
			/>
		</>
	);
};

