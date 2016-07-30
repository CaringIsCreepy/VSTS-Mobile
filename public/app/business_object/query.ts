export class Query {
    name: string;
    id: string;
    path: string;
    isFolder: boolean;
    hasChildren: boolean;
    children: Array<Query>;
    isPublic: boolean;

    populate(queryJson: any) {
        this.name = queryJson.name;
        this.id = queryJson.id;
        this.path = queryJson.path;
        this.isFolder = queryJson.isFolder;
        this.hasChildren = queryJson.hasChildren;
        this.isPublic = queryJson.isPublic;
        if (this.hasChildren && queryJson.children !== undefined) {
            queryJson.children.forEach(query => {
                var childQuery = new Query();
                childQuery.populate(query);
                this.children.push(childQuery);
            });
        }
    }
}