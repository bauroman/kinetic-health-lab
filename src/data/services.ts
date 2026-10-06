// data/services.ts
// Contenido de marketing de las tarjetas de servicios (textos, íconos, viñetas).
//
// Los servicios "reservables" (uuid, duración real, precio) viven en la tabla
// `servicios` de Supabase. Al tocar "Agendar consulta" en una tarjeta, el modal
// intenta preseleccionar el servicio de la base cuyo `nombre` coincida con `title`,
// así que mantené los nombres parecidos en ambos lados.

import { Activity, Bone, HeartPulse, Sparkles, Wind } from 'lucide-react';
import type { ServiceCard } from '@/types';

export const SERVICES_DATA: ServiceCard[] = [
  {
    id: 'rehab-post',
    icon: HeartPulse,
    title: 'Reeducación Postural & Columna',
    description:
      'Tratamiento correctivo integral para disfunciones biomecánicas del eje vertebral, patologías posturales y dolor crónico asociado a hábitos o trabajo.',
    highlights: [
      'Alivio de cervicalgias, dorsalgias y lumbalgias',
      'Corrección de hiperlordosis, cifosis y escoliosis',
      'Reeducación del core y control propioceptivo',
    ],
    duration: '50 min',
    featured: false,
  },
  {
    id: 'kin-dep',
    icon: Activity,
    title: 'Kinesiología Deportiva',
    description:
      'Protocolos de alto rendimiento para el tratamiento agudo y subagudo de lesiones deportivas, optimización cinemática y readaptación funcional al campo.',
    highlights: [
      'Rehabilitación de esguinces, desgarros y roturas de LCA',
      'Protocolos Return to Play (RTP) con control de carga',
      'Biomecánica del gesto motor y prevención de recaídas',
    ],
    duration: '45 min',
    featured: true, // Tarjeta principal destacada
  },
  {
    id: 'kin-resp',
    icon: Wind,
    title: 'Kinesiología Respiratoria',
    description:
      'Técnicas manuales e instrumentales dirigidas a desobstruir la vía aérea, optimizar la capacidad ventilatoria y rehabilitar secuelas pulmonares.',
    highlights: [
      'Desobstrucción bronquial y movilización de secreciones',
      'Reeducación del patrón diafragmático e intercostal',
      'Rehabilitación funcional post-quirúrgica y post-infecciosa',
    ],
    duration: '40 min',
    featured: false,
  },
  {
    id: 'fisio-maso',
    icon: Sparkles,
    title: 'Fisioterapia & Masoterapia',
    description:
      'Combinación de agentoterapia física avanzada y técnicas de descontracturación miofascial profunda para modulación del dolor y relajación muscular.',
    highlights: [
      'Liberación miofascial y desactivación de puntos gatillo',
      'Electroestimulación analgésica (TENS) y termoterapia profunda',
      'Drenaje circulatorio y reducción del tono hiperactivo',
    ],
    duration: '30 min',
    featured: false,
  },
  {
    id: 'rehab-trauma',
    icon: Bone,
    title: 'Rehabilitación Traumatológica',
    description:
      'Tratamiento ortopédico y kinésico especializado en la recuperación estructural y funcional posterior a fracturas, cirugías articulares o prótesis.',
    highlights: [
      'Manejo de post-quirúrgicos y fijaciones óseas',
      'Recuperación progresiva del rango articular (ROM)',
      'Fortalecimiento muscular excéntrico e isométrico adaptado',
    ],
    duration: '45 min',
    featured: false,
  },
];
