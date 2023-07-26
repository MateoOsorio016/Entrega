import { useFetch } from "../../Hooks/useFetch";
import { Table } from "../../components/Table/Table";
import { TableD } from "../../components/Table/Tabledetalle";
import Swal from "sweetalert2";
import { useState } from "react";
import { ModalContainer, Modal } from "../../components/Modal/Modal";
import { createPortal } from "react-dom";

export const ComprasList = () => {
  // const {data, error, setBodyRequest, setMethodState} = useFetch({ url: 'https://coff-v-art-api.onrender.com/api/user'});
  const { data, error, setBodyRequest, setMethodState, setUrlState } = useFetch(
    { url: "http://localhost:3000/api/shop" }
  );
  function handleDelete(id: string) {
    Swal.fire({
      title: "Esta seguro de eliminar la compra?",
      showDenyButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setUrlState(`http://localhost:3000/api/shop/${id}`);
        setMethodState("DELETE");
        setBodyRequest({ _id: id });
        setTimeout(() => {
          setUrlState("http://localhost:3000/api/shop");
          setMethodState("GET");
        }, 500);

        Swal.fire("Compra eliminada con éxito!", "", "success");
      }
      if (result.isDenied) {
        Swal.fire("Cancelado", "", "info");
      }
    });
  }
  interface Compra {
    id: number;
    Proveedor: string;
    Cantidad: string;
    Costo: number;
    SubTotal: string;
    Iva: number;
    Total: String;
    Estado: string;
  }

  const dbcolumns = [
    "id",
    "Proveedor",
    "Cantidad",
    "Costo",
    "SubTotal",
    "Iva",
    "Total",
    "Estado",
  ];
  const columns = [
    "id",
    "Proveedor",
    "Cantidad",
    "Costo",
    "SubTotal",
    "Iva",
    "Total",
    "Estado",
  ];
  const compras: Compra[] = data.compras || data;
  console.log(data);

  const datoQuemado = 148000; // Valor que deseas agregar a la columna 'Total'

  const nuevaCompra: Compra = {
    id: 1,
    Proveedor: "Finca pueblo rico",
    Cantidad: "100 KG",
    Costo: datoQuemado,
    SubTotal: "248000",
    Iva: 279000,
    Total: "3000000",
    Estado: "Pendiente",
  };

  const existeRegistro = compras.some(
    (pedido: Compra) => pedido.id === nuevaCompra.id
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
        title="Compras"
        createLink="create"
        createText="Crear Compra"
        label="Buscar Compra"
        deleteFunction={handleDelete}
        tituloDocumento={"Compras"}
        nombreArchivo={"Compras"}
        buttonsActions={buttonsActions}
        editButton={false}
      />
      {showModal &&
        createPortal(
          <DetalleCompra showModal={setShowModal} />,
          document.getElementById("modal") as HTMLElement
        )}
    </>
  );
};
const DetalleCompra = ({ showModal }: any) => {
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
