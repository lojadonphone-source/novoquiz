import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { NavigationProgress } from '@/components/NavigationProgress'
import useQuizStore from '@/stores/useQuizStore'
import { trackPageView } from '@/lib/meta-pixel'

export default function Layout() {
  const step = useQuizStore((s) => s.step)
  const location = useLocation()

  // Track PageView on step change
  useEffect(() => {
    const stepUrl = `${window.location.origin}${location.pathname}?step=${step}`
    trackPageView(stepUrl)
  }, [step, location.pathname])

  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground bg-white selection:bg-primary/20">
      <NavigationProgress />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {step >= 9 && (
        <footer className="w-full border-t-2 border-black bg-secondary mt-auto">
          <div className="max-w-[600px] mx-auto p-6 text-center text-sm font-bold text-muted-foreground flex flex-col gap-2">
            <p>
              © {new Date().getFullYear()} IA Criativa. Todos os direitos
              reservados.
            </p>
            <div className="flex justify-center gap-4">
              <a href="#" className="hover:text-primary transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Suporte
              </a>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}
