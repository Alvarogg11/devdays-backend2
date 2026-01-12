
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import {
    ATTR_SERVICE_NAME,
    ATTR_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { SimpleExporter } from './SimpleExporter.js'; // importamos simpleExport para usarlo en el almacenamiento de trazas
import { ConsoleMetricExporter, MeterProvider, PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { metrics } from '@opentelemetry/api';

const resource = resourceFromAttributes({
    [ATTR_SERVICE_NAME]: 'my-node-service',
    [ATTR_SERVICE_VERSION]: '1.0.0',
});

export const traceExporter = new SimpleExporter(); //simpleExporter añadido ()

const tracerProvider = new NodeTracerProvider({
    resource,
    spanProcessors: [
        new SimpleSpanProcessor(new ConsoleSpanExporter()),
        new SimpleSpanProcessor(traceExporter), //simpleExporter añadido ()
    ],
});

tracerProvider.register();

registerInstrumentations({
    instrumentations: [
        new HttpInstrumentation({
            ignoreIncomingRequestHook(req) {
                return req.url?.includes('/telemetry');
            },
        }),
    ],
});
const meterProvider = new MeterProvider({
  resource,
  readers: [
    new PeriodicExportingMetricReader({
      exporter: new ConsoleMetricExporter(),
      exportIntervalMillis: 5000,
    }),
  ],
});

// Registrar globalmente
metrics.setGlobalMeterProvider(meterProvider);

console.log('Instrumentation setup complete (HTTP only).');