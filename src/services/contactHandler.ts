import { readFile, writeFile } from "fs/promises";

const dataSource = "./data/contact-list.txt";

export const getContacts = async () => {
    let list: string[] = [];
    try {
        const data = await readFile(dataSource, {encoding: 'utf8'});
        list = data.split('\n');
    } catch (err) {
        
    }
    return list;
}

export const addContact = async (name: string) => {
    let list: string[] = await getContacts();
    list.push(name);
    await writeFile(dataSource, list.join('\n'));
}

export const deleteContact: (name: string) => Promise<{status: number, message: string}> = async (name) => {
    let ogList: string[] = await getContacts();
    let list_one: string[] = ogList.filter(item=> item !== name);
    let list_two: string[] = ogList;
    let resp: {status: number, message: string} = {status: 0, message: ""};

    await writeFile(dataSource, list_one.join('\n'));
    if (list_one.length == list_two.length){
        resp.message = "Não existem contatos com esse nome para serem excluídos";
        resp.status = 400;
    } else {
        resp.message = "Contato(s) excluído(s) com sucesso";
        resp.status = 200;
    }
    return resp;
}
