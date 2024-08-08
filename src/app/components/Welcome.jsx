const welcome = () => {
    return (
        <div className="gradient-bg2 items-center justify-center">
            <div className="flex flex-col items-center justify-center h-screen">
                <img src="/SwiftShip-logos_transparent.png" alt="logo" className="w-40 h-40 lg:w-80 lg:h-80 rounded-full" />
                <h1 className="text-3xl lg:text-5xl font-bold text-white">Welcome to SwiftShip</h1>
                <p className="text-[10px] lg:text-2xl text-white text-center">The best place to get your deliveries within campus</p>
                <button className="bg-white text-black py-2 px-4 rounded-full mt-4">Get Started</button>
            </div>
        </div>  
    )
}

export default welcome;