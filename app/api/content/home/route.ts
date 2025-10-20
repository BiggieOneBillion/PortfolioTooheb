import { type NextRequest, NextResponse } from "next/server";
import { defaultHomeContent } from "@/lib/default-content";
import { HomePageContent } from "@/lib/models/page-content.model";
import connectDB from "@/lib/mongodb";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { NextApiRequest } from "next";
import { uploadFileToCloudinary } from "@/lib/cloudinary";

export const config = {
  api: {
    bodyParser: false, // we use formidable
  },
};

// Helper to set nested keys using dot-notation
function setNested(obj: any, path: string, value: any) {
  const parts = path.split(".");
  let cur = obj;
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    if (i === parts.length - 1) {
      // if existing is array and incoming is array -> concat
      if (Array.isArray(cur[p]) && Array.isArray(value)) {
        cur[p] = cur[p].concat(value);
      } else {
        cur[p] = value;
      }
    } else {
      if (!cur[p]) cur[p] = {};
      cur = cur[p];
    }
  }
}

async function parseForm(req: NextApiRequest) {
  const form = formidable({
    multiples: true,
    keepExtensions: true,
    maxFileSize: 50 * 1024 * 1024 /*50MB*/,
  });
  return new Promise<{ fields: formidable.Fields; files: formidable.Files }>(
    (resolve, reject) => {
      form.parse(req as any, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    }
  );
}

export async function GET() {
  try {
    await connectDB();

    const homeInfo = await HomePageContent.find();

    // console.log(homeInfo);

    if (homeInfo && homeInfo.length < 0) {
      return NextResponse.json(
        { success: true, message: "No data exist for home info" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: homeInfo[0] });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch home content" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    console.log("THE DATA HAS ARRIVED-----", body);

    await connectDB();

    const homeInfo = await HomePageContent.find();

    if (homeInfo && homeInfo.length < 0) {
      return NextResponse.json(
        { success: true, message: "No data exist for home info" },
        { status: 404 }
      );
    }

    await HomePageContent.updateOne({ _id: homeInfo[0]._id }, { $set: {...body} });

     const updated = await HomePageContent.findById(homeInfo[0]._id).lean();

    // const doc = homeInfo[0];

    // const { fields, files } = await parseForm(request);

    // find the document you want to update
    // Example: update the first (or create if none)
    // let doc = await HomePageContent.findOne({});
    // if (!doc) {
    //   doc = new HomePageContent({});
    // }

    // 1) Handle fields (text). Fields come from formidable as strings.
    // If the client sends JSON strings for arrays, parse them.
    // for (const [key, value] of Object.entries(fields)) {
    //   // key could be 'mobile.hero.title' or similar
    //   let parsed: any = value;

    //   // formidable returns strings, or arrays of strings for multiple values
    //   if (Array.isArray(value)) {
    //     // try to parse JSON per element or keep as strings
    //     parsed = value.map((v) => {
    //       try {
    //         return JSON.parse(String(v));
    //       } catch {
    //         return v;
    //       }
    //     });
    //   } else {
    //     const s = String(value);
    //     // try to parse JSON (so client can send arrays/objects as JSON strings)
    //     try {
    //       parsed = JSON.parse(s);
    //     } catch {
    //       parsed = s;
    //     }
    //   }

    //   // set nested on doc (convert mongoose doc to plain object for setting)
    //   setNested(doc, key, parsed);
    // }

    // // 2) Handle files (images) — upload each to Cloudinary and set url
    // // formidable files: single file -> File, multiple files -> array of File
    // // We expect file fields named with dot-notation too: e.g. 'mobile.hero.carouselImages'
    // for (const [rawKey, fileValue] of Object.entries(files)) {
    //   const key = rawKey; // e.g. "mobile.hero.carouselImages"
    //   if (!fileValue) continue;

    //   const uploadAndCollect = async (file: any) => {
    //     // file.path is the temporary file path
    //     const localPath = file.filepath || file.path || file.tempFilePath;
    //     const result = await uploadFileToCloudinary(localPath, "homepage");
    //     // remove temp file if exists
    //     try {
    //       if (fs.existsSync(localPath)) fs.unlinkSync(localPath);
    //     } catch (e) {
    //       // ignore
    //     }
    //     // we'll store secure_url
    //     return result.secure_url || result.url;
    //   };

    //   if (Array.isArray(fileValue)) {
    //     // multiple files sent under same key
    //     const urls: string[] = [];
    //     for (const f of fileValue) {
    //       const url = await uploadAndCollect(f);
    //       urls.push(url);
    //     }
    //     // set as array at nested key
    //     setNested(doc, key, urls);
    //   } else {
    //     // single file
    //     const url = await uploadAndCollect(fileValue as any);
    //     // set single string at nested key
    //     setNested(doc, key, url);
    //   }
    // }

    // doc.updatedAt = new Date();

    // await doc.save();
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update home content" },
      { status: 500 }
    );
  }
}
