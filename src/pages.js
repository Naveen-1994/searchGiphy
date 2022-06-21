import React from "react";

const Pages = (props) => {
    const { pages, handleclick } = props

    return (
        <div className="pages-container">
            {
                pages.map((page) => {
                    return <li key={page} className="pagenumber"><button className="pagebtn" onClick={() => { handleclick(page) }}>{page}</button></li>
                })
            }
        </div>
    )
}

export default Pages;