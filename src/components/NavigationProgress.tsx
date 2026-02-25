import { Progress } from '@/components/ui/progress'
import useQuizStore from '@/stores/useQuizStore'

export function NavigationProgress() {
  const step = useQuizStore((s) => s.step)

  if (step > 6) return null

  const progressValue = (step / 6) * 100

  return (
    <div className="sticky top-0 z-50 w-full bg-white border-b-2 border-black shadow-sm">
      <div className="max-w-[600px] mx-auto p-4 flex flex-col gap-2">
        <div className="flex justify-between items-center text-xs font-black text-foreground uppercase tracking-wider">
          <span>Diagnóstico</span>
          <span>{Math.round(progressValue)}%</span>
        </div>
        <Progress
          value={progressValue}
          className="h-2 bg-secondary border border-black"
        />
      </div>
    </div>
  )
}
