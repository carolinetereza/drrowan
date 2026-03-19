import type { Lang } from './context/LanguageContext';

export const t = {

  // ── Navigation ──────────────────────────────────────────────────────────
  nav: {
    inicio:      { pt: 'Início',       en: 'Home' },
    tratamentos: { pt: 'Tratamentos',  en: 'Treatments' },
    depoimentos: { pt: 'Depoimentos',  en: 'Testimonials' },
    contato:     { pt: 'Contato',      en: 'Contact' },
    agendar:     { pt: 'Agendar',      en: 'Book Now' },
  },

  // ── Treatment Sections (hero + pinned) ──────────────────────────────────
  treatments: {
    smileDesign: {
      label:       { pt: 'TRANSFORMAÇÃO PREMIUM',    en: 'PREMIUM TRANSFORMATION' },
      headline:    { pt: 'DR. ROWAN VILAR',          en: 'DR. ROWAN VILAR' },
      description: { pt: 'Facetas de porcelana em 24h/10h. Tecnologia CAD/CAM, planejamento 3D, resultado previsível e natural. Atendimento VIP para expats.', en: 'Porcelain veneers in 24h/10h. CAD/CAM technology, 3D planning, predictable and natural results. VIP care for expats.' },
      ctaPrimary:  { pt: 'Agendar consulta VIP',     en: 'Book VIP Consultation' },
    },
    implantes: {
      label:       { pt: 'REABILITAÇÃO AVANÇADA',    en: 'ADVANCED REHABILITATION' },
      headline:    { pt: 'IMPLANTES DENTÁRIOS',      en: 'DENTAL IMPLANTS' },
      description: { pt: 'Implantes avançados com sedação consciente. Reabilitação oral completa para estrangeiros com acompanhamento pós-operatório via WhatsApp pessoal.', en: 'Advanced implants with conscious sedation. Full oral rehabilitation for foreigners with personal WhatsApp post-op follow-up.' },
      ctaPrimary:  { pt: 'Avaliação especializada',  en: 'Specialist Evaluation' },
    },
    invisalign: {
      label:       { pt: 'ORTODONTIA INVISÍVEL',     en: 'INVISIBLE ORTHODONTICS' },
      headline:    { pt: 'INVISALIGN DIAMOND',       en: 'INVISALIGN DIAMOND' },
      description: { pt: 'Invisalign Diamond Provider — Top Doctor. Alinhamento sem aparelho visível com tecnologia 3D e resultados previsíveis. Especialista UFRJ.', en: 'Invisalign Diamond Provider — Top Doctor. Alignment without visible braces using 3D technology and predictable results. UFRJ Specialist.' },
      ctaPrimary:  { pt: 'Simular meu sorriso',      en: 'Simulate my Smile' },
    },
    gengivoplastia: {
      label:       { pt: 'HARMONIA GINGIVAL',        en: 'GINGIVAL HARMONY' },
      headline:    { pt: 'GENGIVOPLASTIA LASER',     en: 'LASER GINGIVOPLASTY' },
      description: { pt: 'Contorno gengival refinado por laser. Mais simetria, menos sensibilidade, recuperação rápida. Premiado "Best Dentist for Expats in Rio".', en: 'Refined gum contouring by laser. More symmetry, less sensitivity, fast recovery. Awarded "Best Dentist for Expats in Rio".' },
      ctaPrimary:  { pt: 'Consulta de estética',     en: 'Aesthetic Consultation' },
    },
  },

  // ── Method Section ────────────────────────────────────────────────────────
  method: {
    tag:      { pt: 'NOSSO DIFERENCIAL',           en: 'OUR DIFFERENCE' },
    headline: { pt: 'Por que escolher o Dr. Rowan?', en: 'Why choose Dr. Rowan?' },
    sub:      { pt: 'Invisalign Top Doctor, Visiting Professor UERJ, com formação em Harvard e NYU. Atendimento em inglês nativo para expats e visitantes no Rio de Janeiro.', en: 'Invisalign Top Doctor, Visiting Professor UERJ, trained at Harvard and NYU. Native English care for expats and visitors in Rio de Janeiro.' },
    features: [
      { pt: { title: 'Planejamento 3D personalizado',    desc: 'Tecnologia CAD/CAM e scanner digital para precisão milimétrica.' },         en: { title: 'Personalised 3D Planning',          desc: 'CAD/CAM technology and digital scanner for millimetre precision.' } },
      { pt: { title: 'Tecnologia de Ponta',              desc: 'Facetas em 24h/10h com tecnologia digital avançada.' },                        en: { title: 'Cutting-edge Technology',           desc: 'Veneers in 24h/10h with advanced digital technology.' } },
      { pt: { title: 'Atendimento em Inglês Nativo',     desc: 'Especialista em expats e visitantes estrangeiros no Rio.' },                   en: { title: 'Native English Service',            desc: 'Specialist in expats and foreign visitors in Rio.' } },
      { pt: { title: 'Pós-operatório via WhatsApp',      desc: 'Acompanhamento pessoal direto com o Dr. Rowan em todas as fases.' },          en: { title: 'Post-op via WhatsApp',             desc: 'Personal follow-up directly with Dr. Rowan at every stage.' } },
      { pt: { title: 'Financiamento facilitado',         desc: 'Parcerias com principais instituições financeiras.' },                          en: { title: 'Easy Financing',                   desc: 'Partnerships with leading financial institutions.' } },
      { pt: { title: 'Horários flexíveis',               desc: 'Atendimento em Ipanema, Barra e Tijuca — incluindo sábados.' },               en: { title: 'Flexible Hours',                    desc: 'Appointments in Ipanema, Barra and Tijuca — including Saturdays.' } },
    ],
    credentials: {
      cta: { pt: 'Conhecer currículo completo', en: 'View Full Curriculum' },
      items: [
        { pt: 'Mestre e Especialista em Ortodontia — UFRJ',         en: 'Master & Specialist in Orthodontics — UFRJ' },
        { pt: 'Invisalign Top Doctor — Diamond Provider',            en: 'Invisalign Top Doctor — Diamond Provider' },
        { pt: 'Harvard University — Cursos de Extensão',             en: 'Harvard University — Extension Courses' },
        { pt: 'New York University (NYU) — Pós-graduação',           en: 'New York University (NYU) — Postgraduate' },
        { pt: 'Pós-graduado em Biomecânica Dentária — Itália',       en: 'Postgraduate in Dental Biomechanics — Italy' },
        { pt: 'Habilitado em Odontologia Digital — Dinamarca',       en: 'Certified in Digital Dentistry — Denmark' },
        { pt: 'Visiting Professor — UERJ',                           en: 'Visiting Professor — UERJ' },
        { pt: 'Membro WFO — World Federation of Orthodontists',      en: 'WFO Member — World Federation of Orthodontists' },
      ],
    },
  },

  // ── Treatments Index ──────────────────────────────────────────────────────
  treatmentsIndex: {
    tag:      { pt: 'ESPECIALIDADES PREMIUM',    en: 'PREMIUM SPECIALTIES' },
    headline: { pt: 'Tratamentos High-Ticket',   en: 'High-End Treatments' },
    sub:      { pt: 'Serviços especializados com tecnologia de ponta. Atendimento em português e inglês nativo para expats e visitantes.', en: 'Specialised services with cutting-edge technology. Care in Portuguese and native English for expats and visitors.' },
    learnMore: { pt: 'Saiba mais', en: 'Learn more' },
    cards: [
      { pt: { title: 'Smile Design',          desc: 'Facetas de porcelana em 24h/10h — transformação completa do sorriso' },                  en: { title: 'Smile Design',          desc: 'Porcelain veneers in 24h/10h — complete smile transformation' } },
      { pt: { title: 'Ortodontia Invisível',  desc: 'Invisalign Diamond Provider — alinhamento sem aparelho visível' },                       en: { title: 'Invisible Orthodontics', desc: 'Invisalign Diamond Provider — alignment without visible braces' } },
      { pt: { title: 'Implantes Avançados',   desc: 'Reabilitação oral com sedação consciente e tecnologia CAD/CAM' },                        en: { title: 'Advanced Implants',     desc: 'Oral rehabilitation with conscious sedation and CAD/CAM technology' } },
      { pt: { title: 'Clareamento Laser',     desc: 'Branqueamento premium com resultados imediatos e naturais' },                             en: { title: 'Laser Whitening',       desc: 'Premium whitening with immediate and natural results' } },
      { pt: { title: 'Gengivoplastia',        desc: 'Contorno gengival refinado por laser — mais simetria, menos sensibilidade' },             en: { title: 'Gingivoplasty',         desc: 'Refined laser gum contouring — more symmetry, less sensitivity' } },
      { pt: { title: 'Reabilitação Oral',     desc: 'Tratamento completo para expats e visitantes em inglês nativo' },                        en: { title: 'Oral Rehabilitation',   desc: 'Full treatment for expats and visitors in native English' } },
    ],
  },

  // ── Testimonials ─────────────────────────────────────────────────────────
  testimonials: {
    tag:      { pt: 'DEPOIMENTOS',                      en: 'TESTIMONIALS' },
    headline: { pt: 'O que dizem nossos pacientes',    en: 'What our patients say' },
    sub:      { pt: 'Premiado "Best Dentist for Expats in Rio" múltiplos anos. Atendimento em português e inglês nativo.', en: 'Awarded "Best Dentist for Expats in Rio" multiple years. Care in Portuguese and native English.' },
  },

  // ── Locations ─────────────────────────────────────────────────────────────
  locations: {
    tag:      { pt: 'ONDE ESTAMOS',        en: 'WHERE WE ARE' },
    headline: { pt: 'Clínica Ipanema',     en: 'Ipanema Clinic' },
    sub:      { pt: 'Atendimento VIP em Ipanema, coração do Rio de Janeiro. Especialista em expats — inglês nativo.', en: 'VIP care in Ipanema, heart of Rio de Janeiro. Expat specialist — native English.' },
    unit:     { pt: 'Ipanema — Unidade Principal', en: 'Ipanema — Main Unit' },
    hours:    { pt: 'Seg–Sex: 9h às 19h | Sáb: 9h às 13h', en: 'Mon–Fri: 9am–7pm | Sat: 9am–1pm' },
    bookBtn:  { pt: 'Agendar via WhatsApp', en: 'Book via WhatsApp' },
  },

  // ── Contact / Footer ──────────────────────────────────────────────────────
  contact: {
    tag:      { pt: 'AGENDE SUA CONSULTA VIP', en: 'BOOK YOUR VIP CONSULTATION' },
    headline: { pt: 'Vamos desenhar o seu sorriso?', en: 'Let us design your smile?' },
    sub:      { pt: 'Atendimento personalizado em Ipanema. Especialista em expats com inglês nativo.', en: 'Personalised care in Ipanema. Expat specialist with native English.' },
    btnBook:  { pt: 'Agendar consulta VIP', en: 'Book VIP Consultation' },
    privacy:  { pt: 'Política de Privacidade', en: 'Privacy Policy' },
    terms:    { pt: 'Termos de uso',           en: 'Terms of Use' },
  },

  // ── Scheduling page ───────────────────────────────────────────────────────
  booking: {
    tag:         { pt: 'AGENDAMENTO VIP',             en: 'VIP BOOKING' },
    headline:    { pt: 'Agende sua Consulta',         en: 'Book Your Appointment' },
    sub:         { pt: 'Escolha a data e horário ideal. Em seguida você será direcionado ao WhatsApp para confirmar.', en: 'Choose your ideal date and time. You will then be directed to WhatsApp to confirm.' },
    back:        { pt: 'Voltar ao site',              en: 'Back to site' },
    pickDate:    { pt: 'Escolha a Data',              en: 'Pick a Date' },
    available:   { pt: 'Horários disponíveis',        en: 'Available times' },
    infoTitle:   { pt: 'Informações',                 en: 'Information' },
    nameLbl:     { pt: 'Nome completo *',             en: 'Full name *' },
    namePh:      { pt: 'Digite seu nome completo',    en: 'Enter your full name' },
    procLbl:     { pt: 'Procedimento *',              en: 'Procedure *' },
    obsLbl:      { pt: 'Observações',                 en: 'Notes' },
    obsPh:       { pt: 'Descreva brevemente o que você precisa...', en: 'Briefly describe what you need...' },
    summaryTag:  { pt: 'Resumo do Agendamento',       en: 'Appointment Summary' },
    summaryDate: { pt: 'Data:',                       en: 'Date:' },
    summaryTime: { pt: 'Horário:',                    en: 'Time:' },
    summaryProc: { pt: 'Procedimento:',               en: 'Procedure:' },
    submitBtn:   { pt: 'Confirmar via WhatsApp →',    en: 'Confirm via WhatsApp →' },
    successH:    { pt: 'Agendamento Enviado!',        en: 'Appointment Sent!' },
    successP:    { pt: 'Você está sendo redirecionado ao WhatsApp do Dr. Rowan para confirmar o horário.', en: 'You are being redirected to Dr. Rowan\'s WhatsApp to confirm the appointment.' },
    trust:       { pt: 'Invisalign Top Doctor · CRO RJ-36828 · Atendemos Expats', en: 'Invisalign Top Doctor · CRO RJ-36828 · Expat Specialist' },
    procedures: [
      { id: 'smile-design',   pt: { label: 'Smile Design',         sub: 'Facetas de porcelana — transformação completa' },  en: { label: 'Smile Design',         sub: 'Porcelain veneers — complete transformation' } },
      { id: 'invisalign',     pt: { label: 'Invisalign Diamond',   sub: 'Ortodontia invisível com alinhadores' },           en: { label: 'Invisalign Diamond',   sub: 'Invisible orthodontics with aligners' } },
      { id: 'implantes',      pt: { label: 'Implantes Dentários',  sub: 'Reabilitação oral com sedação' },                  en: { label: 'Dental Implants',      sub: 'Oral rehabilitation with sedation' } },
      { id: 'clareamento',    pt: { label: 'Clareamento Laser',    sub: 'Branqueamento premium imediato' },                 en: { label: 'Laser Whitening',      sub: 'Immediate premium whitening' } },
      { id: 'gengivoplastia', pt: { label: 'Gengivoplastia Laser', sub: 'Contorno gengival com laser' },                   en: { label: 'Laser Gingivoplasty',  sub: 'Laser gum contouring' } },
      { id: 'consulta',       pt: { label: 'Consulta Inicial',     sub: 'Avaliação e planejamento do tratamento' },         en: { label: 'Initial Consultation', sub: 'Evaluation and treatment planning' } },
    ],
    whatsappMsg: {
      pt: (nome: string, proc: string, date: string, time: string, obs: string) =>
        `Olá, Dr. Rowan! Gostaria de agendar uma consulta:\n\n👤 *Nome:* ${nome}\n🦷 *Procedimento:* ${proc}\n📅 *Data:* ${date}\n🕐 *Horário:* ${time}${obs ? `\n📝 *Observações:* ${obs}` : ''}\n\nAguardo confirmação! 😊`,
      en: (nome: string, proc: string, date: string, time: string, obs: string) =>
        `Hello, Dr. Rowan! I'd like to book an appointment:\n\n👤 *Name:* ${nome}\n🦷 *Procedure:* ${proc}\n📅 *Date:* ${date}\n🕐 *Time:* ${time}${obs ? `\n📝 *Notes:* ${obs}` : ''}\n\nLooking forward to confirmation! 😊`,
    },
  },
} as const;

/** Helper: get the right string for the current language */
export function tr<T extends { pt: string; en: string }>(obj: T, lang: Lang): string {
  return obj[lang];
}
