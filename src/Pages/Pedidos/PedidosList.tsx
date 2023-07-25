import { useFetch } from "../../Hooks/useFetch";
import { Table } from "../../components/Table/Tablep";
import {TableD} from "../../components/Table/Tabledetalle";
import Swal from "sweetalert2";
import { useState } from 'react';
import { ModalContainer, Modal } from '../../components/Modal/Modal';
import { createPortal } from 'react-dom';


export const PedidosList = () => {
    // const {data, error, setBodyRequest, setMethodState} = useFetch({ url: 'https://coff-v-art-api.onrender.com/api/user'});
    const {data, error, setBodyRequest, setMethodState, setUrlState} = useFetch({ url: 'https://coffevart.onrender.com/api/pedidos'});
    function handleDelete(id: string) {
        Swal.fire({
          title: "Esta seguro de cambiar el estado del Pedido?",
          showDenyButton: true,
          confirmButtonText: "Confirmar",
          denyButtonText: `Cancelar`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            setUrlState(`https://coffevart.onrender.com/api/pedidos/${id}`);
            setMethodState("DELETE");
            setBodyRequest({ _id: id });
            setTimeout(() => {
              setUrlState("https://coffevart.onrender.com/api/pedidos");
              setMethodState("GET");
            }, 500);
    
            Swal.fire("Pedido eliminada con éxito!", "", "success");
          }
          if (result.isDenied) {
            Swal.fire("Cancelado", "", "info");
          }
        });
      }

      interface Pedido {
        id: number;
        Nit: string;
        Proveedor: string;
        Telefono: string;
        Fecha: string;
        Total: number;
        Estado: string;
      }
      
      const dbcolumns = ['id', 'Nit', 'Proveedor', 'Telefono', 'Fecha', 'Total', 'Estado'];
      const columns = ['id', 'Nit', 'Cliente', 'Telefono', 'Fecha', 'Total', 'Estado'];
      const pedidos: Pedido[] = data.pedidos || data;
      
      const datoQuemado = 148000; // Valor que deseas agregar a la columna 'Total'
      
      const nuevoPedido: Pedido = {
        id: 1,
        Nit: '123456789',
        Proveedor: 'Mateo Osorio',
        Telefono: '987654321',
        Fecha: '2023-07-17',
        Total: datoQuemado,
        Estado: 'Pendiente'
      };
      
      // Verificar si el registro ya existe en el array pedidos
      const existeRegistro = pedidos.some((pedido: Pedido) => pedido.id === nuevoPedido.id);
      
      if (!existeRegistro) {
        pedidos.push(nuevoPedido); // Agregar el nuevo pedido solo si no existe previamente
      }
      
    console.log(pedidos)

    const buttonsActions = [
        {
            text: 'Ver detalle',
            onClick: () => handleShowModal(),
            fill: true,
        },
    ];
    const [showModal, setShowModal] = useState(false);
    function handleShowModal () {
    setShowModal(true);
}
    return (
        <>
            {error && <p>Hubo un error</p>}
            <Table data={pedidos} columns={columns} dbColumns={dbcolumns} title='Pedidos' createLink='create' createText='Crear Pedido' label='Buscar Pedido' 
        deleteFunction={(handleDelete)} tituloDocumento={'Pedido'} nombreArchivo={'Pedido'}
        buttonsActions={buttonsActions}/>
         {showModal &&
				createPortal(
					<DetalleCompra showModal={setShowModal} />,
					document.getElementById('modal') as HTMLElement
                    )}
        </>
    )
}
const DetalleCompra = ({ showModal }: any) => {
	return (
		<ModalContainer ShowModal={showModal}>
			<Modal showModal={showModal} title='Detalle'>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4rem', fontSize: '1.2rem' }}>
  <div style={{marginRight: '8rem' }}>
    <p><strong>ID:</strong> 1213213FG</p>
    <p><strong>FACTURA:</strong> Número de factura</p>
    <p><strong>CLIENTE:</strong> Nombre del cliente</p>
    <p><strong>FECHA:</strong> [Fecha de la factura]</p>
    <p><strong>TELEFONO:</strong> [TELEFONO]</p>
    <p><strong>ESTADO:</strong> Completada</p>
  </div>
  <div>
    <p><strong>PRODUCTO:</strong> Nombre del producto</p>
    <p><strong>CANTIDAD:</strong> CANTIDAD</p>
    <p><strong>VALOR UNITARIO:</strong> $50.00</p>
    <p><strong>SUBTOTAL:</strong> $200.00</p>
    <p><strong>IVA:</strong> $10.00</p>
    <p><strong>TOTAL:</strong> $60.00</p>
  </div>
</div>
			</Modal>
		</ModalContainer>
	);
};