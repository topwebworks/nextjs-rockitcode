import createMDX from "@next/mdx";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig = {
  // Vercel optimization for free tier
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      '@radix-ui/react-icons',
      'lucide-react',
      'socket.io-client',
      '@monaco-editor/react'
    ],
    // Enable static optimization
    outputFileTracingRoot: process.cwd(),
    esmExternals: true,
  },
  
  // Force static generation where possible
  output: 'standalone',
  
  // Optimize for Vercel free tier
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  
  // Compression and optimization
  compress: true,
  poweredByHeader: false,
  
  // Output optimization
  output: 'standalone',
  webpack: (config, { isServer }) => {
    // Monaco Editor webpack configuration
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        stream: false,
        buffer: false,
        url: false,
        module: false,
      };

      // Monaco Editor specific rules
      config.module.rules.push({
        test: /\.ttf$/,
        type: 'asset/resource'
      });
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default withBundleAnalyzer(withMDX(nextConfig));
