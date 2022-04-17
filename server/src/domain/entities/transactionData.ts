import { Entity } from "../../core/domain/Entity"

type CNABdata = {
    type: string,
    date: string,
    amount: string,
    cpf: string,
    cardNumber: string,
    time: string,
    owner: string,
    client: string
}

export class TransactionData extends Entity<CNABdata> {
    private constructor(properties: CNABdata, id?: string) {
        super(properties, id)
    }

    public create(properties: CNABdata, id?: string) {
        return new TransactionData(properties, id)
    }
}
