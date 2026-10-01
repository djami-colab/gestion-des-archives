'use client'

import { useMemo, useState } from 'react'
import {
  Archive,
  ArrowDownToLine,
  ArrowLeftRight,
  Bell,
  Box,
  CalendarClock,
  ChevronDown,
  ClipboardCheck,
  FileText,
  Filter,
  LayoutDashboard,
  MapPin,
  Menu,
  PackageCheck,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  UserRound,
  Users,
  X,
} from 'lucide-react'

type Language = 'fr' | 'ar'

type BoxRow = {
  code: string
  title: string
  service: string
  location: string
  period: string
  status: string
  statusTone: 'blue' | 'green' | 'amber' | 'red'
}

const boxes: BoxRow[] = [
  { code: 'BX-2026-01428', title: 'Dossiers administratifs — Personnel', service: 'Ressources humaines', location: 'Local A · Rayon 03 · Niveau 2', period: '2021 — 2023', status: 'Archivée', statusTone: 'green' },
  { code: 'BX-2026-01427', title: 'Marchés et contrats fournisseurs', service: 'Achats & logistique', location: 'Local B · Rayon 11 · Niveau 1', period: '2022 — 2024', status: 'Sortie', statusTone: 'amber' },
  { code: 'BX-2026-01426', title: 'Correspondances direction générale', service: 'Direction générale', location: 'Local A · Rayon 01 · Niveau 4', period: '2020 — 2022', status: 'Archivée', statusTone: 'green' },
  { code: 'BX-2026-01425', title: 'Factures et pièces comptables', service: 'Finances & comptabilité', location: 'Local C · Rayon 07 · Niveau 2', period: '2019 — 2021', status: 'À restituer', statusTone: 'red' },
  { code: 'BX-2026-01424', title: 'Dossiers de consultation', service: 'Affaires juridiques', location: 'Transfert en cours', period: '2023 — 2024', status: 'Transférée', statusTone: 'blue' },
]

const copy = {
  fr: {
    app: 'ARCHIVIA', subtitle: 'Gestion des archives', dashboard: 'Tableau de bord', boxes: 'Boîtes d’archives', movements: 'Mouvements', consultations: 'Consultations', deadlines: 'Échéances', reports: 'Éditions & exports', referentials: 'Référentiels', administration: 'Administration', search: 'Rechercher une boîte, un mot-clé…', newBox: 'Nouvelle boîte', welcome: 'Bonjour, Samira', role: 'Responsable d’archive', overview: 'Vue d’ensemble', updated: 'Mis à jour aujourd’hui à 09:42', total: 'Total des boîtes', archived: 'Boîtes archivées', pending: 'Demandes en attente', overdue: 'Retours en retard', recent: 'Dernières boîtes enregistrées', seeAll: 'Voir tout', code: 'Code', content: 'Intitulé / contenu', service: 'Service', location: 'Emplacement', period: 'Période', state: 'État', activity: 'Activité récente', showAll: 'Tout afficher', deadlineTitle: 'Échéances à surveiller', deadlineText: 'boîtes arrivent en fin de conservation dans les 90 prochains jours', open: 'Ouvrir la liste', language: 'العربية', filters: 'Filtres', menu: 'Menu', notifications: 'Notifications', profile: 'Profil', online: 'Réseau interne sécurisé', allServices: 'Tous les services', today: 'Aujourd’hui', month: 'Ce mois-ci', close: 'Fermer', quick: 'Actions rapides', transfer: 'Créer un transfert', consultation: 'Nouvelle consultation', export: 'Exporter la liste', noResult: 'Aucun résultat', result: 'résultat(s)',
  },
  ar: {
    app: 'أرشيفيا', subtitle: 'إدارة الأرشيف', dashboard: 'لوحة التحكم', boxes: 'صناديق الأرشيف', movements: 'الحركات', consultations: 'الاستشارات', deadlines: 'الآجال', reports: 'التقارير والتصدير', referentials: 'المراجع', administration: 'الإدارة', search: 'ابحث عن صندوق أو كلمة مفتاحية…', newBox: 'صندوق جديد', welcome: 'مرحباً، سميرة', role: 'مسؤولة الأرشيف', overview: 'نظرة عامة', updated: 'آخر تحديث اليوم 09:42', total: 'إجمالي الصناديق', archived: 'الصناديق المؤرشفة', pending: 'الطلبات المعلقة', overdue: 'الإرجاعات المتأخرة', recent: 'آخر الصناديق المسجلة', seeAll: 'عرض الكل', code: 'الرمز', content: 'العنوان / المحتوى', service: 'المصلحة', location: 'الموقع', period: 'الفترة', state: 'الحالة', activity: 'النشاط الأخير', showAll: 'عرض الكل', deadlineTitle: 'آجال يجب مراقبتها', deadlineText: 'صندوقاً ستنتهي مدة حفظها خلال 90 يوماً القادمة', open: 'فتح القائمة', language: 'Français', filters: 'الفلاتر', menu: 'القائمة', notifications: 'الإشعارات', profile: 'الملف الشخصي', online: 'شبكة داخلية آمنة', allServices: 'كل المصالح', today: 'اليوم', month: 'هذا الشهر', close: 'إغلاق', quick: 'إجراءات سريعة', transfer: 'إنشاء تحويل', consultation: 'استشارة جديدة', export: 'تصدير القائمة', noResult: 'لا توجد نتائج', result: 'نتيجة',
  },
}

const icons = [LayoutDashboard, Box, ArrowLeftRight, ClipboardCheck, CalendarClock, FileText, SlidersHorizontal, ShieldCheck]

export function ArchiveDashboard() {
  const [lang, setLang] = useState<Language>('fr')
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(copy.fr.dashboard)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [newBoxOpen, setNewBoxOpen] = useState(false)
  const [boxForm, setBoxForm] = useState({ title: '', service: '', periodStart: '', periodEnd: '', type: 'Dossiers administratifs', notes: '' })
  const [boxList, setBoxList] = useState<BoxRow[]>(boxes)
  const t = copy[lang]
  const isArabic = lang === 'ar'
  const filteredBoxes = useMemo(() => boxList.filter((item) => `${item.code} ${item.title} ${item.service}`.toLowerCase().includes(query.toLowerCase())), [boxList, query])
  const openNewBox = () => { setBoxForm({ title: '', service: '', periodStart: '', periodEnd: '', type: 'Dossiers administratifs', notes: '' }); setNewBoxOpen(true) }
  const createBox = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextCode = `BX-2026-${String(1429 + boxList.length - boxes.length).padStart(5, '0')}`
    setBoxList((current) => [{ code: nextCode, title: boxForm.title, service: boxForm.service, location: 'À affecter', period: `${boxForm.periodStart} — ${boxForm.periodEnd}`, status: 'Enregistrée', statusTone: 'blue' }, ...current])
    setNewBoxOpen(false)
    setActive(copy[lang].boxes)
  }

  const navigation = [t.dashboard, t.boxes, t.movements, t.consultations, t.deadlines, t.reports]
  const getIcon = (index: number) => icons[index]

  return (
    <div className="archive-shell" dir={isArabic ? 'rtl' : 'ltr'}>
      <aside className={`archive-sidebar ${mobileOpen ? 'is-open' : ''}`}>
        <div className="brand-block">
          <div className="brand-mark"><Archive size={21} strokeWidth={2.4} /></div>
          <div><strong>{t.app}</strong><span>{t.subtitle}</span></div>
          <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label={t.close}><X size={18} /></button>
        </div>
        <div className="network-pill"><span className="status-dot" />{t.online}</div>
        <nav aria-label={t.menu}>
          <p className="nav-label">{t.menu}</p>
          {navigation.map((item, index) => { const Icon = getIcon(index); return <button key={item} className={`nav-item ${active === item ? 'active' : ''}`} onClick={() => { setActive(item); setMobileOpen(false) }}><Icon size={18} /><span>{item}</span>{item === t.consultations && <b>4</b>}</button> })}
          <p className="nav-label secondary-label">{t.referentials}</p>
          <button className="nav-item"><Settings2 size={18} /><span>{t.referentials}</span></button>
          <button className="nav-item"><Users size={18} /><span>{t.administration}</span></button>
        </nav>
        <div className="sidebar-footer"><div className="secure-icon"><ShieldCheck size={17} /></div><div><strong>Accès contrôlé</strong><span>Session sécurisée</span></div></div>
      </aside>

      <main className="archive-main">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileOpen(true)} aria-label={t.menu}><Menu size={21} /></button>
          <div className="breadcrumbs"><span>{t.app}</span><i>/</i><strong>{active}</strong></div>
          <div className="top-actions">
            <button className="language-button" onClick={() => setLang(isArabic ? 'fr' : 'ar')}><span className="language-globe">文</span>{t.language}</button>
            <button className="icon-button notification-button" aria-label={t.notifications}><Bell size={19} /><span className="notification-dot" /></button>
            <div className="user-chip"><div className="avatar">SB</div><div className="user-copy"><strong>Samira B.</strong><span>{t.role}</span></div><ChevronDown size={15} /></div>
          </div>
        </header>

        <section className="content-wrap">
          <div className="page-heading"><div><p className="eyebrow">{t.overview}</p><h1>{t.welcome}</h1><p className="muted">{t.updated}</p></div><button className="primary-button" onClick={openNewBox}><Box size={17} />{t.newBox}</button></div>
          <div className="search-row"><div className="global-search"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.search} /><kbd>⌘ K</kbd></div><button className="filter-button"><Filter size={17} />{t.filters}</button></div>

          {active !== t.dashboard ? (
            <StaticFeatureView active={active} t={t} boxes={filteredBoxes} onNewBox={openNewBox} />
          ) : (
            <>
          <section className="metric-grid" aria-label={t.overview}>
            <MetricCard label={t.total} value="12 846" delta="+8.4%" tone="navy" icon={<Archive size={19} />} />
            <MetricCard label={t.archived} value="11 209" delta="+6.1%" tone="teal" icon={<PackageCheck size={19} />} />
            <MetricCard label={t.pending} value="28" delta="À traiter" tone="violet" icon={<ClipboardCheck size={19} />} />
            <MetricCard label={t.overdue} value="07" delta="+2 ce mois" tone="orange" icon={<CalendarClock size={19} />} />
          </section>

          <div className="dashboard-grid">
            <section className="panel recent-panel"><div className="panel-heading"><div><h2>{t.recent}</h2><p>{query ? `${filteredBoxes.length} ${t.result}` : '5 éléments affichés'}</p></div><button className="text-button">{t.seeAll}<span>→</span></button></div><div className="table-wrap"><table><thead><tr><th>{t.code}</th><th>{t.content}</th><th>{t.service}</th><th>{t.location}</th><th>{t.period}</th><th>{t.state}</th></tr></thead><tbody>{filteredBoxes.map((item) => <tr key={item.code}><td><strong className="code-cell">{item.code}</strong></td><td><div className="content-cell"><span className="mini-box"><Box size={14} /></span><strong>{item.title}</strong></div></td><td>{item.service}</td><td><span className="location-cell"><MapPin size={13} />{item.location}</span></td><td>{item.period}</td><td><span className={`status-badge ${item.statusTone}`}>{item.status}</span></td></tr>)}</tbody></table>{filteredBoxes.length === 0 && <div className="empty-state">{t.noResult}</div>}</div></section>
            <aside className="side-column"><section className="panel deadline-card"><div className="panel-heading"><div><h2>{t.deadlineTitle}</h2><p>Fin de conservation</p></div><div className="warning-icon"><CalendarClock size={18} /></div></div><div className="deadline-number"><strong>14</strong><span>{t.deadlineText}</span></div><div className="progress-track"><span /></div><button className="outline-button">{t.open}<span>→</span></button></section><section className="panel activity-card"><div className="panel-heading"><h2>{t.activity}</h2><button className="dots-button">•••</button></div><ActivityItem icon={<ArrowDownToLine size={15} />} text="Nouvelle boîte enregistrée" detail="BX-2026-01428 · il y a 18 min" tone="teal" /><ActivityItem icon={<ArrowLeftRight size={15} />} text="Transfert validé" detail="BX-2026-01424 · il y a 1 h" tone="blue" /><ActivityItem icon={<ClipboardCheck size={15} />} text="Demande approuvée" detail="Consultation · il y a 2 h" tone="purple" /><button className="text-button activity-link">{t.showAll}<span>→</span></button></section></aside>
          </div>

          <section className="quick-actions"><p>{t.quick}</p><div className="quick-action-grid"><QuickAction icon={<ArrowLeftRight size={18} />} text={t.transfer} /><QuickAction icon={<ClipboardCheck size={18} />} text={t.consultation} /><QuickAction icon={<FileText size={18} />} text={t.export} /></div></section>
            </>
          )}
        </section>
      </main>
      {newBoxOpen && <NewBoxDialog t={t} form={boxForm} setForm={setBoxForm} onClose={() => setNewBoxOpen(false)} onSubmit={createBox} />}
    </div>
  )
}

function NewBoxDialog({ t, form, setForm, onClose, onSubmit }: { t: (typeof copy)['fr']; form: { title: string; service: string; periodStart: string; periodEnd: string; type: string; notes: string }; setForm: React.Dispatch<React.SetStateAction<typeof form>>; onClose: () => void; onSubmit: (event: React.FormEvent<HTMLFormElement>) => void }) {
  return <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <section className="new-box-dialog" role="dialog" aria-modal="true" aria-labelledby="new-box-title">
      <div className="dialog-heading"><div><p className="eyebrow">Enregistrement</p><h2 id="new-box-title">Nouvelle boîte d&apos;archives</h2><p>Renseignez les informations principales de la boîte.</p></div><button className="dialog-close" onClick={onClose} aria-label={t.close}><X size={18} /></button></div>
      <form onSubmit={onSubmit}>
        <div className="form-grid"><label>Intitulé / contenu<input required value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} placeholder="Ex. Dossiers administratifs" /></label><label>Service<select required value={form.service} onChange={(event) => setForm((current) => ({ ...current, service: event.target.value }))}><option value="">Sélectionner un service</option><option>Ressources humaines</option><option>Finances & comptabilité</option><option>Achats & logistique</option><option>Direction générale</option><option>Affaires juridiques</option></select></label><label>Type de document<select value={form.type} onChange={(event) => setForm((current) => ({ ...current, type: event.target.value }))}><option>Dossiers administratifs</option><option>Factures et pièces comptables</option><option>Marchés et contrats</option><option>Correspondances</option></select></label><label>Période de référence<div className="period-fields"><input required type="number" min="1900" max="2100" value={form.periodStart} onChange={(event) => setForm((current) => ({ ...current, periodStart: event.target.value }))} placeholder="Début" /><span>—</span><input required type="number" min="1900" max="2100" value={form.periodEnd} onChange={(event) => setForm((current) => ({ ...current, periodEnd: event.target.value }))} placeholder="Fin" /></div></label><label className="full-field">Observations <textarea value={form.notes} onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))} placeholder="Informations complémentaires (facultatif)" rows={3} /></label></div>
        <div className="dialog-footer"><button type="button" className="cancel-button" onClick={onClose}>Annuler</button><button type="submit" className="primary-button"><Box size={16} />Enregistrer la boîte</button></div>
      </form>
    </section>
  </div>
}

function StaticFeatureView({ active, t, boxes, onNewBox }: { active: string; t: (typeof copy)['fr']; boxes: BoxRow[]; onNewBox: () => void }) {
  const isBoxes = active === t.boxes
  const isDeadlines = active === t.deadlines
  const isConsultations = active === t.consultations
  const title = isBoxes ? t.boxes : active
  const description = isBoxes ? 'Catalogue centralisé des boîtes et de leur emplacement.' : isDeadlines ? 'Surveillez les échéances de conservation et les actions à valider.' : isConsultations ? 'Demandes de consultation, sorties et restitutions à suivre.' : 'Cette vue présente les opérations et les informations de référence du registre.'

  return <section className="feature-view">
    <div className="feature-banner"><div><p className="eyebrow">Module</p><h2>{title}</h2><p>{description}</p></div><span className="module-status"><span className="status-dot" />Données synchronisées</span></div>
    {isBoxes ? <div className="panel feature-panel"><div className="panel-heading"><div><h2>Catalogue des boîtes</h2><p>{boxes.length} résultats dans votre périmètre</p></div><button className="primary-button" onClick={onNewBox}><Box size={16} />Nouvelle boîte</button></div><div className="table-wrap"><table><thead><tr><th>Code</th><th>Intitulé</th><th>Service</th><th>Emplacement</th><th>Période</th><th>État</th></tr></thead><tbody>{boxes.map((item) => <tr key={item.code}><td><strong className="code-cell">{item.code}</strong></td><td><div className="content-cell"><span className="mini-box"><Box size={14} /></span><strong>{item.title}</strong></div></td><td>{item.service}</td><td><span className="location-cell"><MapPin size={13} />{item.location}</span></td><td>{item.period}</td><td><span className={`status-badge ${item.statusTone}`}>{item.status}</span></td></tr>)}</tbody></table></div></div> : <div className="feature-cards"><FeatureCard icon={<ClipboardCheck size={19} />} title={isConsultations ? 'Demandes en attente' : isDeadlines ? 'Boîtes arrivant à échéance' : 'À traiter'} value={isConsultations ? '28' : isDeadlines ? '14' : '12'} detail={isConsultations ? 'Demandes nécessitent une validation' : isDeadlines ? 'Dans les 90 prochains jours' : 'éléments dans ce module'} tone="teal" /><FeatureCard icon={<CalendarClock size={19} />} title="Prochaine action" value={isDeadlines ? '15 oct.' : 'Aujourd’hui'} detail={isDeadlines ? 'Première échéance à examiner' : 'Aucune action bloquante'} tone="orange" /><FeatureCard icon={<ShieldCheck size={19} />} title="Traçabilité" value="100 %" detail="Actions enregistrées au journal" tone="navy" /></div>}
  </section>
}

function FeatureCard({ icon, title, value, detail, tone }: { icon: React.ReactNode; title: string; value: string; detail: string; tone: string }) { return <article className="feature-card"><div className={`metric-icon ${tone}`}>{icon}</div><p>{title}</p><strong>{value}</strong><span>{detail}</span></article> }

function MetricCard({ label, value, delta, tone, icon }: { label: string; value: string; delta: string; tone: string; icon: React.ReactNode }) { return <div className="metric-card"><div className={`metric-icon ${tone}`}>{icon}</div><div className="metric-info"><span>{label}</span><strong>{value}</strong><small className={tone === 'orange' || tone === 'violet' ? 'warm' : ''}>{delta}</small></div></div> }
function ActivityItem({ icon, text, detail, tone }: { icon: React.ReactNode; text: string; detail: string; tone: string }) { return <div className="activity-item"><div className={`activity-icon ${tone}`}>{icon}</div><div><strong>{text}</strong><span>{detail}</span></div></div> }
function QuickAction({ icon, text }: { icon: React.ReactNode; text: string }) { return <button className="quick-action"><span>{icon}</span>{text}<b>→</b></button> }
