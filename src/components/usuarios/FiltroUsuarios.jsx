export default function FiltroUsuarios({

  onFiltrar

}) {

  return (

    <div className="mb-3">

      <input
        type="text"
        className="form-control"
        placeholder="Buscar usuario..."
        onChange={(e) =>
          onFiltrar(
            e.target.value
          )
        }
      />

    </div>
  );
}