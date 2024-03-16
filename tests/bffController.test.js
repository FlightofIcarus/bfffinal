import bffController from "../src/controllers/bffController";
import axios from "axios";

const axios = jest.mock("axios");
const req = jest.fn();
const res = jest.fn();


describe("Testa camada do controller do BFF", () => {

    test("Testar se o server está direcionando a requisição corretamente para a API externa", () => {
        
        const requestInitial = bffController(req, res)
        expect(axios).toHaveBeenCalled()

    });

    test("Testar se o server está recebendo a resposta da API e retornando corretamente para o front", () => {
        const responseFromBff = bffController(req, res)
        expect(responseFromBff).toBeInstanceOf(res)
    })
});