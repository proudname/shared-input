import { getModelForClass, prop } from "@typegoose/typegoose";

class Message {
    @prop({ required: true })
    public text!: string;

    @prop({ required: true })
    public sessionId!: string;

    @prop({ default: () => new Date() })
    public timestamp!: Date
}

export default getModelForClass(Message);