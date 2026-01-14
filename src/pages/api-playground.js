import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';

export default function ApiPlayground() {
  useEffect(() => {
    // Load Swagger UI when component mounts
    const loadSwaggerUI = () => {
      if (window.SwaggerUIBundle) {
        const ui = window.SwaggerUIBundle({
          url: '/openapi.json',
          dom_id: '#swagger-ui',
          deepLinking: true,
          presets: [
            window.SwaggerUIBundle.presets.apis,
            window.SwaggerUIStandalonePreset
          ],
          plugins: [
            window.SwaggerUIBundle.plugins.DownloadUrl
          ],
          layout: "StandaloneLayout",
          tryItOutEnabled: true,
          displayRequestDuration: true,
          filter: true,
          showExtensions: true,
          showCommonExtensions: true,
          defaultModelsExpandDepth: 1,
          defaultModelExpandDepth: 1,
          docExpansion: 'none',
          validatorUrl: null, // Disable spec validation
          requestInterceptor: (request) => {
            // Add default headers for API calls
            request.headers['Accept'] = 'application/json';
            if (request.method !== 'GET') {
              request.headers['Content-Type'] = 'application/json';
            }
            return request;
          },
          responseInterceptor: (response) => {
            return response;
          },
        });
        
        window.ui = ui;
      } else {
        // Retry loading after a short delay if SwaggerUI isn't ready
        setTimeout(loadSwaggerUI, 100);
      }
    };

    // Small delay to ensure scripts are loaded
    setTimeout(loadSwaggerUI, 500);
  }, []);

  return (
    <Layout 
      title="Interactive API Reference" 
      description="Interactive Cloudflare API Explorer with Try It functionality"
    >
      <Head>
        <link 
          rel="stylesheet" 
          type="text/css" 
          href="https://unpkg.com/swagger-ui-dist@5.10.5/swagger-ui.css" 
        />
        <script src="https://unpkg.com/swagger-ui-dist@5.10.5/swagger-ui-bundle.js"></script>
        <script src="https://unpkg.com/swagger-ui-dist@5.10.5/swagger-ui-standalone-preset.js"></script>
        <style>{`
          .swagger-ui .topbar { display: none; }
          .swagger-ui .info { margin: 20px 0; }
          .swagger-ui .scheme-container { margin: 20px 0; }
          #swagger-ui { height: calc(100vh - 60px); }
          .main-wrapper { padding: 0 !important; }
        `}</style>
      </Head>
      
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#fafafa', 
        borderBottom: '1px solid #e1e4e8' 
      }}>
        <h1 style={{ margin: '0 0 10px 0', color: '#f38020' }}>
          Cloudflare API Interactive Reference
        </h1>
        <p style={{ margin: '0', color: '#586069' }}>
          Complete API documentation with Try It functionality. 
          Add your API token in the "Authorize" button to make live API calls.
        </p>
      </div>
      
      <div style={{ padding: '0' }}>
        <div id="swagger-ui" style={{ minHeight: '600px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '200px',
            fontSize: '16px',
            color: '#666'
          }}>
            Loading Cloudflare API Documentation...
          </div>
        </div>
      </div>
    </Layout>
  );
}
