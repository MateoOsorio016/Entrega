import { Form, FormField } from "../../components/Form/Form";
import { Button } from "../../components/Button/Button";
import { Form2, FormField2 } from '../../components/Form/Form2'
import { useFetch } from '../../Hooks/useFetch';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Table } from '../../components/Table/Table';
import { TablePr } from '../../components/Table/TablePr';

export const EmpaquetadoCreate = () => {
    const navigate = useNavigate();
	const [controlErrors, setControlErrors] = useState({});
	const { error, setBodyRequest } = useFetch({url:'https://coff-v-art-api.onrender.com/api/empaquetado', method: 'POST', headers: { 'Content-Type': 'application/json' } });

	function handleRegisterEmpaquetado(e: any) {
		e.preventDefault();
		const insumo= e.target.insumo.value;
		const productoFinal= e.target.productoFinal.value;
		const cantidad= e.target.cantidad.value;
		// const fechaInicio= e.target.fechaInicio.value;
		const fechaInicio= "23-09-2023";
		const fechaCompromiso= "23-10-2023";
		
		const estado= e.target.estado.value;

            
		if (insumo === '') {
			setControlErrors({ ...controlErrors, insumo: 'El insumo es requerido' });
			return;
		} else if (productoFinal === '') {
			setControlErrors({
				...controlErrors,
				productoFinal: 'El producto final es requerido',
			});
			return;
		} else if (cantidad === '') {
			setControlErrors({ ...controlErrors, cantidad: 'La cantidad es requerida' });
			return;
		}
		const empaquetado={
			insumo,
			productoFinal,
			cantidad,
			fechaEmpaquetado: new Date(),
			fechaInicio,
			fechaCompromiso,
			estado
		};
        Swal.fire({
			title: 'Confirmar',
			text: '¿Deseas crear el insumo?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Sí',
			cancelButtonText: 'No',
		}).then((result) => {
			if (result.isConfirmed) {
		setBodyRequest(empaquetado);
        Swal.fire("Empaquetado creado con éxito!", "", "success");
		

		if(!error) {
			setTimeout(() => {
			navigate('/admin/empaquetados');
		}, 200);
    }
	}});
	}
    const empaquetadoFields: FormField[] = [
        {
            name: "insumo",
            type: "select",
            label: "Insumo",
            options: [
                { value: 'cafeoscuro', label: 'Café oscuro' },
                { value: 'cafemolido', label: 'Café molido' },
            ],
        },
		{
         
			name: 'fechaInicio',
			type: 'date',
			label: 'Fecha de Inicio',
		 
		 },
		{
         
			name: 'fechaCompromiso',
			type: 'date',
			label: 'Fecha de Compromiso',
		 
		 },
		 
        {
            name: "productoFinal",
            type: "select",
            label: "Producto Final",
            options: [
                { value: 'cafetostadooscuro250gr', label: 'Café tostado oscuro 250gr' },
                { value: 'cafetostadomolido500gr', label: 'Café tostado molido 500gr' },
            ],
        },
        {
            name: 'cantidad',
            type: 'number',
            label: 'cantidad',
        },
        // {
        //     name: 'fechaInicio',
        //     type: 'date',
        //     label: 'Fecha Inicio',
        // },
		
        /*{
            name: 'estado',
            type: 'select',
            label: 'Estado',
            options: [
				{ value: 'Inicial', label: 'Inicial' },
                { value: 'EnProceso', label: 'En Proceso' },
                { value: 'Finalizado', label: 'Finalizado' },
            ],
        }*/
    ]

    return (
        <>
            <Form fields={empaquetadoFields}
            title='Crear Empaquetado'
            onSubmit={handleRegisterEmpaquetado}
            button={<Button text={'Registrar Empaquetado'} onClick={()=>null}/>} 
            errors={controlErrors}
            extraElements={<TableCreateEmpaquetado />}
            />
        </>
    )
}
const TableCreateEmpaquetado = () => {
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
						name: 'Descuento',
						type: 'text',
						label: 'Descuento',
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
