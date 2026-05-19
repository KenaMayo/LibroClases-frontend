// ─── Mock Data — Libro de Clases Digital ────────────────────────────────────
// Datos de prueba para todas las vistas del sistema.
// Contraseña de todos los usuarios: 1234

export const USERS = [
  {
    id: 1,
    name: 'Prof. María González',
    email: 'profesor@colegio.cl',
    password: '1234',
    role: 'teacher',
    initials: 'MG',
    subject: 'Matemáticas',
    courseId: 1,
  },
  {
    id: 2,
    name: 'Juan Pérez',
    email: 'estudiante@colegio.cl',
    password: '1234',
    role: 'student',
    initials: 'JP',
    courseId: 1,
    rut: '20.123.456-7',
  },
  {
    id: 3,
    name: 'Admin Sistema',
    email: 'admin@colegio.cl',
    password: '1234',
    role: 'admin',
    initials: 'AS',
  },
  {
    id: 4,
    name: 'Carlos Pérez',
    email: 'apoderado@colegio.cl',
    password: '1234',
    role: 'parent',
    initials: 'CP',
    studentId: 2,
  },
];

export const COURSES = [
  { id: 1, name: '4°A', level: '4° Medio', tutorName: 'Prof. María González', studentCount: 35, room: 'Sala 201' },
  { id: 2, name: '3°B', level: '3° Medio', tutorName: 'Prof. Roberto Soto', studentCount: 32, room: 'Sala 105' },
  { id: 3, name: '2°A', level: '2° Medio', tutorName: 'Prof. Ana Martínez', studentCount: 30, room: 'Sala 302' },
  { id: 4, name: '1°C', level: '1° Medio', tutorName: 'Prof. Luis Herrera', studentCount: 28, room: 'Sala 103' },
  { id: 5, name: '8°B', level: '8° Básico', tutorName: 'Prof. Carmen López', studentCount: 33, room: 'Sala 204' },
];

export const STUDENTS = [
  { id: 1,  name: 'Juan Pérez',       rut: '20.123.456-7', courseId: 1, course: '4°A' },
  { id: 2,  name: 'Ana Silva',        rut: '20.234.567-8', courseId: 1, course: '4°A' },
  { id: 3,  name: 'Pedro Muñoz',      rut: '20.345.678-9', courseId: 1, course: '4°A' },
  { id: 4,  name: 'Camila Torres',    rut: '20.456.789-0', courseId: 1, course: '4°A' },
  { id: 5,  name: 'Diego Ramírez',    rut: '20.567.890-1', courseId: 1, course: '4°A' },
  { id: 6,  name: 'Valentina Castro', rut: '20.678.901-2', courseId: 1, course: '4°A' },
  { id: 7,  name: 'Sebastián Flores', rut: '20.789.012-3', courseId: 1, course: '4°A' },
  { id: 8,  name: 'Isidora Vega',     rut: '20.890.123-4', courseId: 1, course: '4°A' },
  { id: 9,  name: 'Matías Morales',   rut: '20.901.234-5', courseId: 1, course: '4°A' },
  { id: 10, name: 'Javiera Ortiz',    rut: '20.012.345-6', courseId: 1, course: '4°A' },
];

export const SUBJECTS = [
  { id: 1, name: 'Matemáticas',                          teacherName: 'Prof. María González', weeklyHours: 6 },
  { id: 2, name: 'Lenguaje y Comunicación',              teacherName: 'Prof. Roberto Soto',   weeklyHours: 6 },
  { id: 3, name: 'Historia, Geografía y Cs. Sociales',   teacherName: 'Prof. Ana Martínez',   weeklyHours: 4 },
  { id: 4, name: 'Ciencias para la Ciudadanía',          teacherName: 'Prof. Luis Herrera',   weeklyHours: 4 },
  { id: 5, name: 'Inglés',                               teacherName: 'Prof. Carmen López',   weeklyHours: 4 },
  { id: 6, name: 'Educación Física y Salud',             teacherName: 'Prof. Carlos Pino',    weeklyHours: 3 },
];

export const GRADES = [
  // Matemáticas — Prueba 1
  { id: 1,  studentId: 1,  studentName: 'Juan Pérez',       subject: 'Matemáticas',                        grade: 6.5, date: '2026-04-15', type: 'Prueba',   semester: 1 },
  { id: 2,  studentId: 2,  studentName: 'Ana Silva',        subject: 'Matemáticas',                        grade: 7.0, date: '2026-04-15', type: 'Prueba',   semester: 1 },
  { id: 3,  studentId: 3,  studentName: 'Pedro Muñoz',      subject: 'Matemáticas',                        grade: 5.0, date: '2026-04-15', type: 'Prueba',   semester: 1 },
  { id: 4,  studentId: 4,  studentName: 'Camila Torres',    subject: 'Matemáticas',                        grade: 6.2, date: '2026-04-15', type: 'Prueba',   semester: 1 },
  { id: 5,  studentId: 5,  studentName: 'Diego Ramírez',    subject: 'Matemáticas',                        grade: 4.5, date: '2026-04-15', type: 'Prueba',   semester: 1 },
  { id: 6,  studentId: 6,  studentName: 'Valentina Castro', subject: 'Matemáticas',                        grade: 6.8, date: '2026-04-15', type: 'Prueba',   semester: 1 },
  { id: 7,  studentId: 7,  studentName: 'Sebastián Flores', subject: 'Matemáticas',                        grade: 5.5, date: '2026-04-15', type: 'Prueba',   semester: 1 },
  { id: 8,  studentId: 8,  studentName: 'Isidora Vega',     subject: 'Matemáticas',                        grade: 7.0, date: '2026-04-15', type: 'Prueba',   semester: 1 },
  { id: 9,  studentId: 9,  studentName: 'Matías Morales',   subject: 'Matemáticas',                        grade: 5.8, date: '2026-04-15', type: 'Prueba',   semester: 1 },
  { id: 10, studentId: 10, studentName: 'Javiera Ortiz',    subject: 'Matemáticas',                        grade: 6.0, date: '2026-04-15', type: 'Prueba',   semester: 1 },
  // Matemáticas — Tarea
  { id: 11, studentId: 1,  studentName: 'Juan Pérez',       subject: 'Matemáticas',                        grade: 5.8, date: '2026-04-28', type: 'Tarea',    semester: 1 },
  { id: 12, studentId: 2,  studentName: 'Ana Silva',        subject: 'Matemáticas',                        grade: 6.5, date: '2026-04-28', type: 'Tarea',    semester: 1 },
  { id: 13, studentId: 3,  studentName: 'Pedro Muñoz',      subject: 'Matemáticas',                        grade: 4.0, date: '2026-04-28', type: 'Tarea',    semester: 1 },
  { id: 14, studentId: 4,  studentName: 'Camila Torres',    subject: 'Matemáticas',                        grade: 5.5, date: '2026-04-28', type: 'Tarea',    semester: 1 },
  { id: 15, studentId: 5,  studentName: 'Diego Ramírez',    subject: 'Matemáticas',                        grade: 3.8, date: '2026-04-28', type: 'Tarea',    semester: 1 },
  // Lenguaje
  { id: 16, studentId: 1,  studentName: 'Juan Pérez',       subject: 'Lenguaje y Comunicación',            grade: 6.0, date: '2026-04-20', type: 'Prueba',   semester: 1 },
  { id: 17, studentId: 2,  studentName: 'Ana Silva',        subject: 'Lenguaje y Comunicación',            grade: 6.8, date: '2026-04-20', type: 'Prueba',   semester: 1 },
  { id: 18, studentId: 3,  studentName: 'Pedro Muñoz',      subject: 'Lenguaje y Comunicación',            grade: 5.2, date: '2026-04-20', type: 'Prueba',   semester: 1 },
  // Historia
  { id: 19, studentId: 1,  studentName: 'Juan Pérez',       subject: 'Historia, Geografía y Cs. Sociales', grade: 5.5, date: '2026-05-05', type: 'Prueba',   semester: 1 },
  { id: 20, studentId: 2,  studentName: 'Ana Silva',        subject: 'Historia, Geografía y Cs. Sociales', grade: 6.2, date: '2026-05-05', type: 'Prueba',   semester: 1 },
  // Ciencias
  { id: 21, studentId: 1,  studentName: 'Juan Pérez',       subject: 'Ciencias para la Ciudadanía',        grade: 7.0, date: '2026-05-10', type: 'Prueba',   semester: 1 },
  // Inglés
  { id: 22, studentId: 1,  studentName: 'Juan Pérez',       subject: 'Inglés',                             grade: 5.0, date: '2026-04-25', type: 'Prueba',   semester: 1 },
  { id: 23, studentId: 1,  studentName: 'Juan Pérez',       subject: 'Inglés',                             grade: 5.5, date: '2026-05-08', type: 'Disertación', semester: 1 },
];

export const ATTENDANCE_RECORDS = [
  // 2026-05-19
  { id: 1,  studentId: 1,  studentName: 'Juan Pérez',       date: '2026-05-19', status: 'present',   subject: 'Matemáticas', course: '4°A' },
  { id: 2,  studentId: 2,  studentName: 'Ana Silva',        date: '2026-05-19', status: 'present',   subject: 'Matemáticas', course: '4°A' },
  { id: 3,  studentId: 3,  studentName: 'Pedro Muñoz',      date: '2026-05-19', status: 'absent',    subject: 'Matemáticas', course: '4°A' },
  { id: 4,  studentId: 4,  studentName: 'Camila Torres',    date: '2026-05-19', status: 'late',      subject: 'Matemáticas', course: '4°A' },
  { id: 5,  studentId: 5,  studentName: 'Diego Ramírez',    date: '2026-05-19', status: 'present',   subject: 'Matemáticas', course: '4°A' },
  { id: 6,  studentId: 6,  studentName: 'Valentina Castro', date: '2026-05-19', status: 'present',   subject: 'Matemáticas', course: '4°A' },
  { id: 7,  studentId: 7,  studentName: 'Sebastián Flores', date: '2026-05-19', status: 'absent',    subject: 'Matemáticas', course: '4°A' },
  { id: 8,  studentId: 8,  studentName: 'Isidora Vega',     date: '2026-05-19', status: 'present',   subject: 'Matemáticas', course: '4°A' },
  { id: 9,  studentId: 9,  studentName: 'Matías Morales',   date: '2026-05-19', status: 'present',   subject: 'Matemáticas', course: '4°A' },
  { id: 10, studentId: 10, studentName: 'Javiera Ortiz',    date: '2026-05-19', status: 'justified', subject: 'Matemáticas', course: '4°A' },
  // 2026-05-18
  { id: 11, studentId: 1,  studentName: 'Juan Pérez',       date: '2026-05-18', status: 'present',   subject: 'Matemáticas', course: '4°A' },
  { id: 12, studentId: 2,  studentName: 'Ana Silva',        date: '2026-05-18', status: 'absent',    subject: 'Matemáticas', course: '4°A' },
  { id: 13, studentId: 3,  studentName: 'Pedro Muñoz',      date: '2026-05-18', status: 'present',   subject: 'Matemáticas', course: '4°A' },
  { id: 14, studentId: 1,  studentName: 'Juan Pérez',       date: '2026-05-17', status: 'absent',    subject: 'Lenguaje y Comunicación', course: '4°A' },
  { id: 15, studentId: 1,  studentName: 'Juan Pérez',       date: '2026-05-16', status: 'late',      subject: 'Historia, Geografía y Cs. Sociales', course: '4°A' },
  { id: 16, studentId: 1,  studentName: 'Juan Pérez',       date: '2026-05-15', status: 'present',   subject: 'Ciencias para la Ciudadanía', course: '4°A' },
  { id: 17, studentId: 1,  studentName: 'Juan Pérez',       date: '2026-05-14', status: 'present',   subject: 'Inglés', course: '4°A' },
];

export const ANNOTATIONS = [
  { id: 1, studentId: 3, studentName: 'Pedro Muñoz',      type: 'negative', description: 'Conducta disruptiva durante la clase', date: '2026-05-15', teacher: 'Prof. María González', course: '4°A' },
  { id: 2, studentId: 2, studentName: 'Ana Silva',        type: 'positive', description: 'Excelente liderazgo en actividad grupal', date: '2026-05-14', teacher: 'Prof. Roberto Soto', course: '4°A' },
  { id: 3, studentId: 5, studentName: 'Diego Ramírez',    type: 'negative', description: 'No entregó tarea por segunda vez consecutiva', date: '2026-05-13', teacher: 'Prof. Ana Martínez', course: '4°A' },
  { id: 4, studentId: 1, studentName: 'Juan Pérez',       type: 'positive', description: 'Apoyo destacado a compañeros en trabajo colaborativo', date: '2026-05-12', teacher: 'Prof. María González', course: '4°A' },
  { id: 5, studentId: 7, studentName: 'Sebastián Flores', type: 'negative', description: 'Uso de celular durante evaluación', date: '2026-05-10', teacher: 'Prof. Luis Herrera', course: '4°A' },
  { id: 6, studentId: 8, studentName: 'Isidora Vega',     type: 'positive', description: 'Puntaje máximo en prueba de Matemáticas', date: '2026-05-08', teacher: 'Prof. María González', course: '4°A' },
];

export const MESSAGES = [
  {
    id: 1,
    fromId: 1,
    from: 'Prof. María González',
    fromRole: 'teacher',
    to: 'Carlos Pérez',
    toRole: 'parent',
    subject: 'Reunión de apoderados — 4°A',
    body: 'Estimado apoderado, le informo que la reunión de apoderados del curso 4°A se realizará el próximo viernes 23 de mayo a las 18:30 hrs en sala 201. Su asistencia es muy importante.\n\nAtentamente,\nProf. María González.',
    date: '2026-05-18',
    read: false,
  },
  {
    id: 2,
    fromId: 3,
    from: 'Admin Sistema',
    fromRole: 'admin',
    to: 'Todos',
    toRole: 'all',
    subject: 'Mantenimiento programado del sistema',
    body: 'Se informa a toda la comunidad educativa que el sistema estará en mantención el sábado 21 de mayo entre las 02:00 y 04:00 hrs. Durante ese período no estará disponible.',
    date: '2026-05-17',
    read: true,
  },
  {
    id: 3,
    fromId: 4,
    from: 'Carlos Pérez',
    fromRole: 'parent',
    to: 'Prof. María González',
    toRole: 'teacher',
    subject: 'Consulta sobre calificaciones de Juan',
    body: 'Estimada profesora González,\n\nQuisiera consultar sobre las últimas calificaciones de mi hijo Juan Pérez en la asignatura de Matemáticas. Quedamos atentos a su respuesta.\n\nSaludos,\nCarlos Pérez.',
    date: '2026-05-16',
    read: false,
  },
  {
    id: 4,
    fromId: 3,
    from: 'Admin Sistema',
    fromRole: 'admin',
    to: 'Prof. María González',
    toRole: 'teacher',
    subject: 'Recordatorio: Ingreso de notas — Plazo 23/05',
    body: 'Estimada profesora, le recordamos que tiene plazo hasta el viernes 23 de mayo para ingresar las calificaciones del segundo período evaluativo. Por favor, asegúrese de completar el registro.',
    date: '2026-05-15',
    read: true,
  },
  {
    id: 5,
    fromId: 1,
    from: 'Prof. María González',
    fromRole: 'teacher',
    to: 'Juan Pérez',
    toRole: 'student',
    subject: 'Felicitaciones por tu desempeño',
    body: 'Estimado Juan,\n\nQuiero felicitarte por tu excelente actitud y apoyo a tus compañeros durante el trabajo colaborativo de esta semana. ¡Sigue así!\n\nAtentamente,\nProf. González.',
    date: '2026-05-12',
    read: false,
  },
];

export const SCHEDULE = [
  {
    day: 'Lunes',
    blocks: [
      { time: '08:00–08:45', subject: 'Matemáticas',                        teacher: 'Prof. María González', room: 'Sala 201' },
      { time: '08:45–09:30', subject: 'Matemáticas',                        teacher: 'Prof. María González', room: 'Sala 201' },
      { time: '09:45–10:30', subject: 'Lenguaje y Comunicación',            teacher: 'Prof. Roberto Soto',   room: 'Sala 201' },
      { time: '10:30–11:15', subject: 'Lenguaje y Comunicación',            teacher: 'Prof. Roberto Soto',   room: 'Sala 201' },
      { time: '11:30–12:15', subject: 'Historia, Geografía y Cs. Sociales', teacher: 'Prof. Ana Martínez',   room: 'Sala 201' },
      { time: '12:15–13:00', subject: 'Orientación',                        teacher: 'Prof. María González', room: 'Sala 201' },
    ],
  },
  {
    day: 'Martes',
    blocks: [
      { time: '08:00–08:45', subject: 'Ciencias para la Ciudadanía', teacher: 'Prof. Luis Herrera',   room: 'Lab. Ciencias' },
      { time: '08:45–09:30', subject: 'Ciencias para la Ciudadanía', teacher: 'Prof. Luis Herrera',   room: 'Lab. Ciencias' },
      { time: '09:45–10:30', subject: 'Inglés',                      teacher: 'Prof. Carmen López',   room: 'Sala 201' },
      { time: '10:30–11:15', subject: 'Inglés',                      teacher: 'Prof. Carmen López',   room: 'Sala 201' },
      { time: '11:30–12:15', subject: 'Matemáticas',                 teacher: 'Prof. María González', room: 'Sala 201' },
      { time: '12:15–13:00', subject: 'Educación Física y Salud',    teacher: 'Prof. Carlos Pino',    room: 'Gimnasio' },
    ],
  },
  {
    day: 'Miércoles',
    blocks: [
      { time: '08:00–08:45', subject: 'Matemáticas',                        teacher: 'Prof. María González', room: 'Sala 201' },
      { time: '08:45–09:30', subject: 'Matemáticas',                        teacher: 'Prof. María González', room: 'Sala 201' },
      { time: '09:45–10:30', subject: 'Historia, Geografía y Cs. Sociales', teacher: 'Prof. Ana Martínez',   room: 'Sala 201' },
      { time: '10:30–11:15', subject: 'Lenguaje y Comunicación',            teacher: 'Prof. Roberto Soto',   room: 'Sala 201' },
      { time: '11:30–12:15', subject: 'Educación Física y Salud',           teacher: 'Prof. Carlos Pino',    room: 'Gimnasio' },
    ],
  },
  {
    day: 'Jueves',
    blocks: [
      { time: '08:00–08:45', subject: 'Historia, Geografía y Cs. Sociales', teacher: 'Prof. Ana Martínez',   room: 'Sala 201' },
      { time: '08:45–09:30', subject: 'Ciencias para la Ciudadanía',        teacher: 'Prof. Luis Herrera',   room: 'Lab. Ciencias' },
      { time: '09:45–10:30', subject: 'Inglés',                             teacher: 'Prof. Carmen López',   room: 'Sala 201' },
      { time: '10:30–11:15', subject: 'Lenguaje y Comunicación',            teacher: 'Prof. Roberto Soto',   room: 'Sala 201' },
      { time: '11:30–12:15', subject: 'Matemáticas',                        teacher: 'Prof. María González', room: 'Sala 201' },
    ],
  },
  {
    day: 'Viernes',
    blocks: [
      { time: '08:00–08:45', subject: 'Lenguaje y Comunicación',            teacher: 'Prof. Roberto Soto',   room: 'Sala 201' },
      { time: '08:45–09:30', subject: 'Historia, Geografía y Cs. Sociales', teacher: 'Prof. Ana Martínez',   room: 'Sala 201' },
      { time: '09:45–10:30', subject: 'Ciencias para la Ciudadanía',        teacher: 'Prof. Luis Herrera',   room: 'Lab. Ciencias' },
      { time: '10:30–11:15', subject: 'Inglés',                             teacher: 'Prof. Carmen López',   room: 'Sala 201' },
      { time: '11:30–12:15', subject: 'Educación Física y Salud',           teacher: 'Prof. Carlos Pino',    room: 'Gimnasio' },
    ],
  },
];
