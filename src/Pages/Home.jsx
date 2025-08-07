import React, { useState } from "react";
import { enviarUrl } from "../services/service";

export const Home = () => {

    const [codigo, setCodigo] = useState('')
    const [url_encurtada, setUrl] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(!codigo || !url_encurtada){
            alert("Por favor, preencha todos os campos!")
            return
        }

        const dados = {codigo, url_encurtada}

        try {
            const resposta = await enviarUrl(dados);
            setCodigo('')
            setUrl('')
        } catch (error) {
            console.error("Erro ao enviar url:", error.response ? error.response.data : error.message);
            alert("Erro ao enviar url. Verifique os dados e tente novamente.");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="forms">
                <input type="text" placeholder="Código desejado" className="inputs" value={codigo} onChange={e => setCodigo(e.target.value)}/>
                <input type="text" placeholder="URL" className="inputs" value={url_encurtada} onChange={e => setUrl(e.target.value)}/>
                <button className="button">Encurtar</button>
            </form>
            <span></span>
        </div>
    )
}