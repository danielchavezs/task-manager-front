import loaderUrl from '../assets/loader.svg';

export default function Loader () {
    return (
        
        <div className='flex flex-col w-full h-full justify-center items-center md:space-y-8 sm:space-y-4 py-56'>
            <div className='w-1/5 h-1/5 max-w-40 max-h-40'>
                <embed src={loaderUrl} type="image/svg+xml" />
            </div>
            <p className='font-bold md:text-xl text-white'>CARGANDO</p>
        </div>
    )
};