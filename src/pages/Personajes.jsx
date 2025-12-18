import { useEffect, useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { ProgressBar } from "primereact/progressbar";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Image } from "primereact/image";
import api from "../services/api";


const Personajes = () => {
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagina, setPagina] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [personajeSeleccionado, setPersonajeSeleccionado] = useState(null);
  const [dialogoVisible, setDialogoVisible] = useState(false);
  const toast = useRef(null);

  const [datosFormulario, setDatosFormulario] = useState({
    ki:0,
    faction: null,
    registrationDate: null
  });

  const factions = [
    { label: "Z Fighter", value: "Z Fighter" },
    { label: "Villain", value: "Villain" },
    { label: "Neutral", value: "Neutral" }
  ];

  useEffect(() => {
    setLoading(true);

    api.get(`/characters?page=${pagina}&limit=10`)
        .then((res) => {
        setPersonajes(res.data.items);
        setTotalItems(res.data.meta.totalItems);
        })
        .finally(() => {
        setLoading(false);
    });
   }, [pagina]);


  const obtenerColorRaza = (raza) => {
    switch (raza?.toLowerCase()) {
        case "saiyan":
            return "warning";
        case "human":
            return "info";
        case "namekian":
            return "success";
        case "frieza race":
            return "help";
        default:
            return "secondary";
    }
  };

  const MAX_KI = 100_000_000;

  // Render de columnas
  const avatarBody = (rowData) => (
    <Image
        src={rowData.image}
        alt={rowData.name}
        width="50"
        preview
    />
  );
  const raceBody = (rowData) => <Tag value={rowData.race} severity={obtenerColorRaza(rowData.race)} />;
  const kiBody = (rowData) => {
    const kiNumerico = Number(
        String(rowData.ki).replace(/\./g, "")
    );

    if (isNaN(kiNumerico)) {
        return <span>Desconocido</span>;
    }
    const porcentaje = Math.min(
        Math.round((kiNumerico / MAX_KI) * 100),
        100
    );

    return (
        <ProgressBar
        value={porcentaje}
        showValue = {false}
        style={{ height: "20px" }}
        displayValueTemplate={() => kiNumerico.toLocaleString("es-MX")}
        />
    );
  };

  const genderBody = (rowData) => <i className={rowData.gender === "Male" ? "pi pi-mars" : "pi pi-venus"}></i>;
  const actionBody = (rowData) => (
    <>
      <Button icon="pi pi-pencil" className="p-button-sm p-mr-2" onClick={() => openDialog(rowData)} style = {{marginRight: "20px"}} />
      <Button icon="pi pi-eye" className="p-button-sm" onClick={() => openDialog(rowData, true)} />
    </>
  );

  const openDialog = (personaje) => {
    setPersonajeSeleccionado(personaje);
    setDatosFormulario({
        ki: personaje.ki,
        faction: "Z Fighter",
        registrationDate: new Date()
    });
    setDialogoVisible(true);
  };

  const saveCharacter = () => {
    setDialogoVisible(false);
    toast.current.show({ severity: 'success', summary: 'Guardado', detail: 'Personaje actualizado', life: 2000 });
  };

  return (
    <div>
      <Toast ref={toast} />
      <h2>Personajes</h2>
      {error && <p>{error}</p>}

      <DataTable
        value={personajes}
        paginator
        rows={10}
        totalRecords={totalItems}
        lazy
        first={(pagina - 1) * 10}
        onPage={(e) => setPagina(e.first / e.rows + 1)}
        loading={loading}
      >
        <Column header="Avatar" body={avatarBody} />
        <Column field="name" header="Nombre" />
        <Column header="Raza" body={raceBody} />
        <Column header="Ki" body={kiBody} />
        <Column header="Género" body={genderBody} />
        <Column header="Acciones" body={actionBody} />
      </DataTable>

      <Dialog
        header={personajeSeleccionado?.name}
        visible={dialogoVisible}
        style={{ width: '400px' }}
        modal
        onHide={() => setDialogoVisible(false)}
      >
        <div className="p-fluid">
          <label>Ki</label>
          <InputNumber 
            value={datosFormulario.ki}
            onValueChange={(e) => setDatosFormulario({...datosFormulario, ki: e.value})}
            min = {0}
            showButtons
          />
          <label>Facción</label>
          <Dropdown 
            value= {datosFormulario.faction}
            options= {factions}
            onChange={(e) => setDatosFormulario({...datosFormulario, faction: e.value})}
            placeholder="Selecciona Facción"
          />
          <label>Fecha de Registro</label>
          <Calendar 
          value = {datosFormulario.registrationDate}
          onChange={(e) => setDatosFormulario({ ...datosFormulario, registrationDate: e.value })}
          showIcon
          />
          <p>Género: {personajeSeleccionado?.gender}</p>
          <Button label="Guardar" onClick={saveCharacter} />
        </div>
      </Dialog>
    </div>
  );
};

export default Personajes;


