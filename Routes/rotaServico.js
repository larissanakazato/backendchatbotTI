import { Router } from "express";
import ServicoCtrl from "../Controller/ServicoCtrl.js";

const rotaServico = new Router()
const servCtrl = new ServicoCtrl();
rotaServico
.get("/",servCtrl.consultar)
.post("/",servCtrl.gravar)
.put("/",servCtrl.alterar)
.patch("/",servCtrl.alterar)
.delete("/:id",servCtrl.excluir)
export default rotaServico;


