import { create } from 'zustand'

export type DiagnosticProfile =
  | 'CONSUMIDOR_PASSIVO'
  | 'EXPLORADOR_CRIATIVO'
  | 'CRIADOR_EM_POTENCIAL'

interface QuizState {
  step: number
  answers: Record<number, string>
  name: string
  whatsapp: string
  email: string
  diagnosticProfile: DiagnosticProfile | null
  setStep: (step: number) => void
  nextStep: () => void
  setAnswer: (step: number, answer: string) => void
  setName: (name: string) => void
  setWhatsapp: (whatsapp: string) => void
  setEmail: (email: string) => void
  generateDiagnostic: () => void
  reset: () => void
}

const getPoints = (step: number, answer: string) => {
  if (step === 3) {
    if (answer === 'Sim, diariamente') return 1
    if (answer === 'Às vezes') return 2
    if (answer === 'Não') return 3
  }
  if (step === 4) {
    if (answer === 'Assiste vídeos e joga') return 1
    if (answer === 'Um pouco dos dois') return 2
    if (answer === 'Explora ideias e cria algo') return 3
  }
  if (step === 5) {
    if (answer === 'Nunca teve orientação') return 1
    if (answer === 'Tentou, mas precisa de ajuda') return 2
    if (answer === 'Sim, já criou histórias, desenhos ou jogos') return 3
  }
  if (step === 6) {
    if (answer === 'Nunca pensei nisso') return 1
    if (answer === 'Sim, mas não sei por onde começar') return 2
    if (answer === 'Sim, é prioridade') return 3
  }
  return 1
}

const useQuizStore = create<QuizState>((set, get) => ({
  step: 1,
  answers: {},
  name: '',
  whatsapp: '',
  email: '',
  diagnosticProfile: null,
  setStep: (step) => set({ step }),
  nextStep: () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    set((state) => ({ step: Math.min(10, state.step + 1) }))
  },
  setAnswer: (step, answer) =>
    set((state) => ({ answers: { ...state.answers, [step]: answer } })),
  setName: (name) => set({ name }),
  setWhatsapp: (whatsapp) => set({ whatsapp }),
  setEmail: (email) => set({ email }),
  generateDiagnostic: () => {
    const { answers } = get()
    let totalPoints = 0

    Object.entries(answers).forEach(([stepStr, answer]) => {
      totalPoints += getPoints(Number(stepStr), answer)
    })

    let profile: DiagnosticProfile = 'CONSUMIDOR_PASSIVO'
    if (totalPoints >= 7 && totalPoints <= 9) profile = 'EXPLORADOR_CRIATIVO'
    if (totalPoints >= 10) profile = 'CRIADOR_EM_POTENCIAL'

    set({ diagnosticProfile: profile })
  },
  reset: () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    set({
      step: 1,
      answers: {},
      name: '',
      whatsapp: '',
      email: '',
      diagnosticProfile: null,
    })
  },
}))

export default useQuizStore
