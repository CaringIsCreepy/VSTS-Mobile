export class BuildDefinition {
    id: number;
    name: string;
    path: string;
    url: string;
    populate(jsonData) {
        this.id = jsonData.id;
        this.name = jsonData.name;
        this.path = jsonData.path;
        this.url = jsonData.url;
    }
}