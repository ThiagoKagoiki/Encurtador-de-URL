import React from "react";
import db from "../models/index.js";

export const postarUrl = async (req, res) =>{
    try{
        const {codigo, url_encurtada} = req.body

        const novoUrl = await db.Url.create({codigo, url_encurtada})

        res.status(201).json({
            mensagem: "Url enviada com sucesso",
            Url: novoUrl
        })
    }catch(err){
        res.status(400).json({
            mensagem: "Erro ao enviar URL",
            detalhes: err.message
        })
    }
}