export default function TarjetaResumen({
  titulo,
  valor,
  color
}) {

  return (
    <div className={`card border-0 shadow-sm bg-${color} text-white`}>

      <div className="card-body">

        <h6>{titulo}</h6>

        <h2 className="fw-bold">
          {valor}
        </h2>
      </div>
    </div>
  );
}