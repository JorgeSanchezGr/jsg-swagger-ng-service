export class RenderServiceTemplate {
    template: any

    paths: any[] = []

    constructor(template: any){
        this.template = template;
        this.parseToArrayPaths();
    }

    private parseToArrayPaths(){
        for (let path in this.template.paths){
            let requestPath = path
            for ( let method in this.template.paths[path]){
                let requestMethod = method
                this.paths.push({ ...this.template.paths[path][method], method, path})
            }
        }
    }
}