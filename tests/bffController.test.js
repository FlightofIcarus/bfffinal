const axios = require('axios').default

const BffController = require("../Dist/controllers/BffController").default;

const path = 'http//localhost:1000'

const httpManager = new BffController(axios, path)

const mockedReq = {
    body: jest.fn()
};
const mockedRes = {
    json:jest.fn()
};



describe("Testa camada do controller do BFF", () => {

    axios.post = jest.fn().mockResolvedValue(mockedRes)

    test("Testa se o server está direcionando a requisição corretamente para a API externa através do Axios.", async () => {
        
        const requestInitial = await httpManager.bffpost(mockedReq, mockedRes)
        console.log(requestInitial);
        expect(axios.post).toHaveBeenCalled()

    });

    test("Testa se o server está recebendo a resposta da API e retornando corretamente uma resposta do Axios para o front.", async () => {

        
        const responseFromBff = await httpManager.bffpost(mockedReq, mockedRes)
        expect(mockedRes.json).toHaveBeenCalledWith(mockedRes)
    })

    test("Testa se o server retorna um erro se a API externa recusar requisição ou estiver off.", async () => {
        
        axios.post = jest.fn().mockRejectedValue({ code: 500, message: 'Internal Server Error' })

        const responseFromBff = await httpManager.bffpost(mockedReq, mockedRes)
        expect(responseFromBff).toThrow

    })
});