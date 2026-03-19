import { useState } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { t } from '../translations';

const WHATSAPP = '5521988816084';

const WEEKDAYS_PT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const WEEKDAYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS_PT   = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const MONTHS_EN   = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const TIME_SLOTS = ['09:00','10:00','11:00','14:00','15:00','16:00','17:00','17:30'];

function sameDay(a: Date, b: Date) {
  return a.getDate()===b.getDate() && a.getMonth()===b.getMonth() && a.getFullYear()===b.getFullYear();
}

export default function AgendamentoPage({ onBack }: { onBack: () => void }) {
  const { lang } = useLang();
  const bk = t.booking;
  const procedures = bk.procedures;

  const today = new Date(); today.setHours(0,0,0,0);

  const [calDate, setCalDate]       = useState(new Date(today));
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedProc, setSelectedProc] = useState('');
  const [nome, setNome]               = useState('');
  const [obs, setObs]                 = useState('');
  const [success, setSuccess]         = useState(false);

  const year  = calDate.getFullYear();
  const month = calDate.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth  = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCalDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCalDate(new Date(year, month + 1, 1));

  const calCells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  function selectDay(day: number) {
    const d = new Date(year, month, day);
    if (d < today || d.getDay() === 0) return;
    setSelectedDay(d);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDay || !selectedTime || !selectedProc || !nome.trim()) return;

    const procLabel = procedures.find(p => p.id === selectedProc)?.[lang].label ?? selectedProc;
    const dateStr   = selectedDay.toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-GB');
    const msgFn     = bk.whatsappMsg[lang];
    const msg       = encodeURIComponent(msgFn(nome, procLabel, dateStr, selectedTime, obs));

    setSuccess(true);
    setTimeout(() => { window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank'); }, 1500);
  }

  const weekdays = lang === 'pt' ? WEEKDAYS_PT : WEEKDAYS_EN;
  const months   = lang === 'pt' ? MONTHS_PT   : MONTHS_EN;
  const canSubmit = !!(selectedDay && selectedTime && selectedProc && nome.trim());

  // ── Success ──────────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen bg-luxury-cream flex flex-col items-center justify-center px-4">
        <div className="bg-white image-card-shadow p-12 max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-luxury-gold/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-luxury-gold" />
          </div>
          <h2 className="font-serif text-3xl text-luxury-charcoal mb-3">{bk.successH[lang]}</h2>
          <p className="font-sans text-sm text-luxury-gray mb-8">{bk.successP[lang]}</p>
          <button onClick={onBack} className="btn-luxury btn-luxury-gold btn-luxury-pill w-full justify-center">
            {bk.back[lang]}
          </button>
        </div>
      </div>
    );
  }

  // ── Main ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-luxury-cream">
      {/* Header */}
      <header className="bg-white border-b border-luxury-warm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 font-sans text-sm text-luxury-gray hover:text-luxury-charcoal transition-colors group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">{bk.back[lang]}</span>
          </button>
          <div className="font-serif text-xl tracking-[0.1em] text-luxury-charcoal">
            Dr. <span className="text-luxury-gold">Rowan Vilar</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img src="/images/doctor-portrait.jpg" alt="Dr. Rowan" className="w-full h-full object-cover" />
            </div>
            <p className="hidden sm:block font-sans text-xs text-luxury-gray">CRO RJ-36828</p>
          </div>
        </div>
      </header>

      {/* Title */}
      <div className="text-center py-12 px-4">
        <span className="heading-section text-luxury-gold block mb-3">{bk.tag[lang]}</span>
        <h1 className="font-serif text-4xl lg:text-5xl text-luxury-charcoal mb-3">{bk.headline[lang]}</h1>
        <p className="font-sans text-sm text-luxury-gray max-w-lg mx-auto">{bk.sub[lang]}</p>
      </div>

      {/* Booking grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pb-20">
        <div className="bg-white image-card-shadow grid lg:grid-cols-2 overflow-hidden">

          {/* LEFT — Calendar + Time */}
          <div className="border-b lg:border-b-0 lg:border-r border-luxury-warm/60 bg-luxury-cream/40 p-6 sm:p-10">
            <h2 className="font-serif text-2xl text-luxury-charcoal mb-6 flex items-center gap-2">
              <span>📅</span> {bk.pickDate[lang]}
            </h2>

            {/* Month nav */}
            <div className="flex items-center justify-between mb-5">
              <button onClick={prevMonth} className="w-10 h-10 rounded-full border border-luxury-warm bg-white flex items-center justify-center hover:bg-luxury-charcoal hover:text-white hover:border-luxury-charcoal transition-all">‹</button>
              <span className="font-serif text-lg text-luxury-charcoal capitalize">{months[month]} {year}</span>
              <button onClick={nextMonth} className="w-10 h-10 rounded-full border border-luxury-warm bg-white flex items-center justify-center hover:bg-luxury-charcoal hover:text-white hover:border-luxury-charcoal transition-all">›</button>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 mb-2">
              {weekdays.map(d => (
                <div key={d} className="text-center font-sans text-[10px] uppercase tracking-widest text-luxury-gray py-1">{d}</div>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-1">
              {calCells.map((day, i) => {
                if (day === null) return <div key={`e-${i}`} />;
                const d          = new Date(year, month, day);
                const isDisabled = d < today || d.getDay() === 0;
                const isToday    = sameDay(d, new Date());
                const isSelected = selectedDay && sameDay(d, selectedDay);
                return (
                  <button
                    key={day}
                    onClick={() => selectDay(day)}
                    disabled={isDisabled}
                    className={[
                      'aspect-square flex items-center justify-center rounded-xl text-sm font-sans transition-all',
                      isDisabled  ? 'text-luxury-warm cursor-not-allowed' : 'cursor-pointer',
                      isSelected  ? 'bg-luxury-gold text-white font-semibold shadow-glow' :
                      isToday     ? 'border border-luxury-gold text-luxury-gold font-semibold' :
                      !isDisabled ? 'bg-white hover:bg-luxury-charcoal hover:text-white hover:-translate-y-0.5' : '',
                    ].join(' ')}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Time slots */}
            <div className="mt-8">
              <p className="font-sans text-xs uppercase tracking-widest text-luxury-gray mb-3">{bk.available[lang]}</p>
              <div className="grid grid-cols-4 gap-2">
                {TIME_SLOTS.map(tt => (
                  <button
                    key={tt}
                    onClick={() => setSelectedTime(tt)}
                    className={[
                      'py-2.5 text-xs font-sans border transition-all duration-200',
                      selectedTime === tt
                        ? 'bg-luxury-gold text-white border-luxury-gold font-semibold'
                        : 'bg-white border-luxury-warm text-luxury-charcoal hover:border-luxury-gold hover:text-luxury-gold',
                    ].join(' ')}
                  >
                    {tt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Form */}
          <div className="p-6 sm:p-10">
            <h2 className="font-serif text-2xl text-luxury-charcoal mb-6 flex items-center gap-2">
              <span>✏️</span> {bk.infoTitle[lang]}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Nome */}
              <div>
                <label className="font-sans text-xs uppercase tracking-widest text-luxury-gray block mb-2">{bk.nameLbl[lang]}</label>
                <input
                  type="text"
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  placeholder={bk.namePh[lang]}
                  required
                  className="w-full px-4 py-3.5 border border-luxury-warm bg-luxury-cream/30 font-sans text-sm text-luxury-charcoal placeholder:text-luxury-gray/50 focus:outline-none focus:border-luxury-gold transition-colors"
                />
              </div>

              {/* Procedures */}
              <div>
                <label className="font-sans text-xs uppercase tracking-widest text-luxury-gray block mb-3">{bk.procLbl[lang]}</label>
                <div className="flex flex-col gap-2">
                  {procedures.map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedProc(p.id)}
                      className={[
                        'flex items-center gap-4 p-3.5 border-2 text-left transition-all duration-200',
                        selectedProc === p.id ? 'border-luxury-gold bg-luxury-gold/5' : 'border-luxury-warm hover:border-luxury-gold/50',
                      ].join(' ')}
                    >
                      <div className={['flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
                        selectedProc === p.id ? 'border-luxury-gold bg-luxury-gold' : 'border-luxury-warm'].join(' ')}>
                        {selectedProc === p.id && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <div>
                        <p className={`font-sans text-sm font-medium ${selectedProc === p.id ? 'text-luxury-gold' : 'text-luxury-charcoal'}`}>{p[lang].label}</p>
                        <p className="font-sans text-xs text-luxury-gray">{p[lang].sub}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Obs */}
              <div>
                <label className="font-sans text-xs uppercase tracking-widest text-luxury-gray block mb-2">{bk.obsLbl[lang]}</label>
                <textarea
                  value={obs}
                  onChange={e => setObs(e.target.value)}
                  placeholder={bk.obsPh[lang]}
                  rows={3}
                  className="w-full px-4 py-3 border border-luxury-warm bg-luxury-cream/30 font-sans text-sm text-luxury-charcoal placeholder:text-luxury-gray/50 focus:outline-none focus:border-luxury-gold transition-colors resize-none"
                />
              </div>

              {/* Summary */}
              <div className="bg-luxury-cream/60 border border-luxury-warm p-5">
                <p className="font-sans text-[10px] uppercase tracking-widest text-luxury-gray mb-3">{bk.summaryTag[lang]}</p>
                <div className="space-y-2 text-sm font-sans">
                  <div className="flex justify-between">
                    <span className="text-luxury-gray">{bk.summaryDate[lang]}</span>
                    <span className="text-luxury-charcoal font-medium">{selectedDay ? selectedDay.toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-GB') : '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-luxury-gray">{bk.summaryTime[lang]}</span>
                    <span className="text-luxury-charcoal font-medium">{selectedTime || '—'}</span>
                  </div>
                  <div className="flex justify-between border-t border-luxury-warm pt-2 mt-2">
                    <span className="text-luxury-gray">{bk.summaryProc[lang]}</span>
                    <span className="text-luxury-charcoal font-semibold text-right max-w-[60%]">
                      {procedures.find(p => p.id === selectedProc)?.[lang].label || '—'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!canSubmit}
                className={[
                  'w-full py-4 font-sans font-semibold text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300',
                  canSubmit ? 'bg-luxury-charcoal text-white hover:bg-luxury-gold hover:-translate-y-0.5 hover:shadow-glow cursor-pointer' : 'bg-luxury-warm text-luxury-gray cursor-not-allowed',
                ].join(' ')}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.555 4.106 1.523 5.834L.057 23.882a.5.5 0 00.613.614l6.083-1.456A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.87 9.87 0 01-5.031-1.372l-.361-.214-3.713.889.905-3.624-.236-.373A9.873 9.873 0 012.12 12C2.12 6.532 6.532 2.12 12 2.12c5.468 0 9.879 4.412 9.879 9.88 0 5.467-4.411 9.882-9.879 9.882z"/>
                </svg>
                {bk.submitBtn[lang]}
              </button>

              <p className="font-sans text-[11px] text-luxury-gray text-center">{bk.trust[lang]}</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
