export class WorkItem {
    id: number;
    rev: number;
    title: string;
    state: string;

    populate(workItemJson: any) {
        this.id = workItemJson.id;
        if (workItemJson.fields !== undefined) {
            this.populateFields(workItemJson.fields);
        }
    }

    private populateFields(fieldsJson: any) {
        this.title = this.getField<string>(fieldsJson, 'System.Title');
        this.state = this.getField<string>(fieldsJson, 'System.State');
    }

    private getField<T>(fieldsJson, field) : T {
        if (field in fieldsJson) {
            return fieldsJson[field];
        }

        return null;
    }
}