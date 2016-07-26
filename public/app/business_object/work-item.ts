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
        if ('System.Title'in fieldsJson) {
            this.title = fieldsJson['System.Title'];
        }
    }
}