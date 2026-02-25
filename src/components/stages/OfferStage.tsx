import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { StageWrapper } from '../StageWrapper'
import { CheckCircle, ShieldCheck } from 'lucide-react'

const buyers = [
  'Mariana L.',
  'Pedro S.',
  'Ana M.',
  'Ricardo F.',
  'Juliana C.',
  'Lucas B.',
  'Fernanda G.',
  'Gabriel R.',
]

function SocialProof() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(true)
      setTimeout(() => {
        setVisible(false)
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % buyers.length)
        }, 500)
      }, 3000)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-80 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_hsl(var(--primary))] p-4 flex items-center gap-3 transition-all duration-500 z-50 ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 text-white">
        <CheckCircle className="w-6 h-6" />
      </div>
      <p className="text-sm font-medium text-foreground leading-tight">
        <span className="font-black text-base">{buyers[index]}</span>
        <br />
        <span className="text-muted-foreground">
          Acabou de comprar o curso!
        </span>
      </p>
    </div>
  )
}

export function Step10() {
  const handleCheckout = () => {
    window.location.href = 'https://pay.hotmart.com/E103583426A?checkoutMode=10'
  }

  const features = [
    '+10 aulas práticas',
    'Projetos desde a primeira semana',
    'Método adaptado para crianças',
    'Certificado',
    'Comunidade supervisionada',
  ]

  return (
    <StageWrapper className="pb-24">
      <div className="bg-secondary/40 p-5 rounded-xl border-2 border-black mb-8 text-center shadow-[4px_4px_0px_0px_#000]">
        <p className="text-lg font-medium leading-relaxed text-foreground">
          Com base nas suas respostas, seu filho precisa de direcionamento
          estruturado para transformar tempo de tela em desenvolvimento real.
          Foi exatamente por isso que criamos o:
        </p>
      </div>

      <div className="w-full max-w-md mx-auto mb-6 rounded-xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_#000]">
        <img
          src="https://i.ibb.co/7thSZMVq/Chat-GPT-Image-23-de-fev-de-2026-08-10-35.png"
          alt="Curso IA Criativa"
          className="w-full h-auto object-cover max-w-full mx-auto"
        />
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-black leading-tight mb-3 text-primary">
          Curso IA Criativa para Crianças (7+ anos)
        </h2>
        <p className="text-xl font-bold">Transforme consumo em criação.</p>
      </div>

      <div className="bg-white border-2 border-black rounded-xl p-6 mb-8 shadow-[4px_4px_0px_0px_#000]">
        <h3 className="font-black text-xl mb-4">O que está incluso:</h3>
        <ul className="space-y-3">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-3 font-medium text-lg">
              <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-0.5" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8 border-2 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_#000]">
        <div className="bg-primary text-primary-foreground p-3 text-center border-b-2 border-black">
          <p className="font-black text-lg animate-pulse">
            ASSISTA ATÉ O FINAL
          </p>
        </div>
        <div className="bg-black p-4 flex justify-center">
          <div className="relative w-full max-w-[300px] aspect-[9/16]">
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/OE0pF7RM-3I"
              title="Projetos de alunos"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="bg-white p-3 text-center border-t-2 border-black">
          <p className="font-bold text-sm">
            Projetos reais criados pelos nossos alunos
          </p>
        </div>
      </div>

      <div className="text-center mb-8">
        <p className="line-through text-muted-foreground text-xl font-bold mb-2">
          Valor real: R$497
        </p>
        <div className="bg-primary text-primary-foreground border-2 border-black inline-block px-8 py-5 rounded-xl shadow-[4px_4px_0px_0px_#000] transform -rotate-2 mb-4">
          <p className="text-lg font-bold">Hoje:</p>
          <p className="text-5xl font-black">R$27</p>
        </div>
        <p className="text-xl font-black mt-4">
          Menos do que um lanche no shopping.
        </p>

        <div className="flex flex-col gap-2 items-center mt-4 text-sm font-bold bg-secondary p-4 rounded-xl border-2 border-black inline-flex">
          <p>✅ Pagamento único</p>
          <p>✅ Sem mensalidade</p>
          <p>✅ 7 dias de garantia total</p>
        </div>

        <div className="mt-6 flex justify-center">
          <p className="text-destructive font-bold text-sm bg-destructive/10 inline-block px-4 py-2 rounded-full border border-destructive text-center">
            ⚠️ Essa condição especial pode sair do ar sem aviso.
          </p>
        </div>
      </div>

      <Button
        onClick={handleCheckout}
        size="lg"
        className="w-full h-20 text-xl md:text-2xl uppercase animate-pulse-scale whitespace-normal leading-tight"
      >
        QUERO GARANTIR POR R$27
      </Button>

      <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm font-bold text-muted-foreground">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-4 h-4" /> Compra segura
        </span>
        <span>•</span>
        <span>Acesso imediato</span>
      </div>

      <SocialProof />
    </StageWrapper>
  )
}
