import React from 'react'
import "../header/header.css"


function Header() {
    return (
        <>
            <header>
                <img src="../../../logo.jpg" alt='Image not found' />
                <div className='header-content-box'><h1>Use our weather app to see the weather around the world</h1></div>
            </header>

        </>
    )
}

export default Header