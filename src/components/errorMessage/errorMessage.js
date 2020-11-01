import React from 'react'

const ErrorMessage = () => {
    // Если хочешь добавить картинку, то src=process.env.PUBLIC_URL + '/img/<image>
    // Или import img from './<image>.jpg
    return(
        <span>Something goes wrong...</span>
    )
}

export default ErrorMessage