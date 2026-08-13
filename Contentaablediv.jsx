// lib/mongodb.js

import { MongoClient } from "mongodb";



const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

let db;
let isConnecting = false;

export async function getDB() {
  if (!db) {
    if (isConnecting) {
      throw new Error("Mongo connection is already in progress.");
    }

    isConnecting = true;

    try {
      await client.connect();
      db = client.db("larbi");
    } finally {
      isConnecting = false;
    }
  }

  return db;
}

//route.js api/lessons/duration

import { getDB } from "@/lib/mongo";


export async function PATCH(request) {
    try {
        const { lessonId, durationSeconds } = await request.json();

        if (!lessonId || durationSeconds === undefined) {
            return Response.json(
                {
                    success: false,
                    message: "lessonId and durationSeconds are required"
                },
                { status: 400 }
            );
        }

        const db = await getDB();

        const result = await db.collection("lessons").updateMany(
            {
                "lesson.lessonId": lessonId
            },
            {
                $set: {
                    "lesson.durationSeconds": durationSeconds,
                    updatedAt: new Date()
                }
            }
        );

        if (result.matchedCount === 0) {
            return Response.json(
                {
                    success: false,
                    message: "Lesson not found"
                },
                { status: 404 }
            );
        }

        return Response.json({
            success: true,
            message: "Duration updated successfully",
            modifiedCount: result.modifiedCount
        });

    } catch (error) {
        console.error(error);

        return Response.json(
            {
                success: false,
                message: "Internal server error"
            },
            { status: 500 }
        );
    }
}


// http.js 
export const updateLesson = async (data) => {

    const response = await fetch(
        `/api/lessons/duration`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    const res = await response.json();

    return res

};


// fontend api call 
 useEffect(() => {
        async function updateDuration() {
            if (!data) {
                console.log('duration not found')
                return;
            }
            const res = await updateLesson({ lessonId: "LESSON-002", durationSeconds: data })
            console.log(res)
        }
        updateDuration()
    }, [data])