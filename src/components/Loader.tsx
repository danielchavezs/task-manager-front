import loaderUrl from '../assets/loader.svg';


export default function Loader () {
    return (
        
        <div className='flex flex-col bg-slate-700 w-full h-full justify-center items-center space-y-8 py-56'>
            <div className='w-1/3 h-1/3 max-w-72 max-h-72'>
                <embed src={loaderUrl} type="image/svg+xml" />
            </div>
            <p className='font-bold lg:text-3xl md:text-2xl sm:text-xl text-white'>CARGANDO</p>
        </div>
        
    )
}