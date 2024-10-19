
import './Model/Servico.js'
export default class ServicoCtrl{
    //traduzir comandos http em ações negociais
    //conceito REST
    //considerar o protocolo HTTP

    gravar(requisicao, resposta){
        if (requisicao.method == "POST" && requisicao.is("application/json")){
            const dados = requisicao.body;
            //pseudo validação
            if (dados.nome && dados.descricao && dados.valor>=0 && dados.urlImagem && dados.tempoInicioAtendimento>0 && dados.tempoSoluca>0)
            {
                const servico = new Servico(0,dados.nome,dados.descricao,dados.valor,dados.urlImagem,
                    dados.tempoInicioAtendimento,dados.tempoSoluca);

                servico.gravar().then(()=>{
                    resposta.status(201).json({
                        "status":true,
                        "mensagem":"Serviço gravado com sucesso",
                        "id":servico.id
                    })
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status":true,
                        "mensagem":"Erro ao registrar o serviço: "+erro.message
                    })
                })
            }
            else
            {
                resposta.status(400).json({
                    "status":false,
                    "mensagem":"Informe todos os dados necessários conforme documentação!"
                })
            }
        }
        else
        {
            resposta.status(405).json({
                "status":false,
                "mensagem":"Formato não permtido"
            })
        }

    }

    alterar(requisicao, resposta){
        if ((requisicao.method == "PUT" || requisicao.method == "PATCH") && requisicao.is("application/json")){
            const dados = requisicao.body;
            //pseudo validação
            if (dados.id>0 && dados.nome && dados.descricao && dados.valor>=0 && dados.urlImagem && dados.tempoInicioAtendimento>0 && dados.tempoSoluca>0)
            {
                const servico = new Servico(dados.id,dados.nome,dados.descricao,dados.valor,dados.urlImagem,
                    dados.tempoInicioAtendimento,dados.tempoSoluca);

                servico.alterar().then(()=>{
                    resposta.status(200).json({
                        "status":true,
                        "mensagem":"Serviço alterado com sucesso"  
                    })
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status":true,
                        "mensagem":"Erro ao alterar o serviço: "+erro.message
                    })
                })
            }
            else
            {
                resposta.status(400).json({
                    "status":false,
                    "mensagem":"Informe todos os dados necessários conforme documentação!"
                })
            }
        }
        else
        {
            resposta.status(405).json({
                "status":false,
                "mensagem":"Formato não permtido"
            })
        }

    }

    excluir(requisicao, resposta){
        if (requisicao.method = "DELETE" && requisicao.is("application/json")){
            const id = requisicao.params.id;//o id deve ser informado na url
            //pseudo validação
            if (id>0)
            {
                const servico = new Servico(id);

                servico.excluir().then(()=>{
                    resposta.status(200).json({
                        "status":true,
                        "mensagem":"Serviço excluido com sucesso",                        
                    })
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status":true,
                        "mensagem":"Erro ao excluir o serviço: "+erro.message
                    })
                })
            }
            else
            {
                resposta.status(400).json({
                    "status":false,
                    "mensagem":"Informe todos os dados necessários conforme documentação!"
                })
            }
        }
        else
        {
            resposta.status(405).json({
                "status":false,
                "mensagem":"Formato não permtido"
            })
        }

    }

    consultar(requisicao, resposta){
        if (requisicao.method = "GET"){       
       
            const servico = new Servico(id);

            servico.consultar().then((listaServicos)=>{
                resposta.status(200).json({
                    "status":true,
                    "listaServicos":listaServicos
                })
            }).catch((erro) => {
                resposta.status(500).json({
                    "status":true,
                    "mensagem":"Erro ao consultar o serviço: "+erro.message
                })
            })
            
        }
        else
        {
            resposta.status(405).json({
                "status":false,
                "mensagem":"Formato não permtido"
            })
        }

    }

}