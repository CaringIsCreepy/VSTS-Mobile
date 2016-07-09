declare function inject(components: any[], spec : (test: string) => void): () => void;

declare function beforeEachProviders(components: () =>  void): void;