import axios from "axios";
import React from "react";

const API = axios.create({
  baseURL: 'http://localhost:3000',
  headers:{
    'Content-Type': 'application/json'
  }
});

export const enviarUrl = (dados) => API.post('/url', dados)
export const pegarUrl = () => API.get(`/${codigo}`)