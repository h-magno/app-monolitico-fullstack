import { Document } from "../models/document.entity"; 
import { Op } from "sequelize";


import GeneriController from "./GenericController";



class DocController extends GeneriController{
    constructor() {
        super()
    } 

    async getDocumentById(_id: string) {
        let doc = await Document.findById(_id)
 
        return {
            doc,
            status: 200 
        }
    }

    async createDoc(data: any) {
        const doc = await Document.create(data);
        return { 
            status: 200,
            _id: doc.id
        }  
    }  
   
// TODO: Título não está salvando alteração. ?
    async updateDoc(_id: string, data: any) {
        let txt = await Document.findByIdAndUpdate({_id}, data)
        return {
            txt,    
            status: 200  
        }  

    }

    async deleteDoc(_id: string) {
       await Document.deleteOne({_id: _id})
        return {
            status: 200
        }

    }


    async getDocument(query: any)  {

        let { id, page, limit } = query

        let res = this.generatePagination(limit, page)
        limit = res[0]
        page = res[1]


        let document = await Document.find({ id }).skip(page * limit).limit(limit)

        const total = await Document.find({ id });
        const count = Math.ceil(total.length / limit);

        return { 
            document,
            count,
            status: 200
        }
    }
}

export default DocController