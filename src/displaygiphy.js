import React from "react";

const Displaygiphy = (props) => {
    const { perpageData } = props

    return (
        <div className="gif-container">
            {
                perpageData.length > 0 ? (
                    perpageData.map((data) => {
                        return (
                            <div className="gif" key={data.id}>
                                <img src={data.images.fixed_height.url} alt={data.title}></img>
                            </div>
                        )
                    })) : null
            }
        </div>
    )
}

export default Displaygiphy;