import { useEffect, useState } from "react"
import { TiTick } from 'react-icons/ti'
import toast, { Toaster } from 'react-hot-toast';


export function Stepper() {
    const steps = ['Customer Info', 'Shipping Info', 'Payment']

    const [currentStep, setCurrentStep] = useState(1)
    const [complete, setComplete] = useState(false)

    function handleCleanSteps(){
        setCurrentStep(1)
        setComplete(false)
    }


    useEffect(() => {
        if (!complete) {
            return;
        } else {
            toast.success("Formulário preenchido com sucesso!", {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            })

            handleCleanSteps()
        }
    }, [complete])



    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <div className="flex justify-between">
                {
                    steps.map((step, index) => (
                        <div
                            key={index}
                            className={`relative flex flex-col justify-center items-center w-36 step-item ${currentStep === index + 1 && "active"} ${(index + 1 < currentStep || complete) && 'complete'}`}
                        >

                            <div
                                className="w-10 h-10 flex items-center justify-center z-10 relative bg-slate-700 rounded-full font-semibold text-white step"
                            >
                                {
                                    (index + 1 < currentStep || complete) ? <TiTick size={24} /> : index + 1
                                }
                            </div>

                            <p className="text-gray-500">
                                {step}
                            </p>

                        </div>
                    ))
                }
            </div>


            {
                // Desabilitando o botão quando chegar no step 3
                !complete && (
                    <button
                        className="bg-gray-800 hover:bg-gray-700 text-gray-100 font-medium px-7 py-1"
                        onClick={() => {
                            currentStep === steps.length

                                ? setComplete(true)
                                : setCurrentStep((prev) => prev + 1)

                            // Somar mais um no state do currentStep até chegar no tamanho total do array
                        }}
                    >
                        {currentStep === steps.length ? 'Finish' : 'Next'}
                    </button>
                )
            }
        </>
    )
}