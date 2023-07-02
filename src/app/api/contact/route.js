
import Contact from "@/app/contact/page";
import {NextResponse} from "next/server";
import dbconn from "@/utils/Dbconn";

export  async function POST(req, res){

    try{

        const body = await req.json()
        await dbconn()

        await Contact.create(body)

        return NextResponse.json({
            message:"Message sent succesfully!"
        },{
            status:200
        })

    }catch (e){

        return NextResponse.json(
            {message: "Server error,please try again!"},
            {status:500}
        )
    }
}