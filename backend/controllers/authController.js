import React from "react";
import db from "../models/index.js";
import { where } from "sequelize";

export const postarUrl = async (req, res) => {
    try {
        const { codigo, urlOriginal } = req.body


        //Verificando se o código postado está dentro destes caracteres
        const regexCodigo = /^[a-zA-Z0-9-_]+$/
        if (!regexCodigo.test(codigo)) {
            return res.status(400).json({ mensagem: "Código inválido. Use letras, números, - ou _" });
        }

        //Verificando se o link é válido

        try {
            new URL(urlOriginal);
        } catch {
            return res.status(400).json({ mensagem: "URL inválida." });
        }

        const existente = await db.Url.findOne({where: {codigo}})

        //Verificando se o código já está em uso

        if(existente){
            return res.status(400).json({mensagem: "Código já está em uso"})
        }

        const shortLink = `http://localhost:3000/${codigo}`

        const novoUrl = await db.Url.create({ codigo, urlOriginal, shortLink })

        res.status(201).json({
            mensagem: "Url enviada com sucesso",
            Url: novoUrl,
            shortUrl: shortLink
        })
    } catch (err) {
        res.status(500).json({
            mensagem: "Erro ao enviar URL",
            detalhes: err.message
        })
    }
}

export const verShortsLinks = async(req, res) => {
    try{

        const shortsLinks = await db.Url.findAll()

        res.json(shortsLinks)
    }catch(err){
        res.status(500).json({
            erro: "Erro ao ver seus links",
            detalhes: err.message
        })
    }
}

// export const verConsulta = async (req, res) => {
//   try {

//     const consultas = await db.Consulta.findAll();

//     res.json(consultas)
//   } catch (err) {
//     res.status(500).json({
//       erro: 'Erro ao ver Consulta',
//       detalhes: err.message
//     });
//   }
// }