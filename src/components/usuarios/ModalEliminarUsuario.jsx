export default function ModalEliminarUsuario({

  visible,
  usuario,
  onCancelar,
  onConfirmar

}) {

  if (!visible) return null;

  return (

    <div
      className="modal d-block"
      style={{
        background:
          'rgba(0,0,0,0.5)'
      }}
    >

      <div className="modal-dialog">

        <div className="modal-content">

          <div className="modal-header">

            <h5>
              Eliminar Usuario
            </h5>

          </div>

          <div className="modal-body">

            ¿Eliminar a:

            <strong>
              {' '}
              {usuario?.nombre}
            </strong>

            ?

          </div>

          <div className="modal-footer">

            <button
              className="btn btn-secondary"
              onClick={onCancelar}
            >
              Cancelar
            </button>

            <button
              className="btn btn-danger"
              onClick={onConfirmar}
            >
              Eliminar
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}