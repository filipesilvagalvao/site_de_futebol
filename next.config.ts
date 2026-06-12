import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  compress: true,
  
  // Se não precisar de otimização de imagens externas
  images: {
    unoptimized: true,
  },
  
  // Desabilita telemetria (opcional)
  turbopack: {
    // Configurações adicionais
  }
};

export default nextConfig;
