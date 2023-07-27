import { useFetch } from "../../Hooks/useFetch";
import { Table } from "../../components/Table/Table";
import Swal from "sweetalert2";
import { useState } from 'react';
import { ModalContainer, Modal } from '../../components/Modal/Modal';
import { createPortal } from 'react-dom';

export const ContratosList = () => {
    const {data,error,setBodyRequest,setMethodState,setUrlState}=useFetch({url:'http://localhost:3000/api/contract'});
    function handleDelete(id: string){
        Swal.fire({
      title: "Esta seguro de eliminar el insumo?",
      showDenyButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setUrlState(`http://localhost:3000/api/contract/${id}`);
        setMethodState('DELETE');
        setBodyRequest({_id:id})
        setTimeout(()=> {
            setUrlState('http://localhost:3000/api/contract');
            setMethodState('GET');
        },500);
        Swal.fire("Insumo eliminado con éxito!", "", "success");
      }
      if (result.isDenied) {
        Swal.fire("Cancelado", "", "info");
      }
    });
  }
  function redirigirP() {
		window.location.href = "/#/admin/pagos";
	  }

    interface Contrato {
      id: number;
      NombreE: string;
      Nit: number;
      Direccion: string;
      NombreR: string;
      CorreoR: string;
      Producto: string;
      Comision: string;
      Duracion: string;
      Cobro: string;
      FechaC: string;
      FechaI: string;
      FechaF: string;
      Estado: string;
    }
  
    const dbcolumns = [
      "id",
      "NombreE",
      "Nit",
      "Direccion",
      "NombreR",
      "CorreoR",
      "Producto",
      "Comision",
      "Duracion",
      "Cobro",
      "FechaC",
      "FechaI",
      "FechaF",
      "Estado",
    ];
    const columns = [
      "id",
      "Nombre Empresa",
      "Nit",
      "Direccion",
      "Nombre Representante",
      "Correo Representante",
      "Producto",
      "Comisión",
      "Duración",
      "Cobro",
      "Fecha del Contrato",
      "Fecha Inicio",
      "Fecha Final",
      "Estado",
    ];
    const compras: Contrato[] = data.compras || data;
    console.log(data);
  
   
    const nuevaCompra: Contrato = {
      id: 1,
      NombreE: "Juan Valdez",
      Nit: 1234567,
      Direccion: "Calle 35 #80-62",
      NombreR: "Juan Valdez Cano",
      CorreoR: "JuanValdez370@gmail.com",
      Producto: "Café tostado molido de 500 Gr",
      Comision: "17%",
      Duracion: "1 año",
      Cobro: "Mensual",
      FechaC: "24-07-2023",
      FechaI: "26-07-2023",
      FechaF: "26-07-2024",
      Estado: "Activo"
    };
  
    const existeRegistro = compras.some(
      (pedido: Contrato) => pedido.id === nuevaCompra.id
    );
  
    if (!existeRegistro) {
      compras.push(nuevaCompra); // Agregar el nuevo pedido solo si no existe previamente
    }
  
    const buttonsActions = [
      {
        text: "Ver detalle",
        onClick: () => handleShowModal(),
        fill: true,
      },
      {
        text: 'Pago',
        onClick: (redirigirP) 
      }
    ];
    const [showModal, setShowModal] = useState(false);
    function handleShowModal() {
      setShowModal(true);
    }
    return (
      <>
        {error && <p>Hubo un error</p>}
        <Table
          data={compras}
          columns={columns}
          dbColumns={dbcolumns}
          title="Contratos"
          createLink="create"
          createText="Crear Contrato"
          label="Buscar Contrato"
          deleteFunction={handleDelete}
          tituloDocumento={"Contrato"}
          nombreArchivo={"Contrato"}
          buttonsActions={buttonsActions}
          editButton={false}
        />

            {showModal &&
				createPortal(
					<DetalleContrato showModal={setShowModal} />,
					document.getElementById('modal') as HTMLElement
                    )}
        </>
    )
}
const DetalleContrato = ({ showModal }: any) => {
	return (
		<ModalContainer ShowModal={showModal}>
      <Modal showModal={showModal} title="Detalle">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "4rem",
            fontSize: "1.2rem",
          }}
        >
          <div style={{ marginRight: "8rem" }}>
            <p>
              <strong>ID:</strong> 1213213FG
            </p>
            <p>
              <strong>FACTURA:</strong> Número de factura
            </p>
            <p>
              <strong>CLIENTE:</strong> Nombre del cliente
            </p>
            <p>
              <strong>FECHA:</strong> [Fecha de la factura]
            </p>
            <p>
              <strong>ESTADO:</strong> Completada
            </p>
          </div>
          <div>
            <p>
              <strong>PRODUCTO:</strong> Nombre del producto
            </p>
            <p>
              <strong>CANTIDAD:</strong> CANTIDAD
            </p>
            <p>
              <strong>VALOR UNITARIO:</strong> $50.00
            </p>
            <p>
              <strong>SUBTOTAL:</strong> $200.00
            </p>
            <p>
              <strong>IVA:</strong> $10.00
            </p>
            <p>
              <strong>TOTAL:</strong> $60.00
            </p>
          </div>
        </div>
      </Modal>
    </ModalContainer>
	);
};
