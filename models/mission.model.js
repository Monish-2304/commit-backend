import mongoose from "mongoose";
const missionSchema = new mongoose.Schema({
    missionName: {
        type:String
    }
})



export const Mission = mongoose.model('Mission',missionSchema)