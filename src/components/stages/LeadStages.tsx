import { useState, useEffect } from 'react'
import useQuizStore from '@/stores/useQuizStore'
import { Button } from '@/components/ui/button'
import { StageWrapper } from '../StageWrapper'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Mail, CheckCircle2, Loader2 } from 'lucide-react'

export function Step7() {
  const {
    name,
    setName,
    whatsapp,
    setWhatsapp,
    email,
    setEmail,
    nextStep,
    generateDiagnostic,
  } = useQuizStore()
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || name.trim().length < 2) {
      setError('Por favor, insira seu nome.')
      return
    }

    if (!whatsapp || whatsapp.replace(/\D/g, '').length < 10) {
      setError('Por favor, insira um WhatsApp válido.')
      return
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Por favor, insira um email válido.')
      return
    }

    setError('')

    generateDiagnostic()

    const currentProfile = useQuizStore.getState().diagnosticProfile

    fetch('https://hook.us2.make.com/tlez1ux92rwnsbnt5qt91unhl67i71gq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        whatsapp,
        email,
        diagnosticProfile: currentProfile,
      }),
    }).catch((err) => console.error('Erro ao enviar dados do lead:', err))

    nextStep()
  }

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 11) value = value.slice(0, 11)

    if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`
    }
    if (value.length > 10) {
      value = `${value.slice(0, 10)}-${value.slice(10)}`
    }

    setWhatsapp(value)
  }

  return (
    <StageWrapper className="justify-center min-h-[70vh]">
      <div className="text-center mb-8">
        <Mail className="w-16 h-16 mx-auto mb-6 text-primary" />
        <h2 className="text-2xl md:text-3xl font-black mb-4 leading-tight">
          Estamos gerando o diagnóstico personalizado do seu filho…
        </h2>
        <p className="text-lg text-muted-foreground font-medium mb-2">
          Informe seus dados para receber o resultado completo e as
          recomendações.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-3">
          <Input
            type="text"
            placeholder="👤 Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-14 text-lg border-2 border-black focus-visible:ring-primary focus-visible:ring-offset-0 rounded-xl bg-white text-black"
          />
          <Input
            type="tel"
            placeholder="📱 Seu WhatsApp"
            value={whatsapp}
            onChange={handleWhatsappChange}
            className="h-14 text-lg border-2 border-black focus-visible:ring-primary focus-visible:ring-offset-0 rounded-xl bg-white text-black"
          />
          <Input
            type="email"
            placeholder="📩 Seu melhor e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-14 text-lg border-2 border-black focus-visible:ring-primary focus-visible:ring-offset-0 rounded-xl bg-white text-black"
          />
        </div>

        <p className="text-muted-foreground font-medium text-center text-sm my-2 flex items-center justify-center gap-1">
          <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Seu
          diagnóstico será enviado gratuitamente. Seus dados estão protegidos.
        </p>

        {error && (
          <p className="text-destructive text-sm font-bold text-center">
            {error}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          className="w-full h-16 text-lg uppercase mt-2 whitespace-normal leading-tight"
        >
          VER MEU DIAGNÓSTICO PERSONALIZADO
        </Button>
      </form>
    </StageWrapper>
  )
}

export function Step8() {
  const nextStep = useQuizStore((s) => s.nextStep)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const duration = 3000
    const intervalTime = 50
    const steps = duration / intervalTime
    let currentStep = 0

    const interval = setInterval(() => {
      currentStep++
      setProgress(Math.min((currentStep / steps) * 100, 100))
      if (currentStep >= steps) {
        clearInterval(interval)
        nextStep()
      }
    }, intervalTime)

    return () => clearInterval(interval)
  }, [nextStep])

  return (
    <StageWrapper className="justify-center items-center text-center min-h-[70vh]">
      <Loader2 className="w-16 h-16 mx-auto mb-6 text-primary animate-spin" />
      <h2 className="text-xl md:text-2xl font-black mb-8 leading-relaxed max-w-sm animate-pulse">
        🔎 Cruzando suas respostas com nosso modelo de desenvolvimento criativo
        infantil…
      </h2>
      <div className="w-full max-w-md bg-secondary/30 p-4 rounded-xl border-2 border-black">
        <Progress value={progress} className="h-4 w-full border border-black" />
        <p className="text-sm font-bold mt-3 text-muted-foreground">
          Calculando diagnóstico personalizado...
        </p>
      </div>
    </StageWrapper>
  )
}

export function Step9() {
  const { nextStep, diagnosticProfile } = useQuizStore()

  const diagnostics = {
    CONSUMIDOR_PASSIVO: {
      headline: 'Perfil Digital: Consumidor Passivo',
      body: 'Seu filho tem curiosidade natural, mas está usando a tecnologia mais para entretenimento do que para desenvolvimento. Se continuar apenas consumindo conteúdo, pode perder anos importantes de estímulo criativo e cognitivo. Mas a boa notícia: Com direcionamento correto, ele pode se tornar criador em poucas semanas.',
      bullets: [
        'Precisa de estímulo estruturado',
        'Alto potencial criativo adormecido',
        'Fase ideal para mudança',
      ],
      button: 'QUERO TRANSFORMAR ISSO',
    },
    EXPLORADOR_CRIATIVO: {
      headline: 'Perfil Digital: Explorador Criativo',
      body: 'Seu filho já demonstra sinais de criatividade e curiosidade tecnológica. Ele precisa apenas de método e orientação para transformar essa curiosidade em habilidade real.',
      bullets: [
        'Potencial acima da média',
        'Aprende rápido quando estimulado',
        'Pode avançar muito com direcionamento',
      ],
      button: 'QUERO DESENVOLVER ESSE POTENCIAL',
    },
    CRIADOR_EM_POTENCIAL: {
      headline: 'Perfil Digital: Criador em Potencial',
      body: 'Seu filho já demonstra comportamento de criador. Com ferramentas corretas, pode desenvolver projetos reais e construir habilidades que poucas crianças dominam hoje.',
      bullets: [
        'Forte capacidade de autonomia',
        'Alto engajamento criativo',
        'Momento ideal para acelerar desenvolvimento',
      ],
      button: 'QUERO ACELERAR ESSE DESENVOLVIMENTO',
    },
  }

  const content = diagnostics[diagnosticProfile || 'CONSUMIDOR_PASSIVO']

  return (
    <StageWrapper>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-black leading-tight text-primary uppercase tracking-wide mb-2">
          {content.headline}
        </h2>
      </div>

      <p className="text-lg font-medium leading-relaxed mb-8 border-2 border-black p-5 rounded-xl shadow-[4px_4px_0px_0px_#000]">
        {content.body}
      </p>

      <ul className="space-y-4 mb-10">
        {content.bullets.map((item, i) => (
          <li key={i} className="flex items-center gap-3 font-bold text-lg">
            <CheckCircle2 className="text-primary w-6 h-6 shrink-0" />
            {item}
          </li>
        ))}
      </ul>

      <Button
        onClick={nextStep}
        size="lg"
        className="w-full h-auto min-h-16 py-3 text-sm sm:text-base md:text-lg uppercase whitespace-normal text-center leading-tight animate-pulse-scale"
      >
        {content.button}
      </Button>
    </StageWrapper>
  )
}
