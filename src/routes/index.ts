import express from "express";
import { addContact, deleteContact, getContacts } from "../services/contactHandler";

const router = express.Router();

router.post("/contato", async (req, res)=>{
    const name: string = req.body.name;


    if(!name || name.length < 2){
        return res.json({ error: 'erro: Nome precisa ter pelo menos 2 caracteres.'});
    }

    await addContact(name);

    res.status(201).json({contato: name})

});

router.get("/contatos", async (req, res)=>{
    let list: string[] = await getContacts();

    res.json({contatos: list});
});

router.delete("/contato", async (req, res)=>{
    const {name} = req.query;

    if (!name){
        return res.json({error: "Necessário escolher um nome para efetuar a exclusão de contato."})
    }


    const response: {status: number, message: string} =  await deleteContact(name as string);
    res.status(response.status).send(response.message);
    
})

export default router;