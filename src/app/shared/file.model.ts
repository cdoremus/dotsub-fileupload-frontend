
export class FileData {
    id: number;
    title: string;
    description: string;
    filename: string;
    createDate: string;
    constructor(id?: number, title?: string, description?: string, filename?: string, createDate?: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.filename = filename;
        this.createDate = createDate;
    }
}
