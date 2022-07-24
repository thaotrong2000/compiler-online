import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  options = {
    headers: {
      'content-type': 'application/json',
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': 'afdeb02cf2msh2ffc5220a710accp10eb52jsn9c2664bbbe3e',
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
    },
    data: '{"language_id":52,"source_code":"I2luY2x1ZGUgPHN0ZGlvLmg+CgppbnQgbWFpbih2b2lkKSB7CiAgY2hhciBuYW1lWzEwXTsKICBzY2FuZigiJXMiLCBuYW1lKTsKICBwcmludGYoImhlbGxvLCAlc1xuIiwgbmFtZSk7CiAgcmV0dXJuIDA7Cn0=","stdin":"SnVkZ2Uw"}',
  };

  constructor(private http: HttpClient) {}

  postSourceCode(formData: any) {
    return this.http.post(
      'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*',
      formData,
      {
        headers: this.options.headers,
      }
    );
  }

  getOutput(data: any) {
    // call API to display output:
    return this.http.get(
      `https://judge0-ce.p.rapidapi.com/submissions/${data.token}?base64_encoded=true&fields=*`,
      {
        headers: this.options.headers,
      }
    );
  }
}
