import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {
    public _pageSize: number;
    public _baseUri: string;
    private _apiHost: string = "http://localhost:5000/"

    constructor(public http: Http) {

    }

    set(baseUri: string, pageSize?: number): void {
        this._baseUri = this._apiHost + baseUri;
        this._pageSize = pageSize;
    }

    get(page?: number) {

        if (page != undefined) {
            var uri = this._baseUri + page.toString() + '/' + this._pageSize.toString();
        }
        else
            var uri = this._baseUri;


        return this.http.get(uri)
            .map(response => (<Response>response));
    }

    post(data: any, headers?: any) {
        var uri = this._baseUri;
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();

            xhr.open("POST", uri, true)
            if (headers)
                headers.forEach(header => xhr.setRequestHeader(header.header, header.value));

            xhr.onload = function () {
                if (xhr.status == 200) {
                    resolve(xhr.response);
                } else {
                    var error = new Error(xhr.statusText);
                    reject(error);
                }
            };
            xhr.onerror = function () {
                reject(new Error("Network Error"));
            };
            xhr.send(data);
        });
    }

    postAuthenticate(token: string, data?: any, mapJson: boolean = true) {
        var headers = new Headers();
        headers.append("Authorization", "Bearer " + token)
        if (mapJson)
            return this.http.post(this._baseUri, data, {
                headers: headers
            })
                .map(response => <any>(<Response>response).json());
        else
            return this.http.post(this._baseUri, data, {
                headers: headers
            });
    }

    delete(id: number) {
        return this.http.delete(this._baseUri + '/' + id.toString())
            .map(response => <any>(<Response>response).json())
    }

    deleteResource(resource: string) {
        return this.http.delete(resource)
            .map(response => <any>(<Response>response).json())
    }
}