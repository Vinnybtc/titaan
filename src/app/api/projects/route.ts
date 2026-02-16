import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, category, location, image, description, featured, sortOrder } = body;

    if (!title || !category || !location) {
      return NextResponse.json(
        { error: "Title, category and location are required" },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        title,
        category,
        location,
        image: image || "/images/projects/placeholder.jpg",
        description: description || "",
        featured: featured ?? true,
        sortOrder: sortOrder ?? 0,
      },
    });

    return NextResponse.json(project);
  } catch {
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
