import React from 'react'

const Result = () => {
  return (
    <div>
        <img src={"data:image/png;base64," +  localStorage.getItem("resultData")} />

    </div>
  )
}

export default Result