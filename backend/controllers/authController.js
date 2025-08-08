import React from "react";
import db from "../models/index.js";
import { where } from "sequelize";

export const postarUrl = async (req, res) => {
    try {
        const { codigo, url_encurtada } = req.body

        const regexCodigo = /^[a-zA-Z0-9-_]+$/
        if (!regexCodigo.test(codigo)) {
            return res.status(400).json({ mensagem: "Código inválido. Use letras, números, - ou _" });
        }

        try {
            new URL(url_encurtada);
        } catch {
            return res.status(400).json({ mensagem: "URL inválida." });
        }

        const existente = await db.Url.findOne({where: {codigo}})

        if(existente){
            return res.status(400).json({mensagem: "Código já está em uso"})
        }

        const novoUrl = await db.Url.create({ codigo, url_encurtada })

        res.status(201).json({
            mensagem: "Url enviada com sucesso",
            Url: novoUrl,
            shortUrl: `http://localhost:3000/${codigo}`
        })
    } catch (err) {
        res.status(500).json({
            mensagem: "Erro ao enviar URL",
            detalhes: err.message
        })
    }
}