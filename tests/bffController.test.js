const axios = require('axios').default

const BffController = require("../Dist/controllers/BffController").default;

const path = 'http//localhost:1000'

const httpManager = new BffController(axios, path)

const mockedReq = {
    body: jest.fn()
};
const mockedRes = {
    json: jest.fn(),
    setHeader: jest.fn()
};



describe("Testa camada do controller do BFF", () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })
    
    test("Testa se o server está direcionando a requisição corretamente para a API externa através do Axios.", async () => {
        
        axios.post = jest.fn().mockResolvedValue(mockedRes)
        const requestInitial = await httpManager.bffpost(mockedReq, mockedRes)
        
        expect(axios.post).toHaveBeenCalled()

    });

    test("Testa se o server está recebendo a resposta da API e retornando corretamente uma resposta do Axios para o front.", async () => {
        

        const mockedResponseData = { id: 1, name: 'Example' };
        axios.post.mockResolvedValue(mockedResponseData)

        const responseFromBff = await httpManager.bffpost(mockedReq, mockedRes)
        
        expect(mockedRes.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(mockedRes.json).toHaveBeenCalledWith(mockedResponseData)
    })

    test("Testa se o server retorna um erro se a API externa recusar requisição ou estiver off.", async () => {
        
        axios.post = jest.fn().mockRejectedValue({ code: 500, message: 'Internal Server Error' })

        const responseFromBff = await httpManager.bffpost(mockedReq, mockedRes)
        expect(responseFromBff).toThrow

    })
});