import useQuizStore from '@/stores/useQuizStore'
import { Button } from '@/components/ui/button'
import { StageWrapper } from '../StageWrapper'
import { CheckCircle2 } from 'lucide-react'

export function Step1() {
  const nextStep = useQuizStore((s) => s.nextStep)

  return (
    <StageWrapper className="justify-center min-h-[70vh] text-center px-4">
      <div className="w-full max-w-md mx-auto mb-8 rounded-xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_#000]">
        <img
          src="https://i.ibb.co/C3snVRjv/01.png"
          alt="01"
          className="w-full h-auto object-cover max-w-full mx-auto"
        />
      </div>
      <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
        Seu filho está só consumindo tecnologia… ou desenvolvendo habilidades
        para o futuro?
      </h1>
      <p className="text-lg text-muted-foreground font-medium mb-8">
        Responda 4 perguntas rápidas e descubra o perfil digital do seu filho na
        era da Inteligência Artificial.
      </p>

      <Button
        onClick={nextStep}
        size="lg"
        className="w-full h-16 text-lg uppercase whitespace-normal leading-tight"
      >
        CONTINUAR
      </Button>
    </StageWrapper>
  )
}

export function Step2() {
  const nextStep = useQuizStore((s) => s.nextStep)

  return (
    <StageWrapper className="justify-center min-h-[70vh] text-center px-4">
      <div className="w-full max-w-md mx-auto mb-6 rounded-xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_#000]">
        <img
          src="https://i.ibb.co/Pvynsn9M/Chat-GPT-Image-25-de-fev-de-2026-08-56-01.png"
          alt="Diferença digital"
          className="w-full h-auto object-cover max-w-full mx-auto"
        />
      </div>
      <p className="text-lg font-bold leading-relaxed mb-6 bg-secondary/30 p-4 border-2 border-black rounded-xl">
        A diferença entre crianças comuns e criadores digitais começa cedo.
        Enquanto algumas apenas consomem tecnologia… Outras aprendem a
        dominá-la.
      </p>

      <div className="flex flex-col gap-3 mb-8 text-left max-w-md mx-auto">
        <div className="flex items-center gap-3 font-bold">
          <CheckCircle2 className="text-primary w-6 h-6 shrink-0" />
          Baseado em princípios de desenvolvimento cognitivo infantil
        </div>
        <div className="flex items-center gap-3 font-bold">
          <CheckCircle2 className="text-primary w-6 h-6 shrink-0" />
          Leva menos de 1 minuto
        </div>
        <div className="flex items-center gap-3 font-bold">
          <CheckCircle2 className="text-primary w-6 h-6 shrink-0" />
          Resultado personalizado
        </div>
      </div>

      <Button
        onClick={nextStep}
        size="lg"
        className="w-full h-16 text-lg uppercase whitespace-normal leading-tight"
      >
        QUERO DESCOBRIR O PERFIL DO MEU FILHO
      </Button>
    </StageWrapper>
  )
}

function QuestionStage({
  step,
  question,
  options,
}: {
  step: number
  question: string
  options: string[]
}) {
  const { answers, setAnswer, nextStep } = useQuizStore()

  const handleSelect = (opt: string) => {
    setAnswer(step, opt)
    setTimeout(nextStep, 300)
  }

  return (
    <StageWrapper>
      <div className="mb-8 mt-4">
        <span className="text-primary font-bold tracking-widest text-sm uppercase">
          Pergunta {step - 2} de 4
        </span>
        <h2 className="text-2xl md:text-3xl font-black mt-2 leading-tight">
          {question}
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleSelect(opt)}
            className={`text-left p-5 rounded-xl border-2 font-bold text-lg transition-all ${
              answers[step] === opt
                ? 'bg-primary text-primary-foreground border-black shadow-[4px_4px_0px_0px_#000]'
                : 'bg-white border-black hover:shadow-[4px_4px_0px_0px_#000]'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </StageWrapper>
  )
}

export function Step3() {
  return (
    <QuestionStage
      step={3}
      question="Seu filho passa mais de 2 horas por dia em telas?"
      options={['Sim, diariamente', 'Às vezes', 'Não']}
    />
  )
}

export function Step4() {
  return (
    <QuestionStage
      step={4}
      question="Quando está no celular, ele mais:"
      options={[
        'Assiste vídeos e joga',
        'Explora ideias e cria algo',
        'Um pouco dos dois',
      ]}
    />
  )
}

export function Step5() {
  return (
    <QuestionStage
      step={5}
      question="Ele já criou algo digital sozinho?"
      options={[
        'Sim, já criou histórias, desenhos ou jogos',
        'Tentou, mas precisa de ajuda',
        'Nunca teve orientação',
      ]}
    />
  )
}

export function Step6() {
  return (
    <QuestionStage
      step={6}
      question="Você gostaria que ele aprendesse tecnologia de forma estruturada?"
      options={[
        'Sim, é prioridade',
        'Sim, mas não sei por onde começar',
        'Nunca pensei nisso',
      ]}
    />
  )
}
