import { NextRequest, NextResponse } from "next/server";

const requests = new Map();

export function rateLimit(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const now = Date.now();

  if (!requests.has(ip)) {
    requests.set(ip, { count: 1, time: now });
  } else {
    const { count, time } = requests.get(ip);
    if (now - time < 60000) { // 1 minuto
      if (count > 5) return NextResponse.json({ error: "Demasiadas solicitudes" }, { status: 429 });
      requests.set(ip, { count: count + 1, time });
    } else {
      requests.set(ip, { count: 1, time: now });
    }
  }
  return NextResponse.next();
}
