import React from 'react'

function PageNotFound() {

    const style = {
        fontSize:'10vh',
        color: 'red',
        position: 'absolute',
        top: '35vh',
        left: '32vw'
    }

    return (
        <div style={style}>
            404<br/>
            Page Not Found
        </div>
    )
}

export default PageNotFound;