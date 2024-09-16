import mongoose,{Schema,Document} from "mongoose";
interface Ifiltercomponents extends Document{
    NameOfFilter:string,
}
const Schemaoffiltercomponets= new Schema<Ifiltercomponents>({
    NameOfFilter:{type:String,required:true},
})
export const FilterDb= mongoose.model<Ifiltercomponents>('Filtercomponenst',Schemaoffiltercomponets)