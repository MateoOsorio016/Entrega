import { useFetch } from "../../Hooks/useFetch";
import { Table } from "../../components/Table/Tablex";
import Swal from "sweetalert2";
import { useState } from 'react';
import { ModalContainer, Modal } from '../../components/Modal/Modal';
import { createPortal } from 'react-dom';
import { TableD } from "../../components/Table/Tabledetalle";
import { TableV } from "../../components/Table/TableV";

export const VentasList = () => {
    // const {data, error, setBodyRequest, setMethodState} = useFetch({ url: 'https://coff-v-art-api.onrender.com/api/user'});
    const {data, error, setBodyRequest, setMethodState, setUrlState} = useFetch({ url: 'https://coffevart.onrender.com/api/ventas'});
    function handleDelete(id: string) {
        Swal.fire({
          title: "Esta seguro de eliminar la venta?",
          showDenyButton: true,
          confirmButtonText: "Eliminar",
          denyButtonText: `Cancelar`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            setUrlState(`https://coffevart.onrender.com/api/ventas/${id}`);
            setMethodState("DELETE");
            setBodyRequest({ _id: id });
            setTimeout(() => {
              setUrlState("https://coffevart.onrender.com/api/ventas");
              setMethodState("GET");
            }, 500);
    
            Swal.fire("Venta eliminada con éxito!", "", "success");
          }
          if (result.isDenied) {
            Swal.fire("Cancelado", "", "info");
          }
        });
      }
      
      
      interface Venta {
        id: number;
        Factura: string;
        Cliente: string;
        Subtotal: number;
        Estado: string;
      }
      

    const dbcolumns = ['id', 'Factura', 'Cliente', 'Subtotal', 'Estado' ];
    const columns = ['id', 'Factura', 'Cliente', 'Subtotal', 'Estado'];
    const ventas : Venta[] = data.ventas || data;
    const datoQuemado = 'En proceso';
    const nuevoPedido: Venta = {
      id: 1,
      Factura: '123456789',
      Cliente: 'Mateo Osorio',
      Subtotal: 198000,
      Estado: datoQuemado
    };
    const existeRegistro = ventas.some((pedido: Venta) => pedido.id === nuevoPedido.id);
      
    if (!existeRegistro) {
      ventas.push(nuevoPedido); // Agregar el nuevo pedido solo si no existe previamente
    }
    console.log(data)

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
            <TableV data={ventas} columns={columns} dbColumns={dbcolumns} title='Ventas' createLink='create' createText='Crear Venta' label='Buscar Venta' 
        deleteFunction={handleDelete} tituloDocumento={'Ventas'} nombreArchivo={'Ventas'}
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
