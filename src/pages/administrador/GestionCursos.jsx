import { useEffect, useState } from 'react';

import CardCurso from '../../components/cursos/CardCurso';

import { obtenerCursos } from '../../services/servicioCursos';

export default function GestionCursos() {

  const [cursos, setCursos] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarCursos();
  }, []);

  async function cargarCursos() {

    try {

      const data = await obtenerCursos();

      setCursos(data);

    } catch (error) {

      console.error('Error cargando cursos:', error);

    } finally {

      setLoading(false);

    }

  }

  if (loading) {
    return <p>Cargando cursos...</p>;
  }

  return (

    <div>

      <div className="mb-4">

        <h2 className="fw-bold">
          Gestión de Cursos
        </h2>

        <p className="text-muted">
          Revisa información general, rendimiento y alumnos por curso.
        </p>

      </div>

      <div className="row g-4">

        {cursos.map((curso) => (

          <CardCurso
            key={curso.id}
            curso={curso}
          />

        ))}

      </div>

    </div>

  );

}