import { model, Schema, Types } from 'mongoose'

export interface IDocument {
    nome: string;
    content: string;
    id: number;
}

export const DocumentSchema = new Schema<IDocument>(
    {
        nome: { type: 'string', required: true },
        content: { type: 'string', required: true },
        id: {type: 'number', require: true}
    },
    { 
        timestamps: true 
    },
)

export const Document = model<IDocument>('documents', DocumentSchema);






