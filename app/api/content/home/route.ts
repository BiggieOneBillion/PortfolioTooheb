import { NextResponse } from "next/server";
import data from "../../../../data/home.json";

export async function GET() {
  try {
    // await connectDB();

    // const homeInfo = await HomePageContent.find();

    // // console.log(homeInfo);

    // if (homeInfo && homeInfo.length < 0) {
    //   return NextResponse.json(
    //     { success: true, message: "No data exist for home info" },
    //     { status: 404 }
    //   );
    // }

    return NextResponse.json({ success: true, data: data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch home content" },
      { status: 500 }
    );
  }
}

// export async function PUT(request: Request) {
//   try {
//     const body = await request.json();

//     console.log("THE DATA HAS ARRIVED-----", body);

//     await connectDB();

//     const homeInfo = await HomePageContent.find();

//     if (homeInfo && homeInfo.length < 0) {
//       return NextResponse.json(
//         { success: true, message: "No data exist for home info" },
//         { status: 404 }
//       );
//     }

//     await HomePageContent.updateOne({ _id: homeInfo[0]._id }, { $set: {...body} });

//      const updated = await HomePageContent.findById(homeInfo[0]._id).lean();

//         return NextResponse.json({ success: true, data: updated });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, error: "Failed to update home content" },
//       { status: 500 }
//     );
//   }
// }
