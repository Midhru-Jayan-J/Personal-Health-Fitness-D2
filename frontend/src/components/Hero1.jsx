
import Button from './Button'

export default function Hero1() {
    return (
        <div className='min-h-screen flex flex-col gap-10 items-center justify-center text-center max-w-[800px] w-full mx-auto p-4'>
            <div className='flex flex-col gap-4'>

              
                <h1 className='uppercase font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl'>MAKA-<span className='text-blue-400'>APP</span></h1>
            </div>
            <p className='text-sm md:text-base font-light'>An ultimate personal health and fitness tracker! Stay motivated, track your progress, and achieve your fitness goals with ease..</p>
            <Button func={() => {
                window.location.href = '#generate'
            }} text={"Accept & Begin"}></Button>
        </div>
    )
}
