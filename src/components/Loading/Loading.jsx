import React from 'react';

export default function Loading(isLoading) {
    return (
        <div className={`w-full h-full min-h-[calc(100vh-73px)] max-h-[calc(100vh-73px)] backdrop-blur-[2px] absolute top-0 left-0 z-[2000] transition-all ${isLoading ? '' : 'opacity-0 invisible'} flex justify-center items-center`}>
            <div className="loader"></div>
        </div>
    )
}