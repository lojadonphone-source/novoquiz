import useQuizStore from '@/stores/useQuizStore'
import {
  Step1,
  Step2,
  Step3,
  Step4,
  Step5,
  Step6,
} from '@/components/stages/QuizStages'
import { Step7, Step8, Step9 } from '@/components/stages/LeadStages'
import { Step10 } from '@/components/stages/OfferStage'

export default function Index() {
  const step = useQuizStore((s) => s.step)

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 />
      case 2:
        return <Step2 />
      case 3:
        return <Step3 />
      case 4:
        return <Step4 />
      case 5:
        return <Step5 />
      case 6:
        return <Step6 />
      case 7:
        return <Step7 />
      case 8:
        return <Step8 />
      case 9:
        return <Step9 />
      case 10:
        return <Step10 />
      default:
        return <Step1 />
    }
  }

  return (
    <div className="flex-1 w-full flex flex-col items-center justify-start relative">
      {renderStep()}
    </div>
  )
}
