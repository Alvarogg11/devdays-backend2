export class SimpleExporter { //añadimos export para que la clase otel.js pueda utilizar simpleExport
    _store = [];

    export(spans, resultCallback) {
        this._store.push(...spans);
        // console.log(`Exported ${spans.length} spans`);
        resultCallback({ code: 0 });
    }

    shutdown() {
        return Promise.resolve();
    }

    getFinishedSpans() {
        return this._store;
    }
}