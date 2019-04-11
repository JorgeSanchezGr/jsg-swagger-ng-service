import { Injectable } from '@angular/core';

@Injectable()
export class {{=it.serviceName}} {

    constructor(private apiService: ApiService) {}
    {{~it.paths :path:index}}
    {{=path.operationId }}({{~path.parameters :param:indexParam}}{{=param.name}}: {{=param.type}}{{~}}){
        const url = {{=path.path }};
        return this.apiService.{{=path.method }}ByUrl(url, { {{~path.parameters :param:indexParam}}{{=param.name}}{{~}} })
    }
    {{~}}
}