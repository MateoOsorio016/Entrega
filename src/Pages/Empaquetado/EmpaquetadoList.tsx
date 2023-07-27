import { useFetch } from "../../Hooks/useFetch";
import { Table } from '../../components/Table/Table';
import Swal from "sweetalert2";
import { useState } from 'react';
import { ModalContainer, Modal } from '../../components/Modal/Modal';
import { createPortal } from 'react-dom';

export const EmpaquetadoList = () => {
	const {data,error,setBodyRequest,setMethodState,setUrlState}=useFetch({url:'http://localhost:3000/api/empaquetado'});
    function handleDelete(id: string){
		Swal.fire({
			title: "Esta seguro de eliminar el Empaquetado?",
			showDenyButton: true,
			confirmButtonText: "Eliminar",
			denyButtonText: `Cancelar`,
		  }).then((result) => {
			if (result.isConfirmed) {
        setUrlState(`http://localhost:3000/api/empaquetado/${id}`);
        setMethodState('DELETE');
        setBodyRequest({_id:id})
        setTimeout(()=> {
            setUrlState('http://localhost:3000/api/empaquetado');
            setMethodState('GET');
        },500);
		Swal.fire("Empaquetado eliminado con éxito!", "", "success");
	}
	if (result.isDenied) {
	  Swal.fire("Cancelado", "", "info");
	}
  });
}

interface Contrato {
    id: number;
    Insumo: string;
    FechaE: string;
    FechaI: string;
    FechaC: string;
    ProductoF: string;
    Cantidad: number;
    Estado: string;
  }

  const dbcolumns = [
    "id",
    "Insumo",
    "FechaE",
    "FechaI",
    "FechaC",
    "ProductoF",
    "Cantidad",
    "Estado",
  ];
  const columns = [
	"id",
    "Insumo",
    "Fecha Empaquetado",
    "Fecha Inicio",
    "Fecha de Compromiso",
    "Producto Final",
    "Cantidad",
    "Estado",
  ];
  const compras: Contrato[] = data.compras || data;
  console.log(data);

 
  const nuevaCompra: Contrato = {
    id: 1,
    Insumo: "Café Oscuro",
    FechaE: "26-07-2023",
    FechaI: "17-07.-2023",
    FechaC: "28-07-2023",
    ProductoF: "Café Tostado Molido",
    Cantidad: 155,
    Estado: "Pendiente",
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
        title="Empaquetados"
        createLink="create"
        createText="Crear Empaquetado"
        label="Buscar Empaquetado"
        deleteFunction={handleDelete}
        tituloDocumento={"Empaquetado"}
        nombreArchivo={"Empaquetado"}
        buttonsActions={buttonsActions}
        editButton={false}
      />
			{showModal &&
				createPortal(
					<DetalleEmpaquetado showModal={setShowModal} />,
					document.getElementById('modal') as HTMLElement
                    )}
		</>
	)
}
const DetalleEmpaquetado = ({ showModal }: any) => {
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