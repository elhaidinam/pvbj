/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  AlertTriangle, 
  Send, 
  FileSearch, 
  CheckCircle2, 
  BarChart3, 
  MessageSquare,
  ChevronLeft,
  Users,
  Share2,
  ChevronRight,
  Monitor,
  Smartphone,
  User,
  Stethoscope,
  Building2,
  Activity,
  TrendingUp
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { cn } from './lib/utils';

// --- Data ---

const MENU_ITEMS = [
  { 
    id: 'detection', 
    label: 'Détection', 
    hour: 1, 
    icon: Search, 
    color: '#3b82f6', 
    description: "Un événement indésirable est tout événement médical non recherché, qui suit l'administration d'un produit de santé, suspecté comme en étant la cause, avec ou sans preuve. Il peut s'agir d'un signe défavorable ou imprévu, d'un résultat de laboratoire anormal, d'un symptôme ou d'une maladie. Les sujets eux-mêmes et/ou leur entourage, le personnel administrant les produits de santé ou les prestataires de soins des formations sanitaires sont les mieux placés pour reconnaitre les événements indésirables lorsqu'ils surviennent." 
  },
  { 
    id: 'signalement', 
    label: 'Signalement', 
    hour: 2, 
    icon: AlertTriangle, 
    color: '#f59e0b', 
    description: "Le signalement intervient lorsque le patient ou son entourage informe un personnel de santé de la survenue d'événement indésirable. Tout signalement doit déboucher sur une notification." 
  },
  { 
    id: 'notification', 
    label: 'Notification', 
    hour: 4, 
    icon: Send, 
    color: '#10b981', 
    description: "Tout cas signalé à un prestataire de santé ou détecté par lui-même doit être notifié dans les meilleurs délais en remplissant le formulaire standard de notification. Le formulaire rempli doit être acheminé à l'ABMED par la voie des points focaux de district et de région" 
  },
  { 
    id: 'investigation', 
    label: 'Investigation', 
    hour: 5, 
    icon: FileSearch, 
    color: '#8b5cf6', 
    description: "Pour tout cas grave, vérifier que le patient a été référé dans un hôpital tertiaire et la prise en charge mise en route. Le dossier médical doit être scanné en entier avec les résultats de tous les examens cliniques et para-cliniques." 
  },
  { id: 'imputabilite', label: 'Imputabilité', hour: 7, icon: CheckCircle2, color: '#ec4899', description: 'Évaluation du lien de causalité.' },
  { id: 'analyses', label: 'Analyses', hour: 9, icon: BarChart3, color: '#6366f1', description: 'Analyses statistiques et tendances.' },
  { id: 'feedback', label: 'Feedback', hour: 11, icon: MessageSquare, color: '#ef4444', description: 'Retour d’information aux prescripteurs.' },
];

const SITREP_DATA = [
  { name: 'Lun', cases: 12 },
  { name: 'Mar', cases: 19 },
  { name: 'Mer', cases: 15 },
  { name: 'Jeu', cases: 22 },
  { name: 'Ven', cases: 30 },
  { name: 'Sam', cases: 10 },
  { name: 'Dim', cases: 8 },
];

// --- Components ---

function Histogram() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <h3 className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Situation Report</h3>
      <div className="w-full h-32">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={SITREP_DATA}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 8, fill: '#94a3b8' }}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
              contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', fontSize: '10px', color: '#f8fafc' }}
            />
            <Bar dataKey="cases" radius={[2, 2, 0, 0]}>
              {SITREP_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 4 ? '#3b82f6' : '#94a3b8'} fillOpacity={index === 4 ? 1 : 0.4} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 text-center">
        <span className="text-2xl font-light text-slate-700">126</span>
        <p className="text-[9px] text-slate-400 uppercase tracking-tighter">Total Signalements Hebdo</p>
      </div>
    </div>
  );
}

const PEC_CASES = [
  {
    id: "choc-anaphylactique",
    title: "Choc anaphylactique",
    definition: "Apparition soudaine (et jusqu’à 72h) d’un tableau associant : hypotension artérielle (TAS < 9 mmHg), pouls filant ou imprenable, extrémités froides, hypersudation, troubles de la conscience - Avec ou sans urticaire, prurit, angiœdème, détresse respiratoire.",
    diagnostics: "Circonstances de survenue, fréquence cardiaque (bradycardie), NFS, ionogramme, créatininémie, urémie, glycémie, Hémoculture - ECG",
    treatment: "Choc cardiogénique (infarctus) Choc septique, Choc hypovolémique (hémorragie, diarrhée), Syncope vaso-vagal - Coma hypoglycémique"
  },
  {
    id: "anaphylaxie",
    title: "Anaphylaxie",
    definition: "Réaction allergique sévère survenant immédiatement ou dans l’heure qui suit la vaccination, caractérisée par une défaillance cardio-circulatoire avec : - Pouls accéléré, filant ou imprenable - Hypotension, Obnubilation, polypnée et pâleur cutanéo-muqueuse",
    diagnostics: "Signes cutanéo-muqueux : prurit, urticaire, œdème de Quincke, sueurs… - Signes respiratoires : toux, dyspnée… - Signes cardio-vasculaires : bouffée de chaleur, tachycardie, pouls petit et filant, chute de la tension artérielle Examen paraclinique : NFS, urée, créatininémie, glycémie, transaminases, ionogramme sanguin, CR",
    treatment: "Mise en posiiton allongée du patient, tête basse. - Prise de la TA et du pouls - Oxygénothérapie - Remplissage vasculaire le plus vite possible : SSI (250 ml), - Corticoïdes"
  },
  {
    id: "encephalopathie",
    title: "Encéphalopathie",
    definition: "Apparition aigüe d’un état morbide caractérisé par une conscience dépressive ou altérée et/ou un trouble du comportement durant un jour ou plus",
    diagnostics: "Anamnèse, examen physique neurologique NFS, ionogramme, glycémie, Sérologie HIV, num CD4, LCR (ECB, chimie, ± Ag solubles), - EEG, radio rachis, scanner",
    treatment: "Encéphalopathies hépatique, virale, - Hépatite métabolique"
  },
  {
    id: "fievre-persistante",
    title: "Fièvre persistante",
    definition: "Température supérieure à 38°C : - Modérée si température (38°C-38.9° C) - Elevée si (39°C-40.4°C) - Extrême (40.5°C) - Persistante(>24h)",
    diagnostics: "Température - Durée de la fièvre",
    treatment: "Infections virales (y compris MVE) - septicémie"
  },
  {
    id: "reaction-point-injection",
    title: "Réaction au point d'injection",
    definition: "Réaction inflammatoire sévère au site d’injection, dépassant l’articulation adjacente et caractérisée par l’œdème, la douleur et la chaleur. Evolution en deux phases : - Phase inflammatoire : douleur, rougeur, tuméfaction - Phase d’abcès* : Masse fluctuante au point d’injection. L’abcès peut être bactérien (présence de fièvre) ou stérile (absence de fièvre)",
    diagnostics: "Examen paraclinique - NFS - ECB du pus",
    treatment: "Phase inflammatoire : Acide acétylsalicylique : 50mg/ kg/J en 3 prises Antibiotique Pansement alcoolisé Phase d’abcès : Antibiotique. Sur avis chirurgical : Incision, Drainage, Pansement Si fistulisation : antiseptique local Paracétamol en IV ou en IR"
  },
  {
    id: "convulsions-febriles",
    title: "Convulsions fébriles répétitives",
    definition: "Secousses tonico-cloniques localisées ou généralisées accompagnées ou non de signes de focalisation ou de signes neurologiques",
    diagnostics: "Examen physique neurologique - Examen paraclinique - Urée, Créatininémie, NFS, Transaminases, - ECB et biochimie du LCR, - Radio pulmonaire, Scanner cérébral, EEG, - PCR (sang, urine, salive)",
    treatment: "Pilepsie - Paludisme grave (forme neurologique) - Méningite - Toxoplasmose cérébrale..."
  },
  {
    id: "septicemie",
    title: "Septicémie",
    definition: "Etat infectieux sévère associant un Syndrome de Réponse Inflammatoire Systémique (SRIS) avec une infection présumée ou identifiée. Le SRIS est l’association d’au moins deux des signes suivants : - Température >38°C ou <36°C -Tachycardie avec FC>120 bat/mn - Polypnée avec FR >20 cycles/mn - Hypotension - Hyperleucocytose >12000/ml ou <4000/ml",
    diagnostics: "Examen clinique : Température, FC, FR, TA. Examen paraclinique : - NFS, CRP, Urée, Créatinémie, Transaminases, Ionogramme sanguin, - GE/froƫtis Hémocultures, ECBU - Echographie abdominale et ou du site infectieux, radio pulmonaire - PCR (sang, urine, salive",
    treatment: "Hospitalisation - Prise de voie veineuse en urgence - Surveillance dynamique (Pouls, TA, FR, conscience) - Bi antibiothérapie (IV) urgente fonction du site infectoeux et du germe suspecté - SSI (250 ml) - Perfusion de macromolécules si hypotension - Oxygénothérapie si dyspnée - Antipyrétique si température >39°C."
  }
];

export default function App() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [subItem, setSubItem] = useState<string | null>(null);
  const [subSubItem, setSubSubItem] = useState<string | null>(null);

  const handleBack = () => {
    if (subSubItem) {
      setSubSubItem(null);
    } else if (subItem) {
      setSubItem(null);
    } else {
      setSelectedItem(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans overflow-hidden flex flex-col selection:bg-blue-100 pb-24">
      {/* Status Bar Backdrop (Mobile Style) */}
      <div className="h-safe-top bg-white/90 backdrop-blur-md sticky top-0 z-[60] w-full" />
      
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center border-b border-slate-100 bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ rotate: 5, scale: 1.05 }}
            className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg overflow-hidden border border-slate-100"
          >
            <img src="/abmed.png" alt="ABMED Logo" className="w-full h-full object-contain" />
          </motion.div>
          <div>
            <h1 className="font-black text-xl leading-tight tracking-tight text-slate-900">PV Pocket Guide</h1>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">Pharmacovigilance Tools</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 text-slate-400 hover:text-blue-600 transition-colors">
            <Search size={20} />
          </button>
          <button className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 text-slate-400 hover:text-blue-600 transition-colors">
            <User size={20} />
          </button>
        </div>
      </header>

      <main className="flex-1 relative flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {!selectedItem ? (
            <motion.div 
              key="home"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[500px] aspect-square flex items-center justify-center"
            >
              {/* Central Histogram Container */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[60%] aspect-square bg-white rounded-full shadow-2xl border border-slate-100 flex items-center justify-center flex-col p-4 pointer-events-auto">
                    <Histogram />
                </div>
              </div>

              {/* Circular Buttons */}
              {MENU_ITEMS.map((item) => {
                const angle = (item.hour * 30 - 90) * (Math.PI / 180);
                const radius = 42; // percentage of parent container
                const x = 50 + radius * Math.cos(angle);
                const y = 50 + radius * Math.sin(angle);

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      if (item.id === 'imputabilite') {
                        window.open("https://vigilogos.afro.who.int/", "_blank");
                      } else {
                        setSelectedItem(item.id);
                      }
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: '50%', y: '50%' }}
                    animate={{ 
                      opacity: 1, 
                      left: `${x}%`, 
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)' 
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 100, 
                      damping: 15,
                      delay: item.hour * 0.05 
                    }}
                    className="absolute z-10 flex flex-col items-center gap-1 group"
                    style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-xl"
                      style={{ backgroundColor: 'white', color: item.color, border: `1px solid ${item.color}20` }}
                    >
                      <item.icon size={24} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-900 transition-colors">
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}

              {/* Background Decorative Rings */}
              <div className="absolute inset-0 rounded-full border border-dashed border-slate-200 opacity-50 scale-90 pointer-events-none" />
              <div className="absolute inset-0 rounded-full border border-slate-100 opacity-30 pointer-events-none" />
            </motion.div>
          ) : (
            <motion.div 
              key="detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-50 flex items-center gap-4">
                <button 
                  onClick={handleBack}
                  className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400 hover:text-slate-900"
                >
                  <ChevronLeft size={24} />
                </button>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: MENU_ITEMS.find(i => i.id === selectedItem)?.color }}
                  >
                    {(() => {
                      const Icon = MENU_ITEMS.find(i => i.id === selectedItem)?.icon;
                      return Icon ? <Icon size={20} /> : null;
                    })()}
                  </div>
                  <h2 className="text-xl font-bold">{MENU_ITEMS.find(i => i.id === selectedItem)?.label}</h2>
                </div>
              </div>
              <div className="p-8">
                <p className="text-slate-600 leading-relaxed text-lg mb-8">
                  {MENU_ITEMS.find(i => i.id === selectedItem)?.description}
                </p>
                
                {selectedItem === 'detection' ? (
                  <AnimatePresence mode="wait">
                    {!subItem ? (
                      <motion.div 
                        key="detection-nav"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="grid grid-cols-3 gap-2 md:gap-4"
                      >
                        {["A la maison", "En consultation", "En intervention"].map((btn) => (
                          <motion.button 
                            key={btn} 
                            onClick={() => setSubItem(btn)}
                            whileHover={{ y: -4, shadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            className="p-4 md:p-8 rounded-2xl md:rounded-3xl bg-white border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-2 md:gap-4 group hover:border-blue-200 transition-colors"
                          >
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                              <Search className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <span className="font-bold text-[10px] md:text-base text-slate-700 text-center leading-tight">{btn}</span>
                          </motion.button>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div 
                        key={subItem}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <h3 className="text-lg font-bold text-blue-600">{subItem}</h3>
                        
                        {subItem === "A la maison" && (
                          <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100/50">
                            <p className="text-slate-700 leading-relaxed">
                              La prise en charge précoce a permis de sauver des milliers de personnes. 
                              Il est recommandé de signaler tout événement indésirable à l'agent de santé. 
                              Ne pas oublier des détails sur les signes présentés, le début de chaque signe, 
                              les hôpitaux vus récemment. Donner du paracetamol ou de l'aspirine pour faire 
                              baisser la fièvre, donner de l'eau à boire régulièrement. L'application de 
                              remèdes locaux sur une réaction locale est fortement déconseillée.
                            </p>
                          </div>
                        )}

                        {subItem === "En consultation" && (
                          <div className="flex flex-col items-center">
                            <AnimatePresence mode="wait">
                              {!subSubItem ? (
                                <motion.div 
                                  key="tiles"
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  className="grid grid-cols-2 gap-2 bg-slate-100 p-2 rounded-3xl max-w-md w-full aspect-square"
                                >
                                  {[
                                    "Détection d'une MAPI", 
                                    "Quand est-ce que c'est grave ?", 
                                    "Gestion des cas non graves", 
                                    "Gestion des cas graves"
                                  ].map((tile) => (
                                    <motion.button 
                                      key={tile} 
                                      onClick={() => setSubSubItem(tile)}
                                      whileHover={{ scale: 0.98, backgroundColor: '#f1f5f9' }}
                                      className="bg-white p-4 flex items-center justify-center text-center rounded-2xl shadow-sm group"
                                    >
                                      <span className="font-bold text-xs md:text-sm text-slate-700 group-hover:text-blue-600 transition-colors">{tile}</span>
                                    </motion.button>
                                  ))}
                                </motion.div>
                              ) : (
                                <motion.div 
                                  key={subSubItem}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  className="w-full"
                                >
                                  {subSubItem === "Détection d'une MAPI" && (
                                    <div className="space-y-4">
                                      <h4 className="font-bold text-slate-800 border-l-4 border-blue-500 pl-3">Algorithme de Décision</h4>
                                      <div className="space-y-3">
                                        {[
                                          { q: "Le patient a-t-il été vacciné ?", y: "Inscrire vaccin, date et lot dans le registre", n: "PEC le patient" },
                                          { q: "Suspectez-vous une MAPI ?", y: "Remplir la fiche de notification", n: "PEC le patient" },
                                          { q: "Est-ce une MAPI grave ?", y: "Alerter, Stabiliser, Notifier, Référer", n: "PEC le patient + Conseils de retour" }
                                        ].map((step, i) => (
                                          <div key={i} className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                                            <p className="font-bold text-sm text-slate-500 mb-2 italic">Étape {i+1}</p>
                                            <p className="font-semibold text-slate-800 mb-3">{step.q}</p>
                                            <div className="grid grid-cols-2 gap-2">
                                              <div className="p-2 bg-green-50 rounded-lg text-[10px] md:text-xs">
                                                <span className="font-bold text-green-600 block mb-1">NON</span> {step.n}
                                              </div>
                                              <div className="p-2 bg-blue-50 rounded-lg text-[10px] md:text-xs">
                                                <span className="font-bold text-blue-600 block mb-1">OUI</span> {step.y}
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {subSubItem === "Quand est-ce que c'est grave ?" && (
                                    <div className="space-y-6">
                                      <div className="p-6 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-100">
                                        <p className="text-sm font-medium opacity-90 leading-relaxed">
                                          Une MAPI est un incident médical qui se produit à la suite d’une vaccination, qui inquiète et que l’on pense être dû à celle-ci.
                                        </p>
                                      </div>
                                      <div className="space-y-2">
                                        <h4 className="font-bold text-slate-800 px-1">Critères de Gravité :</h4>
                                        <div className="grid grid-cols-1 gap-2">
                                          {[
                                            "Décès",
                                            "Mise en jeu du pronostic vital",
                                            "Nécessité d’hospitalisation",
                                            "Nécessité de prolonger une hospitalisation",
                                            "Invalidité ou incapacité persistante (>24h)",
                                            "Effet à travers la grossesse ou l’allaitement"
                                          ].map(c => (
                                            <div key={c} className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                                              <AlertTriangle className="text-red-500 shrink-0" size={16} />
                                              <span className="text-sm font-medium text-slate-700">{c}</span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {subSubItem === "Gestion des cas non graves" && (
                                    <div className="space-y-4">
                                      <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm">
                                        <table className="w-full text-left text-xs bg-white">
                                          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold">
                                            <tr>
                                              <th className="p-4 border-b">Signes / Symptômes</th>
                                              <th className="p-4 border-b">Prise en charge</th>
                                            </tr>
                                          </thead>
                                          <tbody className="divide-y divide-slate-50">
                                            {[
                                              { s: "Arthralgies, Céphalées, Fièvre, Myalgies, Pleurs persistantes", t: "Paracétamol" },
                                              { s: "Dermatite atopique, Eruption, Prurit, Rash, Urticaire", t: "Chlorphéniramine" },
                                              { s: "Erythème, Nodules persistants", t: "Surveillance" },
                                              { s: "Asthénie, Insomnie, Léthargie, Somnolence", t: "Repos" },
                                              { s: "Malaises, Vertiges", t: "Repos, sérum salé isotonique" },
                                              { s: "Diarrhées, Nausées, Vomissements", t: "Métoclopramide, SRO, (si besoin: Ringer, SSI)" },
                                              { s: "Abcès collecté au point d’injection", t: "Incision, cloxacilline ou amoxicilline" },
                                              { s: "Convulsions", t: "Diazépam, surveillance" },
                                              { s: "Lymphadénopathie", t: "Diclofénac + amoxicilline" }
                                            ].map((row, i) => (
                                              <tr key={i} className="hover:bg-slate-50 transition-colors">
                                                <td className="p-4 font-medium text-slate-600 leading-tight">{row.s}</td>
                                                <td className="p-4 font-bold text-blue-600">{row.t}</td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  )}

                                  {subSubItem === "Gestion des cas graves" && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      {[
                                        { title: "ALERTER", desc: "Appeler par téléphone le superviseur d’équipe et le MCD", color: "text-red-600", bg: "bg-red-50" },
                                        { title: "STABILISER", desc: "Maîtriser et suivre la tension, le pouls, la fréquence cardiaque et la température", color: "text-green-600", bg: "bg-green-50" },
                                        { title: "REFERER", desc: "Appeler l’hôpital de référence et envoyer le malade dans le service apprêté. Demander une ambulance.", color: "text-blue-600", bg: "bg-blue-50" },
                                        { title: "NOTIFIER", desc: "Remplir une fiche de notification et la remettre au superviseur pour le MCD", color: "text-purple-600", bg: "bg-purple-50" }
                                      ].map(item => (
                                        <div key={item.title} className={cn("p-6 rounded-3xl border border-transparent shadow-sm", item.bg)}>
                                          <h5 className={cn("font-black text-xl mb-3 tracking-tighter", item.color)}>{item.title}</h5>
                                          <p className="text-slate-700 font-medium text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}

                        {subItem === "En intervention" && (
                          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-100/50">
                            <ul className="space-y-4 text-slate-700">
                              <li className="flex gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                                <p>Toujours prévoir le kit d'urgence incluant l'adrénaline.</p>
                              </li>
                              <li className="flex gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                                <p>Laisser les personnes vaccinées trainer 25 min sur le site de vaccination avant de les laisser partir.</p>
                              </li>
                              <li className="flex gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                                <p>Se familiariser avec les recommandations d'usage de l'adrénaline et avec les situations à ne pas confondre avec le choc anaphylactique.</p>
                              </li>
                            </ul>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                ) : selectedItem === 'notification' ? (
                  <AnimatePresence mode="wait">
                    {!subItem ? (
                      <motion.div 
                        key="notif-actions"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-3 gap-2 md:gap-4"
                      >
                        <button 
                          onClick={() => {
                            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                            if (isMobile) {
                              // Attempt to open ODK Collect
                              // Standard ODK intent or URI scheme
                              window.location.href = "odk-collect://form?formId=1PHARMACOVIGILANCE-";
                              // Fallback to URL if app not installed/supported
                              setTimeout(() => {
                                window.open("https://enketo.whonghub.org/x/OEbr16Zr", "_blank");
                              }, 500);
                            } else {
                              window.open("https://enketo.whonghub.org/x/OEbr16Zr", "_blank");
                            }
                          }}
                          className="p-4 md:p-8 rounded-2xl md:rounded-3xl bg-white border border-emerald-100 shadow-sm flex flex-col items-center justify-center gap-2 md:gap-4 group hover:border-emerald-500 transition-all hover:bg-emerald-50/50"
                        >
                          <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                            <Send size={24} className="md:w-8 md:h-8" />
                          </div>
                          <span className="font-bold text-emerald-700 text-[10px] md:text-lg text-center leading-tight">Notifier un cas</span>
                        </button>

                        <button 
                          onClick={() => setSubItem("workflow")}
                          className="p-4 md:p-8 rounded-2xl md:rounded-3xl bg-white border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-2 md:gap-4 group hover:border-blue-500 transition-all hover:bg-blue-50/50"
                        >
                          <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                            <FileSearch size={24} className="md:w-8 md:h-8" />
                          </div>
                          <span className="font-bold text-blue-700 text-[10px] md:text-base text-center leading-tight">Actions & Rôles</span>
                        </button>

                        <button 
                          onClick={() => setSubItem("circuit")}
                          className="p-4 md:p-8 rounded-2xl md:rounded-3xl bg-white border border-purple-100 shadow-sm flex flex-col items-center justify-center gap-2 md:gap-4 group hover:border-purple-500 transition-all hover:bg-purple-50/50"
                        >
                          <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-purple-500 flex items-center justify-center text-white shadow-lg shadow-purple-200">
                            <AlertTriangle size={24} className="md:w-8 md:h-8" />
                          </div>
                          <span className="font-bold text-purple-700 text-[10px] md:text-base text-center leading-tight">Circuit de notification</span>
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key={subItem}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                         {subItem === "workflow" ? (
                           <div className="space-y-4">
                             {[
                               { 
                                 role: "Formation sanitaire", 
                                 actions: ["Rendre les fiches de notification disponibles dans toutes les formations sanitaires et sur les sites de vaccination", "Collecter les notifications"],
                                 color: "emerald"
                               },
                               { 
                                 role: "Point focal district", 
                                 actions: ["Valider la qualité des notifications", "Enregistrer via ODK les notifications dans la base de données nationale"],
                                 color: "blue"
                               },
                               { 
                                 role: "Point focal régional", 
                                 actions: ["Vérifier que chaque notification est saisie dans ODK collect", "Comparer le contenu de la notification reçue du district et de la linelist reçue du national"],
                                 color: "indigo"
                               },
                               { 
                                 role: "Point focal national", 
                                 actions: ["Compléter les informations saisies dans ODK collect", "Transférer dans VigiFlow"],
                                 color: "purple"
                               }
                             ].map(item => (
                               <div key={item.role} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                                 <div className={`px-4 py-2 bg-${item.color}-500 text-white text-xs font-black uppercase tracking-widest`}>
                                   {item.role}
                                 </div>
                                 <div className="p-4 space-y-2">
                                   {item.actions.map((act, i) => (
                                     <div key={i} className="flex gap-3 items-start">
                                       <div className={`w-1.5 h-1.5 rounded-full bg-${item.color}-500 mt-1.5 shrink-0`} />
                                       <p className="text-sm text-slate-600 font-medium leading-relaxed">{act}</p>
                                     </div>
                                   ))}
                                 </div>
                               </div>
                             ))}
                           </div>
                         ) : (
                           <div className="bg-white p-2 md:p-4 rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex items-center justify-center min-h-[400px]">
                             <img 
                               src="/notif.png" 
                               alt="Circuit National de Notification des MAPIs" 
                               className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
                               onError={(e) => {
                                 const target = e.target as HTMLImageElement;
                                 target.style.display = 'none';
                                 const parent = target.parentElement;
                                 if (parent) {
                                   const fallback = document.createElement('div');
                                   fallback.className = 'p-12 text-center text-slate-400 font-medium italic';
                                   fallback.innerText = 'Image notif.png non disponible. Veuillez vérifier qu\'elle est bien à la racine du projet.';
                                   parent.appendChild(fallback);
                                 }
                               }}
                             />
                           </div>
                         )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                ) : selectedItem === 'investigation' ? (
                  <AnimatePresence mode="wait">
                    {!subItem ? (
                      <motion.div 
                        key="investigation-nav"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-2 gap-3 md:gap-4"
                      >
                        <button 
                          onClick={() => setSubItem("actions-roles")}
                          className="p-4 md:p-8 rounded-2xl md:rounded-3xl bg-white border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-3 md:gap-4 group hover:border-violet-500 transition-all hover:bg-violet-50/50"
                        >
                          <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-violet-500 flex items-center justify-center text-white shadow-lg">
                            <Users size={24} className="md:w-8 md:h-8" />
                          </div>
                          <span className="font-bold text-slate-700 text-[10px] md:text-sm text-center leading-tight">Actions & Rôles</span>
                        </button>

                        <button 
                          onClick={() => window.open("https://enketo.whonghub.org/x/5CgIiekT", "_blank")}
                          className="p-4 md:p-8 rounded-2xl md:rounded-3xl bg-white border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-3 md:gap-4 group hover:border-emerald-500 transition-all hover:bg-emerald-50/50"
                        >
                          <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg">
                            <FileSearch size={24} className="md:w-8 md:h-8" />
                          </div>
                          <span className="font-bold text-slate-700 text-[10px] md:text-sm text-center leading-tight">Formulaire d'investigation</span>
                        </button>

                        <button 
                          onClick={() => setSubItem("pec-hopital")}
                          className="p-4 md:p-8 rounded-2xl md:rounded-3xl bg-white border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-3 md:gap-4 group hover:border-blue-500 transition-all hover:bg-blue-50/50"
                        >
                          <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-blue-500 flex items-center justify-center text-white shadow-lg">
                            <Building2 size={24} className="md:w-8 md:h-8" />
                          </div>
                          <span className="font-bold text-slate-700 text-[10px] md:text-sm text-center leading-tight">PEC à l'hôpital de référence</span>
                        </button>

                        <button 
                          onClick={() => setSubItem("prelevements-aliquotes")}
                          className="p-4 md:p-8 rounded-2xl md:rounded-3xl bg-white border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-3 md:gap-4 group hover:border-amber-500 transition-all hover:bg-amber-50/50"
                        >
                          <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-lg">
                            <Stethoscope size={24} className="md:w-8 md:h-8" />
                          </div>
                          <span className="font-bold text-slate-700 text-[10px] md:text-sm text-center leading-tight">Prélèvements & aliquotes</span>
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key={subItem}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                         <button 
                           onClick={() => { setSubItem(null); setSubSubItem(null); }}
                           className="flex items-center gap-2 text-violet-600 font-bold text-sm mb-4 bg-violet-50 px-4 py-2 rounded-xl"
                         >
                           <ChevronLeft size={20} />
                           Retour à Investigation
                         </button>

                         {subItem === "actions-roles" && (
                           <div className="space-y-4">
                             {[
                               { 
                                 role: "Formation sanitaire", 
                                 actions: ["Générer l’alerte si MAPI grave", "Organiser la référence du patient à l’hôpital tertiaire"],
                                 color: "emerald"
                               },
                               { 
                                 role: "Point focal district", 
                                 actions: ["Relayer l’alerte au point focal de région et au directeur du district sanitaire", "Appeler le patient ou ses accompagnants pour faire le suivi du transfert à l’hôpital de référence"],
                                 color: "blue"
                               },
                               { 
                                 role: "Point focal régional", 
                                 actions: [
                                   "Relayer l'alerte à l'équipe nationale et au DRS", 
                                   "Appeler l’hôpital de référence pour alerter le service d’accueil, apprêter le lit et initier le processus d’admission",
                                   "Suivre le remplissage correct du dossier médical en cours d’hospitalisation, y compris la réalisation et l’envoi des résultats d’analyses et scanner le dossier"
                                 ],
                                 color: "indigo"
                               },
                               { 
                                 role: "Point focal national", 
                                 actions: [
                                   "Rédiger le résumé des cas à partir du dossier médical pour présentation au comité d’experts", 
                                   "Importer le cas dans Vigilogos", 
                                   "Faire la revue de littérature complémentaires",
                                   "Organiser les réunions du comité d’experts et en tenir la mémoire écrite"
                                 ],
                                 color: "purple"
                               }
                             ].map(item => (
                               <div key={item.role} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                                 <div className={`px-4 py-2 bg-${item.color}-500 text-white text-xs font-black uppercase tracking-widest`}>
                                   {item.role}
                                 </div>
                                 <div className="p-4 space-y-2">
                                   {item.actions.map((act, i) => (
                                     <div key={i} className="flex gap-3 items-start">
                                       <div className={`w-1.5 h-1.5 rounded-full bg-${item.color}-500 mt-1.5 shrink-0`} />
                                       <p className="text-sm text-slate-600 font-medium leading-relaxed">{act}</p>
                                     </div>
                                   ))}
                                 </div>
                               </div>
                             ))}
                           </div>
                         )}

                         {subItem === "pec-hopital" && (
                           <div className="space-y-6">
                             <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-2xl">
                               <p className="text-sm text-blue-700 leading-relaxed italic">
                                 "La détection de MAPI relève de la suspicion alors que le diagnostic de MAPI est un diagnostic d’exclusion ; ayant recherché toutes les étiologies possibles, rien d’autre que la MAPI n’a pu justifier l’état clinique du patient. Faire un diagnostic argumenté, détaillé et minutieux et le documenter au fur et à mesure sur le dossier clinique du malade."
                               </p>
                             </div>

                             <div className="grid grid-cols-1 gap-4">
                               {PEC_CASES.map((pec) => (
                                 <div key={pec.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                                   <button 
                                     onClick={() => setSubSubItem(subSubItem === pec.id ? null : pec.id)}
                                     className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                                   >
                                     <span className="font-bold text-slate-700">{pec.title}</span>
                                     <ChevronLeft className={`transition-transform duration-300 ${subSubItem === pec.id ? '-rotate-90' : 'rotate-180'} text-slate-400`} size={20} />
                                   </button>
                                   
                                   <AnimatePresence>
                                     {subSubItem === pec.id && (
                                       <motion.div
                                         initial={{ height: 0, opacity: 0 }}
                                         animate={{ height: "auto", opacity: 1 }}
                                         exit={{ height: 0, opacity: 0 }}
                                         transition={{ duration: 0.3 }}
                                       >
                                         <div className="px-6 pb-6 pt-2 space-y-4 border-t border-slate-50">
                                           <div>
                                             <h5 className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Définition de cas</h5>
                                             <p className="text-sm text-slate-600 leading-relaxed">{pec.definition}</p>
                                           </div>
                                           <div>
                                             <h5 className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">Éléments diagnostiques</h5>
                                             <p className="text-sm text-slate-600 leading-relaxed">{pec.diagnostics}</p>
                                           </div>
                                           <div>
                                             <h5 className="text-[10px] font-black uppercase tracking-widest text-violet-600 mb-1">Diagnostic différentiel / Prise en charge</h5>
                                             <p className="text-sm text-slate-600 leading-relaxed">{pec.treatment}</p>
                                           </div>
                                         </div>
                                       </motion.div>
                                     )}
                                   </AnimatePresence>
                                 </div>
                               ))}
                             </div>
                           </div>
                         )}

                         {subItem === "prelevements-aliquotes" && (
                           <div className="space-y-8">
                             <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                               <div className="p-1 bg-slate-100 flex gap-1">
                                  {["Guidelines Labo", "Protocole Envoi"].map(tab => (
                                    <button 
                                      key={tab}
                                      onClick={() => setSubSubItem(tab)}
                                      className={`flex-1 py-3 px-4 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all ${subSubItem === tab || (!subSubItem && tab === "Guidelines Labo") ? 'bg-white text-violet-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                      {tab}
                                    </button>
                                  ))}
                               </div>

                               <div className="p-6">
                                  {(subSubItem === "Guidelines Labo" || !subSubItem) && (
                                    <div className="w-full h-full">
                                      <iframe 
                                        src="/labo.pdf" 
                                        className="w-full h-[700px] border-0 bg-white rounded-2xl shadow-sm hide-scrollbar"
                                        title="Directives Laboratoire"
                                      />
                                    </div>
                                  )}

                                  {subSubItem === "Protocole Envoi" && (
                                    <div className="space-y-8">
                                      {/* AUTOPSIE */}
                                      <section className="space-y-4">
                                        <div className="flex items-center gap-3">
                                          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs italic">!</div>
                                          <h5 className="font-black text-red-600 uppercase tracking-tight">En cas de décès {"->"} AUTOPSIE</h5>
                                        </div>
                                        <div className="bg-red-50 p-4 rounded-2xl border border-red-100 text-xs font-bold text-red-800 italic uppercase tracking-wider text-center">
                                          Ne pas mettre de formol avant le prélèvement
                                        </div>
                                        <ul className="space-y-2 pl-4">
                                          {[
                                            "Procéder à une ponction cardiaque sur tube EDTA et sur tube sec",
                                            "Alerter le point focal MAPI de département, le DDS et le Comité national des experts MAPI",
                                            "Expliquer le bien-fondé de l’autopsie et requérir l’assentiment du tuteur légal du défunt",
                                            "Informer avec le tact requis, le tuteur légal des dispositions relatives à une autopsie",
                                            "Faire signer la fiche de consentement d’autopsie en double exemplaire",
                                            "Alerter immédiatement le médecin chargé de l’autopsie",
                                            "En cas de refus de l’autopsie, proposer une biopsie d’organes"
                                          ].map((text, i) => (
                                            <li key={i} className="flex gap-3 text-[11px] text-slate-600 leading-relaxed font-medium">
                                              <span className="text-red-400 font-black">{i + 1}.</span>
                                              {text}
                                            </li>
                                          ))}
                                        </ul>
                                      </section>

                                      <div className="h-px bg-slate-100" />

                                      {/* EMBALLAGE */}
                                      <section className="space-y-4">
                                        <div className="flex items-center gap-3">
                                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><Smartphone size={16} /></div>
                                          <h5 className="font-black text-blue-600 uppercase tracking-tight text-sm">Emballage et envoi</h5>
                                        </div>
                                        <ul className="space-y-2 pl-4">
                                          {[
                                            "Ranger dans une pochette transparente les échantillons de même type (AC-SRM, CV-SRM, SNG, LCR, URN)",
                                            "Inscrire sur chaque pochette le code patient et le code échantillon",
                                            "Mettre les pochettes dans un porte-vaccin avec 2 accumulateurs bien congelés",
                                            "Mettre une copie de la fiche d’examens biologiques complètement remplie dans un sachet plastique",
                                            "Remplir la fiche de transport d’échantillon",
                                            "Sceller le porte-vaccin et le remettre au transporteur avec la fiche de transport contresignée",
                                            "Communiquer au PF Labo National : références véhicule, conducteur et heure probable d’arrivée"
                                          ].map((text, i) => (
                                            <li key={i} className="flex gap-3 text-[11px] text-slate-600 leading-relaxed font-medium">
                                              <span className="text-blue-400 font-black">{i + 1}.</span>
                                              {text}
                                            </li>
                                          ))}
                                        </ul>
                                      </section>

                                      <div className="h-px bg-slate-100" />

                                      {/* RECEPTION */}
                                      <section className="space-y-4">
                                        <div className="flex items-center gap-3">
                                          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"><CheckCircle2 size={16} /></div>
                                          <h5 className="font-black text-emerald-600 uppercase tracking-tight text-sm">Réception (Labo National)</h5>
                                        </div>
                                        <div className="space-y-4">
                                          <div className="flex gap-3 text-[11px] text-slate-600 font-medium">
                                            <span className="text-emerald-400 font-black">1.</span>
                                            Faire le suivi jusqu’à la réception
                                          </div>
                                          <div className="flex gap-3 text-[11px] text-slate-600 font-medium">
                                            <span className="text-emerald-400 font-black">2.</span>
                                            <div className="space-y-2">
                                              <p>Au laboratoire :</p>
                                              <div className="grid grid-cols-1 gap-2 pl-4">
                                                <div className="bg-slate-50 p-2 rounded-lg text-[10px] font-bold">2a. Remplir la partie grisée de la fiche</div>
                                                <div className="bg-slate-50 p-2 rounded-lg text-[10px] font-bold">2b. Retirer les aliquots nécessaires</div>
                                                <div className="bg-slate-50 p-2 rounded-lg text-[10px] font-bold">2c. Remplir la fiche de stockage</div>
                                                <div className="bg-slate-50 p-2 rounded-lg text-[10px] font-bold">2d. Stockage : SNG (+4°C) / Autres (-80°C)</div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="flex gap-3 text-[11px] text-slate-600 font-medium">
                                            <span className="text-emerald-400 font-black">3.</span>
                                            Adresser les résultats au clinicien de l’hôpital de référence et à l’équipe nationale MAPI
                                          </div>
                                        </div>
                                      </section>
                                    </div>
                                  )}
                               </div>
                             </div>
                           </div>
                         )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                ) : selectedItem === 'analyses' ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                      <button 
                        className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-3 md:gap-4 group hover:border-indigo-500 transition-all hover:bg-indigo-50/50"
                      >
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-indigo-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                          <TrendingUp size={24} className="md:w-8 md:h-8" />
                        </div>
                        <span className="font-bold text-slate-700 text-xs md:text-lg">Analyse de performance</span>
                      </button>

                      <button 
                        className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-3 md:gap-4 group hover:border-indigo-500 transition-all hover:bg-indigo-50/50"
                      >
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-indigo-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                          <Activity size={24} className="md:w-8 md:h-8" />
                        </div>
                        <span className="font-bold text-slate-700 text-xs md:text-lg">Détection des signaux</span>
                      </button>
                    </div>
                  </motion.div>
                ) : selectedItem === 'signalement' ? null : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                        <h4 className="font-bold text-sm mb-2 uppercase tracking-wide text-slate-400">Actions Rapides</h4>
                        <div className="space-y-3">
                          {[1, 2, 3].map(n => (
                            <div key={n} className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-100 cursor-pointer hover:border-blue-200 transition-colors">
                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                                <span className="text-sm font-medium text-slate-700">Procédure Opérationnelle {n}</span>
                            </div>
                          ))}
                        </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                        <h4 className="font-bold text-sm mb-2 uppercase tracking-wide text-slate-400">Ressources</h4>
                        <div className="space-y-3">
                          {['Guide OMS', 'Directives EMA', 'Formulaires'].map(r => (
                            <div key={r} className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border border-slate-100 cursor-pointer hover:border-blue-200 transition-colors">
                                <span className="text-sm font-medium text-slate-700">{r}</span>
                                <ChevronLeft className="rotate-180 text-slate-300" size={16} />
                            </div>
                          ))}
                        </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation Bar (Mobile App Style) */}
      <nav className="fixed bottom-0 inset-x-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 px-6 py-4 pb-8 z-50 flex justify-between items-center shadow-[0_-10px_25px_rgba(0,0,0,0.05)]">
        {[
          { id: 'home', icon: Smartphone, label: 'Accueil' },
          { id: 'stats', icon: BarChart3, label: 'Stats' },
          { id: 'alerts', icon: AlertTriangle, label: 'Alertes' },
          { id: 'more', icon: Users, label: 'Équipe' }
        ].map((nav) => (
          <button 
            key={nav.id}
            onClick={() => nav.id === 'home' && setSelectedItem(null)}
            className={cn(
              "flex flex-col items-center gap-1 transition-all duration-300",
              (nav.id === 'home' && !selectedItem) ? "text-blue-600 scale-110" : "text-slate-400 opacity-70 hover:opacity-100"
            )}
          >
            <nav.icon size={22} strokeWidth={nav.id === 'home' && !selectedItem ? 2.5 : 2} />
            <span className="text-[9px] font-black uppercase tracking-widest">{nav.label}</span>
          </button>
        ))}
      </nav>

      {/* Floating Action Button (Mobile style) */}
      {!selectedItem && (
        <motion.button 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-28 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-xl shadow-blue-200 flex items-center justify-center z-40"
        >
          <AlertTriangle size={24} />
        </motion.button>
      )}

      {/* Footer Info (Hidden) */}
      <footer className="hidden">
        <div className="max-w-md mx-auto flex justify-around">
           <div className="text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Version</p>
              <p className="text-sm font-medium">2.4.0-pro</p>
           </div>
           <div className="text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Base de Données</p>
              <p className="text-sm font-medium">VigiBase v2026</p>
           </div>
        </div>
      </footer>
    </div>
  );
}
