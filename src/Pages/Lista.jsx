import React, { useEffect, useState } from "react";
import { pegarUrl } from "../services/service";

export const Lista = () => {
    const [list, setList] = useState([])

    const verLista = async () => {
        try {
            const resposta = await pegarUrl()
            setList(resposta.data)
        } catch (error) {
            console.error("erro ao carregar lista: ", error);
        }
    }

    useEffect(() => {
        verLista()
    })

    return (
        <>
            <div className="grid">
                {list.map((lista) => (
                    <div className="consulta-item" key={lista.id}>
                        <div className="consulta-item-header">
                            <div className="consulta-item-info">
                                <h3 className="consulta-item-title">N°: {lista.id}</h3>
                                <div className="consulta-item-details">
                                    <p><span className="font-medium">Código:</span> {lista.codigo}</p>
                                    <p><span className="font-medium">Url:</span> {lista.urlOriginal}</p>
                                    <p><span className="font-medium">ShortLink:</span> {lista.shortLink}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}