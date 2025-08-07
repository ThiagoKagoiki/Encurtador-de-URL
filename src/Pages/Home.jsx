import React from "react";

export const Home = () => {

    let urlEncurtada

    return (
        <div>
            <form action="">
                <input type="text" placeholder="Código desejado" />
                <input type="text" placeholder="URL" />
                <button>Encurtar</button>
            </form>
            <span>{urlEncurtada}</span>
        </div>
    )
}