import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!);

export async function seleccionarBoleto(boletoId: string, clienteId: string) {
  await redis.setex(`boleto:${boletoId}`, 60, clienteId); // Expira en 1 min
}

export async function liberarBoleto(boletoId: string) {
  await redis.del(`boleto:${boletoId}`);
}
